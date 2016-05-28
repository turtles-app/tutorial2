app.directive("customDraggable", function(){
	
	return {
		scope: {
			type: "=",
			index: "="
		},
		link: function(scope, element, attrs){
			//Set Drag Data of draggable
			var el = element[0];
			el.addEventListener("dragstart", function(ev){
				dragData.index = scope.index;
				dragData.type = scope.type;
				
			});
		}
	};
});