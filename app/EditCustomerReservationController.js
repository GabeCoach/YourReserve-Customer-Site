/*
    Description: This angular controller handles editing a specific users reservation. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.controller('EditCustReservationCtrl', ['$scope', 'YRService', '$state', '$uibModalInstance', 'toaster', function ($scope, YRService, $state, $uibModalInstance, toaster) {
    //Id to be used in service calls.
    var ID = YRService.serviceReservationID;

    //Get the specific reservation to be updated
    YRService.GetReservationsByID(ID)
    .success(function (response) {
        YRService.servicePutReservationData = response;
        $scope.EditRes = YRService.servicePutReservationData;
    })

    //Submit updated reservation to the database.
    $scope.putReservation = function () {
        var obj = $scope.EditRes;
        var data = JSON.stringify(obj);

        YRService.PutCustomerReservation(ID, data)
        .success(function () {
            $uibModalInstance.dismiss('cancel')
            toaster.pop({
                type: 'success',
                title: 'Updated',
                body: 'Your Reservation has been updated.'
            })
        })
        
    }

    /*
        Date input box configurations...
    */
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

}])