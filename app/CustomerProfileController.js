/*
    Description: This angular controller handles all of the Customer profile functionality. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.controller('CustomerProfileCtrl', ['$scope', '$http', '$state', 'YRService', '$uibModal', 'toaster', function ($scope, $http, $state, YRService, $uibModal, toaster) {
    //Set variables to be used throughout the controller
    var TokenKey = sessionStorage.getItem('AccessToken');
    var UserID = sessionStorage.getItem('UserID');

    //Transfer to My Account view
    $scope.openMyAccount = function () {
        $state.transitionTo('Profile.MyAccount');
    }

    //Transfer to Edit Profile view
    $scope.openEditProfile = function () {
        $state.transitionTo('Profile.EditProfile');
    }

    //Cancel a reservation and send to the database
    $scope.cancelReservation = function (ID) {
        var obj = {};
        var date = new Date();

        obj.ReservationID = ID;
        var Hours = date.getHours();
        var Minutes = date.getMinutes();
        var Time = Hours + ":" + Minutes;
        obj.CancellationTime = Time;
        obj.CancellationDate = date;

        var data = JSON.stringify(obj);

        YRService.PostCancellation(data)
        .success(function () {
            toaster.pop({
                type: 'success',
                title: 'Cancelled',
                body: 'Your Reservation has been cancelled.'
            })
        })
    }

    //Updates a users profile
    $scope.UpdateProfileInfo = function () {
        var obj = $scope.Edit;

        var data = JSON.stringify(obj);

        YRService.UpdateUserInfo(UserID, data)
        .success(function (response) {
            $state.transitionTo('Profile.MyAccount');

            toaster.pop({
                type: 'success',
                title: 'Updated',
                body: 'Your Profile has been cancelled.'
            })
        })
    }

    //Opens a modal to edit a users reservation
    $scope.editReservation = function (ID) {
        YRService.serviceReservationID = ID;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modals/EditCustomerReservationModal.html',
            controller: 'EditCustReservationCtrl',
            size: 'md'
        });
    }

    //Calls service to retrieve a specific users information.
    YRService.GetUserInfo(UserID)
    .success(function (response) {
        YRService.serviceUserInfo = response;
        $scope.Edit = YRService.serviceUserInfo;
        $scope.UserInfo = YRService.serviceUserInfo;
    }).error(function (data, status, headers, config) {
        TokenKey = "";
        $scope.Token = "";
        switch (status) {
            case 401: {
                alert("Authentication session may have expired. Please log in again.");

                $state.go('Home')
            }
        }
    })
    
    //Calls service to retrieve a specific users reservations.
    YRService.GetCustomerReservations(UserID)
   .success(function (response) {
       YRService.serviceCustomerReservation = response;
       $scope.Reservations = YRService.serviceCustomerReservation;
    }).error(function (data, status, headers, config) {
        TokenKey = "";
        $scope.Token = "";
        switch (status) {
            case 401: {
                alert("Authentication session may have expires. Please log in again.");

                $state.go('Home')
            }
        }
    })
}])