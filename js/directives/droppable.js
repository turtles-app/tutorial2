app.directive("customDroppable", function(){
	return{
		scope: {
			dropAllowed: "&", // Function checks whether drop is valid
			onDrop: "&"		  // Callback upon drop

		},
		link: function(scope, element, attrs){
			var el = element[0];
			// Allow drop if drop is valid
			el.addEventListener("dragover", function(ev){
				console.log(dragData);
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