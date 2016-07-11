//app.js
var app = angular.module("app", ['toastr']);

var dragData={
	type:"",
	index: null
};
// Filter allows interpetation of unicode
app.filter('html',function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
});

// Uses regex to removing preceding '&' from string
// i.e. '&beta' > 'beta'
function unEscape(str) {
	var re = new RegExp("&(.*);");
	var match = str.match(re);
	console.log(match[1]);
	return match[1];
};

unEscape('&beta');