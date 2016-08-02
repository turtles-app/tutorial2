app.controller("toolController", ['$rootScope', '$scope', function($rootScope, $scope) {
	var data = $scope.data;
	var self = this;



	self.trashAllowed = function(){
		switch (dragData.type){
			case "selectedTool":
			case "fusedSigil":
			case "forgeSigil":
			case "crafterResult":
			case "runeOutline":
				return true;
				break;
			default: 
				return false;
				break;
		}
	};


	self.trashDrop = function(){
		$rootScope.$broadcast('trashDrop', {type : dragData.type}); //broadcast to workspace
		dragData.type= "";
		dragData.index = null;
	};


}]);