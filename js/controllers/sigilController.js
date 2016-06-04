app.controller("sigilController", ["$scope", "$rootScope", function($scope, $rootScope){
	var self = this;
	var data = $scope.data;
	self.flashingSigils = []; //List of sigils that are flashing
	self.flashing = false; //Determines whether sigil area is flashing




	/*
	*** Drop Cycle Handlers
	*/
	self.dropAllowed = function () {
		switch (dragData.type) {
			case "forgeSigil":
			case "fusedSigil":
				return true;
				break;
		}
	};

	self.drop = function () {
		var left = data.leftSigil;
		var right = data.rightSigil;
		switch (dragData.type) {
			case "forgeSigil":
				var res = new Set("sets", data.sigilNames.shift());
				res.groupIndex = data.sigils.length;
				data.selectedStones.forEach(function (stone) {
					res.putIn(stone);
				});
				data.sigils.push(res);
				data.stones = data.stones.concat(data.selectedStones.splice(0, data.selectedStones.length));
				data.stones.sort(sortGroup);
				break;
			case "fusedSigil":
				var res = union(data.sigilNames.shift(), left, right);
				res.groupIndex = data.sigils.length;
				data.sigils.push(res);
				break;
		}
		$rootScope.$broadcast('trashDrop', {type : dragData.type}); //broadcast to workspace
		$scope.$apply();
	}


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