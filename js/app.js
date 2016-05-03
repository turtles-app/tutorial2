//app.js
var app = angular.module("app", ['toastr']);


// Filter allows interpetation of unicode
app.filter('html',function($sce){
    return function(input){
        return $sce.trustAsHtml(input);
    }
});