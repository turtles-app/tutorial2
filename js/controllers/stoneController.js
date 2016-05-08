app.controller("stoneController", ["toastr", "$scope", "$rootScope", function(toastr, $scope, $rootScope){
	var self = this;
	var data = $scope.data;
	self.flashingStones = []; //List of stones that are flashing
	self.flashing = false; //Determines whether whole area flashes

	$rootScope.$on("flashSigils", function () {
		console.log("flashing sigils");
	});



	//////////////////////////////
	// Flashing Event Listeners //
	//////////////////////////////
		//Flash a list of stones
	$rootScope.$on("flashStones", function (ev, flashArr) {
		self.flashingStones = [];
		flashArr.forEach(function (stone) {
			self.flashingStones.push(stone);
		});
	});
		//Clear all flashing stones
	$rootScope.$on("clearFlashStones", function () {
		self.flashingStones = [];
	});
		//Flash entire stone area
	$rootScope.$on("flashStoneArea", function () {
		self.flashing = true;
	});
		//Clear flashing stone area
	$rootScope.$on("clearFlashStoneArea", function () {
		self.flashing = false;
	});

	
}]);