app.controller("toolController", ['$rootScope', '$scope', function($rootScope, $scope) {
	var data = $scope.data;
	var self = this;



	self.trashAllowed = function(){
		switch (dragData.type){
			case "selectedTool":
			case "fusedSigil":
			case "forgeSigil":
				return true;
				break;
		}
	};


	self.trashDrop = function(){
		$rootScope.$broadcast('trashDrop', {type : dragData.type}); //broadcast to workspace
		dragData.type= "";
		dragData.index = null;
	};


}]);