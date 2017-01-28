/*
    Description: Configuration file for Reviews Page.
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
var module2 = angular.module('YourReservation2', [ 'ui.bootstrap']);
module2.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    }])

