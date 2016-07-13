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

// Uses regex to removing the leading '&' and tailing ';' from string
// i.e. '&beta;' > 'beta'
function unEscape(str) {
	var re = new RegExp("&(.*);");
	var match = str.match(re);
	if (match.length > 1) {
		return match[1];
	}
};

// unEscape("&beta;");