app.controller("runeController", ["$scope", "$rootScope", function($scope, $rootScope){
	var self           = this;
	var data           = $scope.data;
	self.flashingRunes = []; //List of runes which are flashing
	self.flashing      = false; //Determines whether entire rune area is flashing

	// Network data
	var tmpData   = linearRuneTreeData(data.runes);
	self.treeData = tmpData.data;
	self.rawData  = tmpData.rawData;
	self.network  = new vis.Network(runeTreeContainer, self.treeData, runeTreeOptions);
	// Network Event Handlers
	self.network.on('click', function (obj) {
		if (obj.nodes.length > 0) {
			self.selectedRune = linearFindRuneFromNode(obj.nodes[0], data.runes);
			$scope.$apply();
		}
	});


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