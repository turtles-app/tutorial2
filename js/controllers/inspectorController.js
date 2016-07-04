app.controller("inspectorController", ['$scope', function ($scope) {
	var data = $scope.data
	var self = this;

	self.targetType = ""; //Type of thing selected
	self.target = null; //Thing being selected
	self.content = "" //Core explanation text of selected thing
	self.img = "";
	

	self.dropAllowed = function () {
		switch (dragData.type) {
			case "sigil":
			case "rune":
			case "stone":
			case "tool":
			case "trash":
				return true;
				break;
			default:
				return false;
				break;
		}
	};

	// drop handler helper
	self.drop = function () {
		self.target = null;
		self.content = "";
		self.img = "";
		switch (dragData.type) {
			case 'sigil':
			case 'tool':
				// Handle different tools
				self.img = "./img/" + data.tools[dragData.index] + ".png";
				switch (data.tools[dragData.index]) {
					case "forge":
						self.content = "Use the forge to craft new Sigils from stones";
						break;
				}
				// console.log("inspecting set");
				break;
		}
		$scope.$apply();
	};
}]);