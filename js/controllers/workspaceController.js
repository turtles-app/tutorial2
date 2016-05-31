app.controller("workspaceController",["$scope",function($scope){
	var self = this;
	var data = $scope.data;
	/*
	***Instance Variables
	*/
	self.tool = [];
	self.stones = [];
	self.leftSigil = null;
	self.rightSigil = null;
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
				if (self.tool!=""){
					data.tools.push(self.tool);
				} 
				self.tool = data.tools.splice(dragData.index, 1)[0];
				console.log(self.stones);

				if (self.stones.length>0){
					data.stones = data.stones.concat(self.stones);
					self.stones = [];
				}
				if (self.runes.length>0){
					data.runes = data.runes.concat(self.runes);
					self.runes = [];
				}
				//Clear the active sigils in the workspace
					self.leftSigil = null;
					self.rightSigil = null;
				break;


			case "stone":
				self.stones.push(data.stones.splice(dragData.index, 1)[0]);
				console.log("stone has been dropped");
				break;
			case "sigil":
				self.sigils.push(data.sigils.splice(dragData.index, 1)[0]);
				console.log("sigil has been dropped");
				break;
			case "rune":
				self.runes.push(data.runes.splice(dragData.index, 1)[0]);
				console.log("rune has been dropped");
				break;
		}
		$scope.$apply();
	};

	//Check item being dragged is a sigil
	self.isSigil = function(){
		console.log("isSigil function fired");
		if(dragData.type==="sigil") return true;
		else return false;
	};

	//Drop sigils into left and right slots
	self.dropLeftSigil = function(){
		self.leftSigil = data.sigils[dragData.index];
		$scope.$apply();
	};
	self.dropRightSigil = function(){
		self.rightSigil = data.sigils[dragData.index];
		$scope.$apply();
	};
}]);