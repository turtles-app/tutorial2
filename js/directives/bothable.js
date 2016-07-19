app.directive("customBothable", function(){
	return {
		scope: {
			type: '=',
			dropAllowed: "&", // Function checks whether drop is valid
			onDrop: "&"		  // Callback upon drop
		},
		link: function(scope, element, attrs){

			//Set Drag Data of draggable
			var el = element[0];

			// Drag event handler
			el.addEventListener("dragstart", function(ev){
				dragData.type = scope.type;
			});

			// Allow drop if drop is valid
			el.addEventListener("dragover", function(ev){
				var checkDrop = scope.dropAllowed();
				if (checkDrop()){
					ev.preventDefault();
				}
			});
			
			// Perform drop callback for dropzone element
			el.addEventListener("drop", function(ev){
				var onDrop = scope.onDrop();
				onDrop();
			})
		}
	}
});