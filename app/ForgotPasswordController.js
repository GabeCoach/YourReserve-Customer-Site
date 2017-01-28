/*
    Description: This angular controller handles the forgot password functionality. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.controller('ForgotPasswordCtrl', ['$scope', 'YRService', '$state', '$uibModal', function ($scope, YRService, $state, $uibModal) {

    //Function call to email a user their forgotten password.
    $scope.forgotPassword = function () {
        var obj = {};
        obj.UserName = $scope.UserName;

        var data = JSON.stringify(obj);

        YRService.ForgotPassword(data)
        .success(function (response) {
            $state.transitionTo('Home');

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'modals/PasswordSent.html',
                controller: 'ModalInstancesCtrl',
                size: 'sm'
            });
        })
    }
}])