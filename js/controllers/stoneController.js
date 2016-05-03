app.controller("stoneController", ["toastr", "$scope", function(toastr, $scope){
	var self = this;
	toastr.success("Toasted!", "Toasting");
}]);