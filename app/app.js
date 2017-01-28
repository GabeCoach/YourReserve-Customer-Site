/*
    Description: Configuration file for routing and the angular app module
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
var YourReserve = angular.module('YourReservation', ['ui.router', 'ngRoute', 'ui.bootstrap', 'ui.map', 'toaster', 'ngAnimate', 'ui.router.modal' ]);
YourReserve.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function ($httpProvider, $stateProvider, $urlRouterProvider) {
        //Set default post header
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        
        //Url Routing definitions.
        $stateProvider
        .state('Home', {
            url: "/Home",
            templateUrl: "templates/MainPage.html"
        }).state('Login', {
            url: "/Login",
            templateUrl: "templates/Login.html"
        }).state('Reservations', {
            url: "/Reservations",
            templateUrl: "templates/Reservations.html"
        }).state('SearchRestaurant', {
            url: "/SearchRestaurant",
            templateUrl: "templates/SearchRestaurant.html"
        }).state('ForRestaurants', {
            url: "/ForRestaurants",
            templateUrl: "templates/ForRestaurants.html"
        }).state('Reviews', {
            url: "/Reviews",
            templateUrl: "templates/Reviews.html"
        }).state('Registration', {
            url: "/Registration",
            templateUrl: "templates/Registration.html"
        }).state('Profile', {
            url: "/Profile",
            abstract:true,
            templateUrl: "templates/CustomerProfileBase.html"
        }).state('Profile.MyAccount', {
            url: "",
            templateUrl: "templates/MyAccountTemplate.html"
        }).state('Profile.EditProfile', {
            templateUrl: "templates/EditProfileTemplate.html"
        }).state('ReservationConfirmation', {
            url: "/ReservationConfirmation",
            templateUrl: "templates/ReservationConfirmation.html"
        }).state('ForgotPassword', {
            url: '/ForgotPassword',
            templateUrl: "templates/ForgotPassword.html"
        })
        
        $urlRouterProvider.otherwise('/Home');
    }])

