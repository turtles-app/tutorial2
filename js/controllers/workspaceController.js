app.controller("workspaceController",["$rootScope", "$scope",function($rootScope, $scope){
	var self = this;
	var data = $scope.data;
	/*
	***Instance Variables
	*/
	self.tool = null;
	self.stones = [];
	self.runes = [];

	/*
	***Drop functionality
	*	Check whether dragged item may be dropped	*/
	self.dropAllowed = function(){
		switch (dragData.type){
			case "tool":
				return true;
				break;
			case "sigil":
			case "rune":
			case "stone":
				if( self.tool != ""){
					return true;
				};
				break;

			default:
				return false;
				break;
		}
			return false;
	};

	// Handle drop into workspace
	self.drop = function(){
		switch (dragData.type){
			case "tool":
				if (self.tool!=null){
					data.tools.push(self.tool);
				} 
				self.tool = data.tools.splice(dragData.index, 1)[0];

				if (self.stones.length>0){
					data.stones = data.stones.concat(self.stones);
					self.stones = [];
				}
				if (self.runes.length>0){
					data.runes = data.runes.concat(self.runes);
					self.runes = [];
				}
				//Clear the active sigils in the workspace
					data.leftSigil = null;
					data.rightSigil = null;
				break;


			case "stone":
				self.stones.push(data.stones.splice(dragData.index, 1)[0]);
				break;
			case "sigil":
				self.sigils.push(data.sigils.splice(dragData.index, 1)[0]);
				break;
			case "rune":
				self.runes.push(data.runes.splice(dragData.index, 1)[0]);
				break;
		}
		$scope.$apply();
	};

	//Check item being dragged is a sigil
	self.isSigil = function(){
		if(dragData.type==="sigil") return true;
		else return false;
	};

	//Drop sigils into left and right slots
	self.dropLeftSigil = function(){
		data.leftSigil = data.sigils[dragData.index];
		$scope.$apply();
	};
	self.dropRightSigil = function(){
		data.rightSigil = data.sigils[dragData.index];
		$scope.$apply();
	};

	$rootScope.$on('trashDrop', function(ev, data){
		switch(data.type){
			case "fusedSigil":
				// data.leftSigil = null;
				// data.rightSigil = null;
				$rootScope.$broadcast("clearWorkspace");
				break;
			case "selectedTool":
				$rootScope.$broadcast('trashTool', {tool: self.tool}); // broadcast to the data controller
				self.tool = null;
				self.runes = [];
				break;
			case "forgeSigil":
				self.stones = [];
				break;
		}
		$scope.$apply();
	});
}]);