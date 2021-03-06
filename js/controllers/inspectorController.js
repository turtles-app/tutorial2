app.controller("inspectorController", ['$rootScope','$scope', function($rootScope, $scope) {
	var data = $scope.data
	var self = this;

	self.targetType = ""; //Type of thing selected
	self.target = null; //Thing being selected
	self.content = "" //Core explanation text of selected thing
	self.img = "";
	self.sigilTreeData = null; //Stores visjs network data
	self.network = null;
	self.resonantStones = []; //Stones resonating with inspected sigil
	self.resonantSigils = [] //Sigils resonating with inspected stone
	self.relevantRunes =  [] //Runes relating to inspected thing

	var treeData = sigilTreeData(data.sigils[0], 0, {});
	var nodes = treeData.nodes;
	var edges = treeData.edges;
	self.sigilTreeData = {
		nodes: nodes,
		edges: edges
	};

	self.network = new vis.Network(inspectorContainer, self.sigilTreeData, inspectorOptions);
	self.network.fit();	

	self.findNodeIds = function () {
		var res = [];
		self.sigilTreeData.nodes.forEach(function (node) {
			res.push(node.id);
		});
		return res;
	};
	
	// window.onresize = function() {self.network.fit();}
	self.dropAllowed = function () {
		switch (dragData.type) {
			case "sigil":
			case "rune":
			case "stone":
			case "tool":
			case "trash":
			case "runicKey":
				return true;
				break;
			default:
				return false;
				break;
		}
	};

	// drop handler helper
	self.drop = function () {
		console.log(dragData);
		self.target = null;
		self.content = "";
		self.img = "";
		self.resonantStones = [];
		self.resonantSigils = [];
		self.relevantRunes = [];
		self.targetType = dragData.type;
		switch (dragData.type) {
			case 'stone':
				self.target = data.stones[dragData.index];
				self.content = "STONE: " + self.target.name;
				// self.explanation = "Stones can be forged into Sigils or embedded into Runes."
				self.img = "./img/" + self.target.name + ".png";
				self.resonantSigils = self.target.knownContainingSets(data.runes, data.sigils);
				self.relevantRunes = self.target.relevantFacts(data.runes);
				break;
			case 'sigil':
				self.target = data.sigils[dragData.index];
				self.resonantStones = self.target.setKnownElements(data.runes);
				self.relevantRunes = self.target.relevantFacts(data.runes);


				var treeData = sigilTreeData(self.target, 0, {});
				var nodes = treeData.nodes;
				var edges = treeData.edges;
				self.sigilTreeData = {
					nodes: nodes,
					edges: edges
				};
				var str = unEscape(self.target.equivalents[self.target.eqActiveIndex]);
				str = str.charAt(0).toUpperCase() + str.slice(1);
				if (!self.target.simple) { 
					var tmp = self.target.type;
					if (self.target.type === 'fuse') tmp += "d";
					tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
					str += " ( " + self.target.strEquivalents[0] + " )";
					self.content = tmp + " SIGIL: " + str;
				} else {
					self.content = "SIGIL: " + str;
				}

				self.network = new vis.Network(inspectorContainer, self.sigilTreeData, inspectorOptions);
				self.network.fit();
				var nodeIds = self.findNodeIds();
				break;
			case 'rune':
				self.target = data.runes[dragData.index];
				self.content = "RUNE: " + self.target.elementName + " resonates in " + unEscape(self.target.setSyntax) + " ( " + self.target.setSyntax + " )";
				self.img = "./img/rune-" + self.target.setType + "-" + self.target.elementName + ".png";
				break;
			case 'runicKey':
				self.target  = data.runicKey;
				self.content = "A Runic Key. Craft a rune that matches its pattern to obtain it!"
				self.sigilStr = self.target.sigilStr;
				self.stoneStr = self.target.stoneStr;
				self.img = "./img/runicKey.png";
				break;
			case 'tool':
				// Handle different tools
				self.img = "./img/" + data.tools[dragData.index] + ".png";
				switch (data.tools[dragData.index]) {
					case "forge":
						self.content = "TOOL: Forge. Use this to FORGE new Sigils from Stones";
						//self.explanation = "Drag any number of Stones into the SIGIL SLOT on the Forge. Then, drag the Sigil Slot into the Sigil Area to forge a Sigil that resonates with those Stones."
						break;
					case "crafter":
						self.content = "TOOL: Crafter. Use this to CRAFT new Runes from Sigils and Stones";
						//self.explanation = "Drag a Sigil into the Sigil Slot on the Crafter. Then, Drag a Stone into the STONE SLOT. Drag the Rune into the Rune Area to craft a new Rune embedded with the Stone and engraved with the Sigil."
						break;
					case "fuser":
						self.content = "TOOL: Fuser. Use this to FUSE existing Sigils to form a new Sigil"
						//self.explanation = "Drag an existing Sigil to each side of the FUSED SIGIL SLOT on the FUSER. Then, drag the Fused Sigil Slot into the Sigil Area to fuse a new Sigil. Any Stone that resonates with EITHER existing Sigil also resonates with the new Sigil. The Inspector can only show the Resonant Stones if there is a Rune embedded with the Stone and engraved with the Sigil."
						break;
				}
				break;
			case "trash":
				console.log("case trashCan success");
				self.content = "TOOL: Trash. Use this to CLEAR your workspace."
				self.img = "./img/trash.png"
				break;
		}
		$scope.$apply();
		dragData = {
			type: "",
			index: null,
		};
	}; //end of drop handler

	$rootScope.$on('trashInspector', function(ev, data){
		switch(data.type){
			case "inspectedTool":
			case "inspectedRune":
			case "inspectedSigil":
			case "inspectedStone":
			case "runicKey":
			case "selectedTool":
				self.tool = null;
				self.runes = [];
				// initialize inspector data
				self.targetType = ""; //Type of thing selected
				self.target = null; //Thing being selected
				self.content = "" //Core explanation text of selected thing
				self.sigilTreeData = null; //Stores visjs network data
				self.img = "";
				self.network = null;
				self.resonantStones = []; //Stones resonating with inspected sigil
				self.resonantSigils = [] //Sigils resonating with inspected stone
				self.relevantRunes =  [] //Runes relating to inspected thing
				$rootScope.$apply();
				dragData = {
					type: "",
					index: null,
				};
				break;
		}
	});
}]);	

