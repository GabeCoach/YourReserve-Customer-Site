/*
    Description: This angular controller handles all of the Search functionality for the Search view.
    Google maps feature is not implemented yet.
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.controller('SearchRestaurantsCtrl', ['$scope', '$http', '$state', 'YRService', 'toaster', function ($scope, $http, $state, YRService, toaster) {
    $scope.Search = "";

    $http({
        method: 'GET',
        url: 'http://ipinfo.io/json'
    }).success(function (response) {
        $scope.Location = response;
    })

    //Go to reservation after restaurant has been chosen.
    $scope.goToReservation = function (ID) {
        YRService.mainPageRestID = ID;
        YRService.serviceRestaurantChosen = true;
        $state.transitionTo('Reservations');
    }

    /*
    Code for google Maps Feature
    */
    //$http({
    //    method: 'GET',
    //    url: 'http://www.yourreservation.entellication.com/api/RestaurantLocations',
    //    dataType: 'json'
    //}).success(function (response) {
    //    $scope.RestLocation = response;

    //    var oAddress = [];


    //    angular.forEach(response, function (value, index) {


    //        var Address = value.Address.replace("/ /g", ",");
    //        var City = value.City
    //        var State = value.State_Province;
    //        oAddress = Address.split(",");



    //        $http({
    //            method: 'GET',
    //            url: 'http://www.yourreservation.entellication.com/api/Restaurants/LatLng/' + oAddress[0] + "~" + oAddress[1] + "~" + oAddress[2] + "~" + City + "~" + State,
    //        }).success(function (response) {
    //            var location = JSON.stringify(response);
    //            var Marker = new google.maps.Marker;
    //            var Lat = response.Lat;
    //            var Lng = response.Lng;

    //            $scope.addMarker(Lat, Lng);

    //        }).error(function (err) {
    //            //alert(JSON.stringify(err));
    //        })

    //    });

    //}).error(function (err) {
    //    //alert(JSON.stringify(err));
    //});

   //Retrieve a list of restaurants and configure pagination.
    YRService.GetRestaurants()
    .success(function (response) {
        $scope.Restaurants = response;

        var TotalItems = $scope.Restaurants.length;

        //Pagination
        $scope.totalItems = TotalItems;

        $scope.currentPage = 1;
        $scope.itemsPerPage = 8;

        $scope.maxSize = 5;
    }).error(function (err) {
        //alert(JSON.stringify(err));
    });

   
    //Search restaurants function
    $scope.SearchRestaurants = function (SearchCriteria) {
        if (SearchCriteria == "" || SearchCriteria == undefined) {
            YRService.SearchRestaurant()
            .success(function (response) {
                YRService.serviceSearchResults = response
                $scope.Restaurants = YRService.serviceSearchResults;
            }).error(function (err) {

            })
        }
        else {
            YRService.SearchRestaurantWithCriteria(SearchCriteria)
            .success(function (response) {
                YRService.serviceSearchResults = response
                $scope.Restaurants = YRService.serviceSearchResults;
            }).error(function (err) {

            })
        }
        
    }

    //Google Map Options
    $scope.myMarkers = [];
    var GeoLat = "";
    var GeoLng = "";

    //$http({
    //    method: 'POST',
    //    url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCwgOFfOV8dvATrRpQz3XlAwg8VH7JNNWo',
    //}).success(function (response) {
    //    //$scope.GeoLocation = response;
    //    GeoLat = response.location.lat;
    //    GeoLng = response.location.lng;

    //}).error(function (err) {
    //    //alert(JSON.stringify(err));
    //})

    //$scope.mapOptions = {

    //    center: new google.maps.LatLng(38.6272, -90.199402),
    //    zoom: 15,
    //    mapTypeId: google.maps.MapTypeId.ROADMAP
    //};

    //$scope.addMarker = function (Lat, Lng) {
    //    $scope.myMarkers.push(new google.maps.Marker({
    //        map: $scope.myMap,
    //        position: new google.maps.LatLng(Lat, Lng),
    //    }));
    //};

    //$scope.setZoomMessage = function (zoom) {
    //    $scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
    //    console.log(zoom, 'zoomed');
    //};

    //$scope.openMarkerInfo = function (marker) {
    //    $scope.currentMarker = marker;
    //    $scope.currentMarkerLat = marker.getPosition().lat();
    //    $scope.currentMarkerLng = marker.getPosition().lng();
    //    $scope.myInfoWindow.open($scope.myMap, marker);
    //};

    //$scope.setMarkerPosition = function (marker, lat, lng) {
    //    marker.setPosition(new google.maps.LatLng(lat, lng));
    //};
}])