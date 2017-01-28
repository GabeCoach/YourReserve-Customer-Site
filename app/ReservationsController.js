/*
    Description: This angular controller handles all of the Reservations view functionality. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.controller('ReservationsCtrl', ['$scope', '$http', 'toaster', 'YRService', '$state', '$uibModal', function ($scope, $http, toaster, YRService, $state, $uibModal) {

    //Set $scope variables to their appropriate values.
    $scope.RestChosen = YRService.serviceRestaurantChosen;
    $scope.ResSubmitted = {};
    var selectedRestID = YRService.mainPageRestID;
    $scope.Reserve = {};
    $scope.RestaurantID = {};

    //Watch Date Text Field and get available times
    $scope.$watch('Reserve.Date', function (newValue, oldValue) {

        if (newValue != undefined) {
            var obj = {};
            obj.Date = newValue;
            obj.RestaurantID = selectedRestID;
            var data = JSON.stringify(obj);

            YRService.GetAvailableTimes(data)
            .success(function (response) {
                $scope.availableTimes = response;
            }).error(function (err) {
                toaster.pop({
                    type: 'error',
                    title: 'Error!',
                    body: 'Restaurant is not open on this day.'
                })
            })
        }      
    });

    if (selectedRestID != 0) {
        YRService.GetRestaurant(selectedRestID)
        .success(function (response) {
            YRService.serviceRestaurant = response;
            $scope.Restaurant = YRService.serviceRestaurant;
        })
    }

    //Code for Date Text Field.
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function (date, mode) {
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    };

    $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events =
      [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
      ];

    $scope.getDayClass = function (date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };

    $scope.ResetForm = function () {
        $scope.Reserve = '';
    }

    //Post Reservation to the database.
    $scope.SubmitReservation = function () {
        //    Create object
        var oData = {};
        //    Populate object
        oData.ReservationDate = $scope.Reserve.Date;
        oData.ReservationTime = $scope.Reserve.Time;
        oData.PartyNumber = $scope.Reserve.Party;
        oData.FirstName = $scope.Reserve.FirstName;
        oData.LastName = $scope.Reserve.LastName;
        oData.PhoneNumber = $scope.Reserve.Phone;
        oData.Email = $scope.Reserve.Email;
        oData.SpecialRequest = $scope.Reserve.Request;
        oData.UserID = sessionStorage.getItem('UserID');
        oData.RestaurantID = selectedRestID;
        //    Stringify object
        var sData = JSON.stringify(oData);
        $scope.ResSubmitted = sData;

        YRService.PostReservation(sData)
       .success(function () {
           var modalInstance = $uibModal.open({
               animation: $scope.animationsEnabled,
               templateUrl: 'modals/ReservationConfirmationModal.html',
               controller: 'ModalInstancesCtrl',
               size: 'sm'
           });
        }).error(function (err) {
            alert(JSON.stringify(err));
        })
    }
}])