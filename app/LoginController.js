/*
    Description: This angular controller handles all of the Login functionality. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.controller('LoginCtrl', ['$scope', '$state', 'YRService', 'toaster', '$rootScope', function ($scope, $state, YRService, toaster, $rootScope) {
    //Function call to retrieve AccessToken and log a user in.
    $scope.Login = function () {
        var obj = {};

        obj.UserName = $scope.UserName;
        obj.Password = $scope.Password;

        var data = JSON.stringify(obj);

        YRService.Login(data)
        .success(function (response) {
            if (response.message != 'Invalid Login') {
                //Store AccessToken in sessionStorage
                sessionStorage.setItem('AccessToken', response.AccessToken);
                //Store Username in sessionStorage.
                sessionStorage.setItem('UserName', response.UserName);
                sessionStorage.setItem('UserID', response.UserID);
                sessionStorage.setItem('LoggedIn', 'IsLoggedIn');
                YRService.LoginStatus = 'true';
                YRService.serviceToken = response.AccessToken;

                //Broadcast to Base Controller
                $rootScope.$broadcast('LoggedIn');
                $state.transitionTo('Profile.MyAccount');
            }
            else {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    text: 'Invalid UserName or Password'
                })
            }
        })
    }
   
}])
