﻿/*
    Description: This angular controller handles all of the Registration functionality. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.controller('RegistrationCtrl', ['$scope', '$http', '$uibModal', 'YRService', function ($scope, $http, $uibModal, YRService) {
    //Get list of countries from theCountries JSON file
    YRService.GetCountries()
    .success(function (response) {
        YRService.serviceCountries = response;
        $scope.Countries = YRService.serviceCountries;
    })

    //Get list of states from the States JSON file
    YRService.GetStates()
    .success(function (response) {
        YRService.serviceStates = response;
        $scope.States = YRService.serviceStates;
    })

    //Register a user in the Database.
    $scope.Register = function () {
        var Obj = {};

        Obj.FirstName = $scope.RegFirstName;
        Obj.LastName = $scope.RegLastName;
        Obj.PhoneNumber = $scope.RegPhoneNumber;
        Obj.Email = $scope.RegEmail;
        Obj.Address = $scope.RegAddress;
        Obj.City = $scope.RegCity;
        Obj.State_Province = $scope.RegState_Province;
        Obj.Country = $scope.RegCountry;
        Obj.ZipCode = $scope.RegZipCode;
        Obj.UserName = $scope.RegUserName;
        Obj.Password = $scope.RegPassword;

        var data = JSON.stringify(Obj);

        $http({
            method: 'POST',
            url: 'http://localhost/YourReserve/api/Users',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).success(function (response) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modals/RegisterConfirmModal.html',
                controller: 'ModalInstancesCtrl',
                size: 'sm'
            });
        }).error(function (err) {
            alert(JSON.stringify(err))
        })
    }
}])