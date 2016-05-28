app.controller("workspaceController",["$scope",function($scope){
	var self = this;
	var data = $scope.data;
	self.tool = [];
	self.stones = [];
	self.sigils = [];
	self.runes = [];

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
				if (self.sigils.length>0){
					data.sigils = data.sigils.concat(self.sigils);
					self.sigils = [];
				}
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
}]);