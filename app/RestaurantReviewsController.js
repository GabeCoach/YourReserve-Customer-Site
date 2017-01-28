/*
    Description: This angular controller handles all of the Restaurant Reviews page functionality. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
var module = angular.module('YourReservation2')
module.controller('RestReviewsCtrl', ['$scope', '$http', '$uibModal', function ($scope, $http, $uibModal) {

    //Get the ID from Url query 
    function getQueryParameter(parameterName) {
        var queryString = window.top.location.search.substring(1);
        var parameterName = parameterName + "=";
        if (queryString.length > 0) {
            begin = queryString.indexOf(parameterName);
            if (begin != -1) {
                begin += parameterName.length;
                end = queryString.indexOf("&", begin);
                if (end == -1) {
                    end = queryString.length
                }
                return unescape(queryString.substring(begin, end));
            }
        }
        return "null";
    }

    var ID = getQueryParameter('id');
    var TotalItems = null;

    //Retrieve the specific restaurant information from the database.
    $http({
        method: 'GET',
        url: 'http://www.yourreservation.entellication.com/api/Restaurants/' + ID
    }).success(function (response) {
        $scope.Restaurant = response;
    }).error(function (err) {
        alert(JSON.stringify(err));
    })

    //Retrieve a list of restaurants to populate the right side search bar.
    $http({
        method: 'GET',
        url: 'http://www.yourreservation.entellication.com/api/Restaurants'
    }).success(function (response) {
        $scope.Restaurants = response;

        var TotalItemsRest = $scope.Restaurants.length;

        //Pagination functionality
        $scope.totalItemsRest = TotalItems;

        $scope.currentPageRest = 1;
        $scope.itemsPerPageRest = 5;

        $scope.maxSize = 5;
    }).error(function (err) {
        alert(JSON.stringify(err));
    })

    //Retrieve Restaurant About information
    $http({
        method: 'GET',
        url: 'http://www.yourreservation.entellication.com/api/RestaurantAbouts/' + ID
    }).success(function (response) {
        $scope.RestaurantsAbout = response;
    }).error(function (err) {
        alert(JSON.stringify(err));
    })

    //Retrieve Restaurant reviews information
    $http({
        method: 'GET',
        url: 'http://www.yourreservation.entellication.com/api/RestaurantReviews/getReviewByRestaurant/' + ID
    }).success(function (response) {

        $scope.Reviews = response;
        TotalItems = $scope.Reviews.length;
   
        //Pagination
        $scope.totalItems = TotalItems;

        $scope.currentPage = 1;
        $scope.itemsPerPage = 5;

        $scope.maxSize = 5;
    }).error(function (err) {
        alert(JSON.stringify(err));
    })

    //Retrieve Restaurant location information
    $http({
        method: 'GET',
        url: 'http://www.yourreservation.entellication.com/api/RestaurantLocations/' + ID
    }).success(function (response) {
        $scope.Location = response;
    }).error(function (err) {
        alert(JSON.stringify(err));
    })

    //Retrieve restaurant contact information
    $http({
        method: 'GET',
        url: 'http://www.yourreservation.entellication.com/api/RestaurantContacts/' + ID
    }).success(function (response) {
        $scope.Contact = response;
    }).error(function (err) {
        alert(JSON.stringify(err));
    })

    //Search restaurants.
    $scope.SearchRestaurants = function (SearchCriteria) {

        if (SearchCriteria == "")
        {
            $http({
                method: 'GET',
                url: 'http://www.yourreservation.entellication.com/api/Restaurants'
            }).success(function (response) {
                $scope.Restaurants = response;
            }).error(function (err) {
                alert(JSON.stringify(err));
            })
        }
        else {
            $http({
                method: 'GET',
                url: 'http://www.yourreservation.entellication.com/api/Restaurants/SearchRestaurant/' + SearchCriteria
            }).success(function (response) {
                $scope.Restaurants = response;
            }).error(function (err) {
                alert(JSON.stringify(err));
            })
        }

        
    }

    //Submit Review for a specific restaurant.
    $scope.SubmitReview = function () {

        var currentdate = new Date
        var Month = currentdate.getMonth() + 1
        var datetime = Month + "/" + currentdate.getDate()
                         + "/" + currentdate.getFullYear();
                        

        var data = {
            'RestaurantID': ID,
            'ReviewName': $scope.RestReviews.Name,
            'ReviewContent': $scope.RestReviews.Content,
            'Rating': $scope.RestReviews.Ratings,
            'ReviewDateTime': datetime
        }

       

       var JSONdata = JSON.stringify(data);
       

        $http({
            method: 'POST',
            url: 'http://www.yourreservation.entellication.com/api/RestaurantReviews',
            data: JSONdata,
            headers: {
                'Content-type': 'application/json'
            }
        }).success(function () {
            alert("Review Submitted");

            $scope.RestReviews.Name = null;
            $scope.RestReviews.Content = null;

            $http({
                method: 'GET',
                url: 'http://www.yourreservation.entellication.com/api/RestaurantReviews/getReviewByRestaurant/' + ID
            }).success(function (response) {
                $scope.Reviews = response;
                
            }).error(function (err) {
                alert(JSON.stringify(err));
            })

        }).error(function (err) {
            alert(JSON.stringify(err));
        })
    }

    //Reservation Modal
    $scope.open = function () {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'ReservationModal.html',
            controller: 'ReservationModalInstanceCtrl',
            size: 'lg'
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
   
}])

module.controller('ReservationModalInstanceCtrl', ['$scope', '$http', '$uibModalInstance', function ($scope, $http, $uibModalInstance) {

    function getQueryParameter(parameterName) {
        var queryString = window.top.location.search.substring(1);
        var parameterName = parameterName + "=";
        if (queryString.length > 0) {
            begin = queryString.indexOf(parameterName);
            if (begin != -1) {
                begin += parameterName.length;
                end = queryString.indexOf("&", begin);
                if (end == -1) {
                    end = queryString.length
                }
                return unescape(queryString.substring(begin, end));
            }
        }
        return "null";
    }

    var ID = getQueryParameter('id');

    $http({
        method: 'GET',
        url: 'http://www.yourreservation.entellication.com/api/Restaurants/'+ ID,
        dataType: 'json'
    }).success(function (response) {
        $scope.Restaurant = response;
    }).error(function (err) {
        alert(JSON.stringify(err));
    });

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

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.SubmitReservation = function () {

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
            oData.UserID = $scope.Reserve.User;
            oData.RestaurantID = $scope.Reserve.Restaurants;
            //    Stringify object
            var sData = JSON.stringify(oData);

            $http({
                method: 'POST',
                url: 'http://www.yourreservation.entellication.com/api/Reservations',
                data: sData,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
                }
            }).success(function () {
                alert("Reservation Sent");
                $uibModalInstance.dismiss('cancel');
            }).error(function (err) {
                alert(JSON.stringify(err));
            })
        }

    }
}])

