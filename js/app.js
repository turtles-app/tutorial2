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

