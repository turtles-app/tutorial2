app.directive("customDraggable", function(){
	
	return {
		scope: {
			type: "=",
			index: "="
		},
		link: function(scope, element, attrs){
			//Set Drag Data of draggable
			var el = element[0];
			// Drag event handler
			el.addEventListener("dragstart", function(ev){
				console.log(dragData);
				dragData.index = scope.index;
				dragData.type = scope.type;
			});
		}
	};
});