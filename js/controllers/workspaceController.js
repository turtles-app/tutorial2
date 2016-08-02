app.controller("workspaceController",["$rootScope", "$scope",function($rootScope, $scope){
	var self = this;
	var data = $scope.data;
	/*
	***Instance Variables
	*/
	self.tool = null;
	// self.stones = [];
	data.selectedStones = [];
	data.selectedSigils = [];
	data.selectedRunes = [];

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
				if( self.tool === "forge" || self.tool === "crafter"){
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

				if (data.selectedStones.length>0){
					data.stones = data.stones.concat(data.selectedStones);
					data.selectedStones = [];
				}
				if (data.selectedRunes.length>0){
					data.runes = data.runes.concat(self.runes);
					self.runes = [];
				}
				//Clear the active sigils in the workspace
					data.leftSigil = null;
					data.rightSigil = null;
				break;


			case "stone":
				if (self.tool === "crafter") {
					var newStone = data.stones[dragData.index]
					// var newStone = data.stones.splice(dragData.index, 1)[0];
					// data.stones = data.stones.concat(data.selectedStones);
					// data.stones.sort(sortGroup);
					data.selectedStones = [newStone];
				} else {
					data.selectedStones.push(data.stones.splice(dragData.index, 1)[0]);
				}
				break;
			case "sigil":
				if (self.tool === "crafter") {
					var newSigil = data.sigils[dragData.index];				
					// var newSigil = data.sigils.splice(dragData.index, 1)[0];
					// data.sigils = data.sigils.concat(data.selectedSigils);
					// data.sigils.sort(sortGroup);
					data.selectedSigils = [newSigil];
				} else {

				data.selectedSigils.push(data.sigils.splice(dragData.index, 1)[0]);
				}
				break;
			case "rune":
				if (data.selectedRunes.indexOf(data.runes[dragData.index]) < 0) {
					data.selectedRunes.push(data.runes[dragData.index]);
				}
				// self.runes.push(data.runes.splice(dragData.index, 1)[0]);
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

	// event fired by toolController
	$rootScope.$on('trashDrop', function(ev, data){
		switch(data.type){
			case "fusedSigil":
			case "forgeSigil":
			case "crafterResult":
			case "runeOutline":
				// notify dataController
				$rootScope.$broadcast("clearWorkspace");
				break;
			case "selectedTool":
				$rootScope.$broadcast('trashTool', {tool: self.tool}); // broadcast to the data controller
				self.tool = null;
				self.runes = [];
				break;
		}
		$scope.$apply();
	});
}]);