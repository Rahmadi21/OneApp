angular.module('myApp.login', ['myApp.loginService'])
.controller('loginCtrl', function ($scope, $state, Login,ErrMsg, $mdDialog) {
    $scope.login = function () {
        Login.login($scope.login).then(function (data) {
            if (Object.keys(data.data.detail).length === 1) {
                $state.go('home');
            } else {
				ErrMsg.alert();    
				  
            }
        });
    };
})