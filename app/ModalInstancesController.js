/*
    Description: This angular controller handles all of the Modals functionality. 
    Author: Gabriel Coach
    Contact: gsctca@gmail.com
*/
YourReserve.controller('ModalInstancesCtrl', ['$scope', 'YRService', '$state', '$uibModalInstance', function ($scope, YRService, $state, $uibModalInstance) {
    //Close Modal
    $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
    }

    //Close modal and go to home view.
    $scope.okRes = function () {
        $uibModalInstance.dismiss('cancel');
        $state.transitionTo('Home');
    }

}])