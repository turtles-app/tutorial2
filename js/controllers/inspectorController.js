app.controller("inspectorController", ['$scope', function ($scope) {
	var data = $scope.data
	var self = this;

	self.targetType = ""; //Type of thing selected
	self.target = null; //Thing being selected
	self.content = "" //Core explanation text of selected thing
	self.img = "";
	self.sigilTreeData = null; //Stores visjs network data
	self.network = null;
	self.resonantStones = []; //Stones resonating with inspected sigil

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
				return true;
				break;
			default:
				return false;
				break;
		}
	};

	// drop handler helper
	self.drop = function () {
		self.target = null;
		self.content = "";
		self.img = "";
		self.resonantStones = [];
		self.targetType = dragData.type;
		switch (dragData.type) {
			case 'sigil':
				self.target = data.sigils[dragData.index];
				self.resonantStones = self.target.setKnownElements(data.runes);
				console.log("resonant stones:");
				console.log(self.resonantStones);
				var treeData = sigilTreeData(self.target, 0, {});
				var nodes = treeData.nodes;
				var edges = treeData.edges;
				self.sigilTreeData = {
					nodes: nodes,
					edges: edges
				};
				var str = unEscape(self.target.equivalents[self.target.eqActiveIndex]);
				if (!self.target.simple) { 
					var tmp = self.target.type;
					if (self.target.type === 'fuse') tmp += "d";
					tmp = tmp.charAt(0).toUpperCase() + tmp.slice(1);
					self.content = tmp + " Sigil: " + str;
				} else {
					self.content = "Sigil: " + str;
				}
				self.network = new vis.Network(inspectorContainer, self.sigilTreeData, inspectorOptions);
				self.network.fit();
				var nodeIds = self.findNodeIds();
				console.log(nodeIds);
				break;
			case 'tool':
				// Handle different tools
				self.img = "./img/" + data.tools[dragData.index] + ".png";
				switch (data.tools[dragData.index]) {
					case "forge":
						self.content = "Use the forge to craft new Sigils from stones";
						break;
				}
				break;
		}
		dragData = {
			type: "",
			index: null
		};
		$scope.$apply();
	};
}]);