angular.module('myApp.hai',['ngCookies'])
.controller('cocok', function($scope,$cookies){
	var cok = $cookies.getObject('data');
	$scope.hihi = cok;
})