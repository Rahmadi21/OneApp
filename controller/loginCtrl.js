angular.module('myApp.login', ['myApp.loginService','ngCookies'])
.controller('loginCtrl', function ($scope, $state, Login,ErrMsg, $mdDialog,$cookies) {
    $scope.login = function () {
        Login.login($scope.login).then(function (data) {
            if (Object.keys(data.data.detail).length === 1) {
                $state.go('home');
                var input = {
                'email' : data.data.detail.email,
                'username' :data.data.detail.username,
                'password' : data.data.detail.password,
                'foto_profil' : data.data.detail.foto_profil
                }
                $cookies.putObject('data',input);

            } else {
				ErrMsg.alert();    
				  
            }
        });
    };
})