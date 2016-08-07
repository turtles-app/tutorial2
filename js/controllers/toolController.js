app.controller("toolController", ['$rootScope', '$scope', function($rootScope, $scope) {
	var data = $scope.data;
	var self = this;



	self.trashAllowed = function(){
		console.log(dragData.type);
		switch (dragData.type){
			case "selectedTool":
			case "fusedSigil":
			case "forgeSigil":
			case "crafterResult":
			case "runeOutline":
			case "runicKey":
			case "inspectedTool":
			case "inspectedRune":
			case "inspectedSigil":
			case "inspectedStone":
				return true;
				break;
			default: 
				return false;
				break;
		}
	};


	self.trashDrop = function(){
		switch(dragData.type){
			case "inspectedTool":
			case "inspectedRune":
			case "inspectedSigil":
			case "inspectedStone":
			case "runicKey":
				$rootScope.$broadcast('trashInspector', {type:dragData.type})
				break;
			default:
				$rootScope.$broadcast('', {type : dragData.type}); //broadcast to workspace
				break;
			dragData.type= "";
			dragData.index = null;
		}		
	};

}]);