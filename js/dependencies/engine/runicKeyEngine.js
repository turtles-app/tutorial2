
//Outlines a set of requirements on a sigil for it to count towards the runic key
/*
	ex) 
	{
		restricted: true,
		mustBe["&alpha;", "&beta;"],
		mustNotBe: [],
		requiredType: 'any',
		firstComponentReqs = null,
		secondComponentReqs = otherSigilRequirements
	}
*/
function sigilRequirements(restricted, mustBe, mustNotBe, requiredType, firstComponentReqs, secondComponentReqs) {
	this.restricted 		 = restricted; //Whether there are any requirements
	this.mustBe 			 = mustBe; //array of sigils that the sigil must be one of
	this.mustNotBe 			 = mustNotBe; //array of sigils the sigil must not be
	this.requiredType 		 = requiredType; //string with type requirement for sigil
	this.firstComponentReqs  = firstComponentReqs;
	this.secondComponentReqs = secondComponentReqs;
};




// Outlines requirements on stone for it to count towards runic Key
/*
	ex)
	{
		restricted: true,
		mustBe: [],
		mustNotBe: ["ruby", "topaz"]
	}
*/
function stoneRequirements(restricted, mustBe, mustNotBe) {
	this.restricted = restricted;
	this.mustBe 	= mustBe;
	this.mustNotBe 	= mustNotBe;
};

// Defines a runic key as a set of requirements on components of a rune
function runicKey (sigilRequirements, stoneRequirements, shouldResonate) {
	this.sigilRequirements = sigilRequirements;
	this.stoneRequirements = stoneRequirements;
	// Create Stone Requirement string
	var stoneStr = "";
	switch (stoneRequirements.restricted) {
		case true:
			if (stoneRequirements.mustBe.length > 0) {
				if (stoneRequirements.mustBe.length === 1) {
					stoneStr = "Must be " + stoneRequirements.mustBe[0];
				} else {
					stoneStr = "Must be either ";
					stoneRequirements.mustBe.forEach(function (stoneName, index, list) {
						if (index < list.length - 1) {
							stoneStr = stoneStr + stoneName + ", ";
						} else {
							stoneStr = stoneStr + "or " + stoneName;
						}
					});
				}
			} else if (stoneRequirements.mustNotBe.length > 0) {
				stoneStr = "Must be any stone EXCEPT: ";
				stoneRequirements.mustNotBe.forEach(function (stone, index, list) {
					if (index < list.length - 1) {
						stoneStr = stoneStr + stone + ", ";
					} else {
						if (list.length === 1) {
							stoneStr += stone;
						} else {
							stoneStr = stoneStr + "or " + stone;
						}
					}
				});
			}

			break;
		case false:
			stoneStr = "Can be any stone";
			break;
	}
	this.stoneStr = stoneStr;
	// Create Sigil Requirement string
	var sigilStr = "";
	switch (sigilRequirements.restricted) {
		case true:
			// Check which sigils are required
			if (sigilRequirements.mustBe.length > 0) {
				if (sigilRequirements.mustBe.length === 1) {
					sigilStr = "Must be " + sigilRequirements.mustBe[0];
				} else {
					sigilStr = "Must be either ";
					sigilRequirements.mustBe.forEach(function (syntax, index, list) {
						if (index < list.length - 1) {
							sigilStr = sigilStr + stringifySyntax(syntax) + ", ";
						} else {
							sigilStr = sigilStr + "or " + stringifySyntax(syntax);
						}
					});
				}
			// Check which sigils are disallowed
			} else {
				sigilStr = "Must be any "
				if (sigilRequirements.requiredType) {
					switch (sigilRequirements.requiredType) {
						case 'sigil':
							sigilStr += "simple ";
							break;
						case 'fuse':
							sigilStr += "fused ";
							break;
						case 'trim':
							sigilStr += "trimmed ";
							break;
						case 'core':
							sigilStr += "cored ";
							break;
					}
				}
				if (sigilRequirements.mustNotBe.length > 0) {
					sigilStr += "Sigil EXCEPT: ";
					sigilRequirements.mustNotBe.forEach(function (syntax, index, list) {
						if (index < list.length - 1) {
							sigilStr = sigilStr + stringifySyntax(syntax) + ", "
						} else {
							if (list.length === 1) {
								sigilStr += stringifySyntax(syntax);
							} else {
								sigilStr = sigilStr + "or " + stringifySyntax(syntax);
							}
						}
					});
				}
			}
			break;
		case false:
			sigilStr = "Can be any sigil";
			break;
	}
	this.sigilStr = sigilStr;
};

///////////////////////
// Helper Functions //
//////////////////////
function compareSigilToReqs (setSyntax, setType, sigilReqs) {
	var res = false;
	if (sigilReqs.restricted) {
		// Check requirements on sigil being from specific list
		var passMustBe = false;
		if (sigilReqs.mustBe.length > 0) {
			if (sigilReqs.mustBe.indexOf(setSyntax) > 0) {
				passMustBe = true;
			}
		} else {
			passMustBe = true;
		}
		// Check requirements on sigil not being in specific list
		var passMustNotBe = true;
		if (sigilReqs.mustNotBe.length > 0) {
			if (sigilReqs.mustNotBe.indexOf(setSyntax) >= 0) {
				passMustNotBe = false;
			}
		}
		// Check requirements on sigil type
		var passType = false;
		if (sigilReqs.requiredType != 'any') {
			if (sigilReqs.requiredType === setType) {
				passType = true;
			}
		} else {
			passType = true;
		}

		// Check requirements on 1st component of inscribed sigil
		var passFirstComponentReqs = false;
		if (sigilReqs.firstComponentReqs) {
			if (typeof(setSyntax) === 'object') {
				var firstComponentType = 'sigil';
				switch (setSyntax[0].type) {
					case 'object':
						switch (setSyntax[0][1]) {
							case 'u':
								firstComponentType = 'fuse';
								break;
							case 'n':
								firstComponentType = 'trim';
								break;
							case '/':
								firstComponentType = 'cleave';
								break;
						}
						break;
					case 'string':
						break;
				}
				passFirstComponentReqs = compareSigilToReqs(setSyntax[0], firstComponentType, sigilReqs.firstComponentReqs);
			}
		} else {
			passFirstComponentReqs = true;
		}

		// Check requirements on 2nd component of inscribed sigil
		var passSecondComponentReqs = false;
		if (sigilReqs.secondComponentReqs) {
			if (typeof(setSyntax) === 'object') {
				var secondComponentType = 'sigil';
				switch (setSyntax[0].type) {
					case 'object':
						switch (setSyntax[2][1]) {
							case 'u':
								secondComponentType = 'fuse';
								break;
							case 'n':
								secondComponentType = 'trim';
								break;
							case '/':
								secondComponentType = 'cleave';
								break;
						}
						break;
					case 'string':
						break;
				}
				passSecondComponentReqs = compareSigilToReqs(setSyntax[2], secondComponentType, sigilReqs.secondComponentReqs);				
			}
		} else {
			passSecondComponentReqs = true;
		}
		if (passMustBe && passMustNotBe && passType && passFirstComponentReqs && passSecondComponentReqs) {
			res = true;
		}
	} else {
		res = true;
	}
	return res;
};
// Check stone against requirements
function compareStoneToReqs (stoneName, stoneReqs) {
	var res = false;
	if (stoneReqs.restricted) {
		var passMustBe = false;
		if (stoneReqs.mustBe.indexOf(stoneName) >= 0) {
			passMustBe = true;
		}
		var passMustNotBe = true;
		if (stoneReqs.mustNotBe.indexOf(stoneName) >= 0) {
			passMustNotBe = false;
		}
		res = passMustBe && passMustNotBe;
	} else {
		res = true;
	}
	return res;
}

// Compare rune to runic key
function compareRuneToKey (rune, runicKey) {
	var res = false;
	var passSigilReqs = compareSigilToReqs(rune.setSyntax, rune.setType, runicKey.sigilRequirements);
	var passStoneReqs = compareStoneToReqs(rune.elementName, runicKey.stoneRequirements);
	res = passSigilReqs && passStoneReqs;
	return res;
}