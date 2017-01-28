/*
    Description: This angular controller handles all of Restaurant reviews view functionality. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.controller('ReviewsCtrl', ['$scope', '$http', function ($scope, $http) {

    //Retrieve a list of restaurants from the database.
    $http({
        method: 'GET',
        url: 'http://www.yourreservation.entellication.com/api/Restaurants',
        dataType: 'json'
    }).success(function (response) {
        $scope.Restaurants = response;

        var TotalItems = $scope.Restaurants.length;

        //Pagination
        $scope.totalItems = TotalItems;

        $scope.currentPage = 1;
        $scope.itemsPerPage = 8;

        $scope.maxSize = 5;
    }).error(function (err) {
        alert(JSON.stringify(err));
    });

}])