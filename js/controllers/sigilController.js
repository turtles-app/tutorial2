app.controller("sigilController", ["$scope", "$rootScope", function($scope, $rootScope){
	var self = this;
	var data = $scope.data;
	self.flashingSigils = []; //List of sigils that are flashing
	self.flashing = false; //Determines whether sigil area is flashing

	//////////////////////////////
	// Flashing Event Listeners //
	//////////////////////////////
	//Flash a group of sigils
	$rootScope.$on("flashSigils", function  (ev, arr) {
		self.flashingSigils = [];
		arr.forEach(function  (sigil) {
			self.flashingSigils.push(sigil);
		});
	});
	//Clear all flashing sigils
	$rootScope.$on("clearFlashSigils", function () {
		self.flashingSigils = [];
	});
	//Flash sigil area
	$rootScope.$on("flashSigilArea", function () {
		self.flashing = true;
	});
	//Stop flashing sigil area
	$rootScope.$on("clearFlashSigilArea", function () {
		self.flashing = false;
	});


}]);