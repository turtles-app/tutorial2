var Set = function (groupName, name, firstEquivalence) {
	var that = this;
	// All sets exist within named array within the universe object 
	// (which is instantiated on the front end)
	this.groupName = groupName;

	//List of syntax (array) representations of the set
	this.equivalents = [name]; 
	this.strEquivalents = [stringifySyntax(name)];
	this.elements = [];
	this.knownElements = [];
	
	// If the set is the product of an operation between other sets
	if (firstEquivalence) {
		//Add that operation's syntax (array) representation to the set's equivalents
		this.equivalents.push(firstEquivalence);
		this.strEquivalents.push(stringifySyntax(firstEquivalence));
	}
	this.type = "sigil";
	this.simple = true;
	this.eqActiveIndex = 0;
	this.isSet = true;
	this.components = [];

	///////////////////////
	// Getter Properties //
	///////////////////////
		// Returns stringified version of operational syntax (A u B)
	// Object.defineProperty(that, "longName", {
	// 	get: function () {
	// 		var res = "";
	// 		if (that.simple) {
	// 			res = "that.strEquivalents[0]";
	// 		} else {
	// 			res = ""
	// 		}
	// 	}
	// })
};

		//////////////////////
		// Methods for Sets //
		//////////////////////

//Puts an element in a Set's elements attribute
Set.prototype.putIn = function(element) {
	element.routes.push(new setRoute(this));
	this.elements.push(element);
}

//Assign all elements known to be in the set from a given list of facts
Set.prototype.setKnownElements = function(facts) {
	var that = this;
	var known = []; //temp list of known elements
	this.elements.forEach(function(element) {
		var elIsKnown = false;
		facts.forEach(function(fact) {
			if (fact.elementName === element.name){
				that.equivalents.forEach(function(eq) {
					if (fact.isIn && _.isEqual(eq, fact.setSyntax)) elIsKnown = true;
				});
			}
		});
		if (elIsKnown) known.push(element);
	});
	this.knownElements = known;
	return this.knownElements;
}

Set.prototype.relevantFacts = function (facts) {
	var that = this;
	var res = [];
	facts.forEach(function (fact) {
		if (fact.setSyntax === that.equivalents[that.eqActiveIndex]) res.push(fact);
	});
	return res;
}


//	Function that returns stringified syntax
var stringifySyntax = function (syntax) {
	switch (typeof(syntax)) {
		case 'string':
			return syntax;
			break;
		case 'object':
			var res = "";
			switch(typeof(syntax[0])) {
				case "string":
					res = res + syntax[0] + " ";
					break;
				case "object":
					var first = stringifySyntax(syntax[0]);
					res = "(" + res + first + ") ";
					break;
			}
			res = res + syntax[1];
			switch(typeof(syntax[2])) {
				case "string":
					res = res + " " + syntax[2];
					break;
				case "object":
					var second = stringifySyntax(syntax[2]);
					res = res + " (" + second + ")";
					break;
			}
			break;
	}
	return(res);
};

//  Abstract class that relates an element to a set
//  that contains it
var setRoute = function (set) {
	this.groupName 		= set.groupName;
	this.setName		= set.equivalents[0];
	this.elementIndex 	= set.elements.length; //Index of particular element for which this eSet exists within set/eSet
}



//  Element objects are placed in the elements (array) attribute
//	of varius sets. Each element must be in at least one set.
//	
//	the routes (array) attrubute is a list of
//  representations of relationships to the sets
//	in which the Element resides.
var Element = function (name, set, color) {
	this.name = name;
	this.groupIndex;
	var firstRoute = new setRoute(set);
	this.routes = [];
	this.routes.push(firstRoute);
	this.color = color;
	this.opacity = null;
	this.border = "";
	// this.colorStyle = {
	// 	"background-color": color
	// }
	// console.log(this.colorStyle);
	set.elements.push(this);


	this.isSet=false;
}

			/////////////////////
			// Element Methods //
			/////////////////////

// Find sets in which an element is known to 
// reside, based on a list of facts
Element.prototype.knownContainingSets = function (facts, sets) {
	var that = this;
	var res = [];
	var relevantFacts = [];
	facts.forEach(function (fact) {
		if (fact.elementName === that.name && fact.isIn) relevantFacts.push(fact);
	});
	sets.forEach(function (set) {
		relevantFacts.forEach(function (fact) {
			if (_.isEqual(set.equivalents[set.eqActiveIndex], fact.setSyntax)) res.push(set);
		});
	});
	return res;
};

// Find facts related to a given element
Element.prototype.relevantFacts = function (facts) {
	var that = this;
	var res = [];
	facts.forEach(function (fact) {
		if (fact.elementName === that.name) res.push(fact);
	});
	return res;
};

//	Fact object represents a fact of the form
//		"x is contained in A, because [fact1, fact2, ...fact_n]", OR
//		"x is NOT contained in A, because [fact1, fact2, ...fact_n]"
var Fact = function (elementName, isIn, setSyntax) {
	var that = this;
	this.subject = "containment"; //These objects are facts about containment, not inclusion, or equality
	this.simple = typeof(setSyntax) === 'string'; //boolean -- true if setSyntax is a string, false if it's a syntax
	this.elementName = elementName;
	this.isIn = isIn; //true if x is in A, false if x is NOT in A
	this.setSyntax = setSyntax; //Syntax of the referenced set
	this.justifications = []; //array of facts submited by user to justify this fact
	this.usedJustifications = []; //subset of justifications actually necessary for justification
	var tmpStr = ' resonates in ';
	if (!isIn) tmpStr = ' is not in ';
	this.str = elementName + tmpStr + stringifySyntax(setSyntax);;
	this.groupIndex;
	this.setType;

	///////////////////////	
	// Getter Properties //
	///////////////////////
		// Returns type of the Set used to make the Fact
	// Object.defineProperty(that, "setType", {
	// 	get: function () {
	// 		var res = "";
	// 		if (that.simple) {
	// 			res = "sigil";
	// 		} else {
	// 			// If Sigil is compound, check its type
	// 			switch (setSyntax[1]) {
	// 				case "u": //Union
	// 					res = "fuse";
	// 					break;
	// 				case "n": //Intersection
	// 					res = "trim";
	// 					break;
	// 				default:
	// 					res = "sigil";
	// 					break;
	// 			}
	// 		}
	// 		return res;
	// 	}
	// });

};

// Function used to sort elements, sets, and facts
var sortGroup = function (a, b) {
	return a.groupIndex - b.groupIndex;
}