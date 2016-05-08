app.controller("runeController", ["$scope", "$rootScope", function($scope, $rootScope){
	var self = this;
	var data = $scope.data;
	self.flashingRunes = []; //List of runes which are flashing
	self.flashing = false; //Determines whether entire rune area is flashing

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