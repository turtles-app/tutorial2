app.directive("customDroppable", function(){
	return{
		scope: {
			dropAllowed: "&",
			onDrop: "&"

		},
		link: function(scope, element, attrs){
			var el = element[0];
			el.addEventListener("dragover", function(ev){
				var checkDrop = scope.dropAllowed();
				if (checkDrop()){
					ev.preventDefault();
				}
			});
			el.addEventListener("drop", function(ev){
				var onDrop = scope.onDrop();
				onDrop();
			})
		}
	}
});