/*
    Description: Base Angular controller for the application. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.controller('BaseCtrl', ['$scope', 'YRService', '$state', function ($scope, YRService, $state) {
    $scope.LoggedIn = '';
    
    //Set the login status cookie in sessionStorage
    var loginStatus = sessionStorage.getItem('LoggedIn')

    //Determine if a user is logged in or not.
    if (loginStatus != null) {
        YRService.LoginStatus = 'true';
        $scope.LoggedIn = YRService.LoginStatus;
    }
   
    //Log a user out
    $scope.LogOut = function () {
        YRService.serviceLoggedIn = false;
        $scope.LoggedIn = false;
        sessionStorage.removeItem('AccessToken');
        sessionStorage.removeItem('LoggedIn');
        $state.transitionTo('Home')
    }

    //Set $scope variable when a login is executed.
    $scope.$on('LoggedIn', function () {
        $scope.LoggedIn = 'true';
    })

    
}])