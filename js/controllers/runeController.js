app.controller("runeController", ["$scope", "$rootScope", function($scope, $rootScope){
	var self           = this;
	var data           = $scope.data;
	self.flashingRunes = []; //List of runes which are flashing
	self.flashing      = false; //Determines whether entire rune area is flashing

	// Network data
	var tmpData   = linearRuneTreeData(data.runes);
	// var keyNode   = {id: tmpData.}
	self.treeData = tmpData.data;
	self.rawData  = tmpData.rawData;
	self.runicKeyData = linearRunicKeyData(self.rawData.nodes);
	self.rawData.nodes.push(self.runicKeyData.node);
	self.rawData.edges.push(self.runicKeyData.edge);
	self.network  = new vis.Network(runeTreeContainer, self.rawData, runeTreeOptions);
	// Network Event Handlers
	self.network.on('click', function (obj) {
		self.selectedRune = null;
		self.selectedRunicKey = null;
		if (obj.nodes.length > 0) {
			var tmp = linearFindRuneFromNode(obj.nodes[0], data.runes);
			// Check if clicked rune was the runic key
			if (tmp.runicKey) {
				self.selectedRune = null;
				self.selectedRunicKey = data.runicKey;
			} else {
				self.selectedRune = tmp.data;
			}
			$scope.$apply();
		}
	});



	//////////////////////////
	// Drop Events Handlers //
	//////////////////////////
	self.dropAllowed = function () {
		switch (dragData.type) {
			case 'crafterResult':
				return true;
				break;
			default:
				return false;
				break;
		}
	};
	self.drop = function () {
		var valid = contains(data.selectedStones[0].name, data.selectedSigils[0].equivalents[data.selectedSigils[0].equivalents.length - 1], data.selectedRunes);
		if (valid) {
			// Make new Rune
			var newRune = new Fact(data.selectedStones[0].name, true, data.selectedSigils[0].equivalents[data.selectedSigils[0].eqActiveIndex]);
			newRune.groupIndex = data.runes.length;
			newRune.setType = data.selectedSigils[0].type;
			data.runes.push(newRune);

			// Check if new rune matches Runic Key
			var wasKey = compareRuneToKey(newRune, data.runicKey);


			// Redraw Network
			tmpData = linearRuneTreeData(data.runes);
			self.treeData = tmpData.data;
			self.rawData = tmpData.rawData;
				// Add runic key to end of network
			var runicKeyData = linearRunicKeyData(self.rawData.nodes);
			self.rawData.nodes.push(runicKeyData.node);
			self.rawData.edges.push(runicKeyData.edge);
			self.network.setData(self.rawData);			
		}
		data.selectedRunes = [];
		data.stones = data.stones.concat(data.selectedStones);
		data.selectedStones = [];
		data.sigils = data.sigils.concat(data.selectedSigils);
		data.selectedSigils = [];
		$scope.$apply();
	}


	//////////////////////////////
	// Flashing Event Listeners //
	//////////////////////////////
	//Flash a list of runes
	$rootScope.$on("flashRunes", function (ev, arr) {
		self.flashingRunes = [];
		arr.forEach(function (rune) {
			self.flashingRunes.push(rune);
		});
	});
	//Stop flashing all runes
	$rootScope.$on("clearFlashRunes", function () {
		self.flashingRunes = [];
	});
	//Flash the rune area
	$rootScope.$on("flashRuneArea", function () {
		self.flashing = true
	});
	//Stop flashing the rune area
	$rootScope.$on("clearFlashRuneArea", function () {
		self.flashing = false;
	});


}]);