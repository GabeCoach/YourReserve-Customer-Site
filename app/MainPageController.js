/*
    Description: This angular controller handles all of the Home page functionality. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.controller('MainPageCtrl', ['$scope', '$http', '$state', 'YRService', function ($scope, $http, $state, YRService) {
    //Get the user's City location from their ip address info
    $http({
        method: 'GET',
        url: 'http://ipinfo.io/json'
    }).success(function (response) {
        $scope.Location = response;
    })

    //Retrieve the top rated restaurants from the database
    YRService.GetTop5Restaurants()
    .success(function (response) {
        YRService.serviceTop5Restaurants = response;
        $scope.Restaurants = YRService.serviceTop5Restaurants;
    }).error(function (err) {
        alert(JSON.stringify(err));
    });

    //Go the reservation view.
    $scope.goToReserve = function (ID) {
        YRService.mainPageRestID = ID;
        $state.transitionTo('Reservations');
    }
}])