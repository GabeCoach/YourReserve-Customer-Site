/*
    Description: This service handles all of the calls to the YourReserve API. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.factory('YRService', ['$http', function ($http) {
    _BaseUrl = 'http://www.yourreservation.entellication.com/';
    _serviceLoggedIn = false;
    _serviceToken = sessionStorage.getItem('AccessToken');
    _serviceUserName = "";

   
    var loginConfig = {
        headers : {
            'Content-Type': 'application/json'
        }
    }

    var Config = {
        headers : {
            'Content-Type': 'application/json',
            "authorization": 'bearer ' + _serviceToken
        }
    }

    _loginStatus = '';
    _RestaurantID = 0;
    _mainPageRestID = 0;
    _serviceRestaurant = {};
    _GetRestaurant = {};
    _serviceSearchRestaurant = {};
    _SearchRestaurant = {};
    _serviceSelectedRestaurant = {};
    _serviceRestaurantChosen = false;
    _serviceReservationSubmitted = {};
    _GetAvailableTimes = {};
    _serviceAvailableTimes = {};
    _PostReservation = {};
    _SearchRestaurantWithCriteria = {};
    _SearchRestaurant = {};
    _serviceSearchResults = {};
    _GetReservationByID = {};
    _serviceReservationID = 0;

    _RegisterUser = {};
    _serviceRegisterUserInfo = {};
    _Login = {};
    _ValidateLogin = {};

    _serviceCustomerReservations = {};
    _GetCustomerReservations = {};
    _servicePutReservationData = {};
    _PutCustomerReservation = {};
    _PostCancellation = {};
    _ForgotPassword = {};
    
    _serviceTop5Restaurants = {};
    _GetTop5Restaurants = {};

    _serviceUserInfo = {};
    _GetUserInfo = {};

    _serviceCustomerInfo = {};
    _GetCustomerInfo = {};

    _UpdateUserInfo = {};
    _serviceRestaurants = {};
    _GetRestaurants = {};

    _serviceCountries = {};
    _GetCountries = {};
    _serviceStates = {};
    _GetStates = {};

    var _GetCountries = function () {
        return $http.get('json/countries.json');
    }

    var _GetStates = function () {
        return $http.get('json/states_hash.json');
    }

    var _GetRestaurants = function () {
        return $http.get(_BaseUrl + 'api/Restaurants');
    }

    var _UpdateUserInfo = function (ID, data) {
        return $http.put(_BaseUrl + 'api/Users/' + ID, data)
    }

    var _GetUserInfo = function (ID) {
        return $http.get(_BaseUrl + 'api/Users/' + ID);
    }

    var _GetTop5Restaurants = function () {
        return $http.get(_BaseUrl + 'api/RestaurantReviews/getTopRestaurants');
    }

    var _ForgotPassword = function (data) {
        return $http.post(_BaseUrl + 'api/Users/ForgotPassword', data);
    }
    
    var _ValidateLogin = function () {
        return $http.get(_BaseUrl + 'api/Values', {
            headers: { 'Authorization': 'Bearer ' + _serviceToken }
        });
    }

    var _PostCancellation = function (data) {
        return $http.post(_BaseUrl + 'api/Cancellations', data, Config);
    }

    var _PutCustomerReservation = function (ID, data) {
        return $http.put(_BaseUrl + 'api/Reservations/' + ID, data);
    }


    var _GetCustomerReservations = function (ID) {
        return $http.get(_BaseUrl + 'api/Reservations/getCustomerReservations/' + ID, Config);
    }

    var _GetReservationsByID = function (ID) {
        return $http.get(_BaseUrl + 'api/Reservations/' + ID, Config)
    }

    var _Login = function (data) {
        return $http.post(_BaseUrl + 'api/LoginController/LoginCustomer', data, Config)
    }
    var _RegisterUser = function (data) {
        return $http.post(_BaseUrl + 'api/Users', data, Config);
    }

    var _PostReservation = function (data) {
        return $http.post(_BaseUrl + 'api/Reservations', data, Config);
    }

    var _SearchRestaurant = function () {
        return $http.get(_BaseUrl + 'api/Restaurants', Config)
    }

    var _SearchRestaurantWithCriteria = function (data) {
        return $http.get(_BaseUrl + 'api/Restaurants/SearchRestaurant/' + data, Config)
    }

    var _GetRestaurant = function (ID) {
        return $http.get(_BaseUrl + 'api/Restaurants/' + ID, Config);
    }

    var _GetAvailableTimes = function (data) {
        return $http.post(_BaseUrl + 'api/Reservations/getAvailableTimes', data, Config);
    }

    return {
        loginStatus: _loginStatus,
        RestaurantID: _RestaurantID,
        mainPageRestID: _mainPageRestID,
        BaseUrl: _BaseUrl,
        serviceRestaurant: _serviceRestaurant,
        GetRestaurant: _GetRestaurant,
        serviceSearchRestaurant: _serviceSearchRestaurant,
        SearchRestaurant: _SearchRestaurant,
        serviceSelectedRestaurant: _serviceSelectedRestaurant,
        serviceRestaurantChosen: _serviceRestaurantChosen,
        serviceReservationSubmitted: _serviceReservationSubmitted,
        serviceAvailableTimes: _serviceAvailableTimes,
        GetAvailableTimes: _GetAvailableTimes,
        PostReservation: _PostReservation,
        SearchRestaurantWithCriteria: _SearchRestaurantWithCriteria,
        serviceSearchResults: _serviceSearchResults,
        RegisterUser: _RegisterUser,
        serviceRegisterUserInfo: _serviceRegisterUserInfo,
        serviceLoggedIn: _serviceLoggedIn,
        Login: _Login,
        serviceLoggedIn: _serviceLoggedIn,
        serviceToken: _serviceToken,
        serviceUserName: _serviceUserName,
        GetReservationsByID: _GetReservationsByID,
        serviceReservationID: _serviceReservationID,
        serviceCustomerReservations: _serviceCustomerReservations,
        GetCustomerReservations: _GetCustomerReservations,
        servicePutReservationData: _servicePutReservationData,
        PutCustomerReservation: _PutCustomerReservation,
        PostCancellation: _PostCancellation,
        ValidateLogin: _ValidateLogin,
        ForgotPassword: _ForgotPassword,
        serviceTop5Restaurants: _serviceTop5Restaurants,
        GetTop5Restaurants: _GetTop5Restaurants,
        GetUserInfo: _GetUserInfo,
        serviceUserInfo: _serviceUserInfo,
        UpdateUserInfo: _UpdateUserInfo,
        serviceRestaurants: _serviceRestaurants,
        GetRestaurants: _GetRestaurants,
        serviceCountries: _serviceCountries,
        GetCountries: _GetCountries,
        serviceStates: _serviceStates,
        GetStates: _GetStates
    }
   
}])