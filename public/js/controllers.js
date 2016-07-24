var demoControllers = angular.module('demoControllers', ['angularUtils.directives.dirPagination']);

demoControllers.controller('ListCtrl', ['$scope', '$http','$timeout', function ($scope, $http) {

    $scope.apartments = [];
    $scope.order = '';
    // fetch data from JSON file
    $http.get('data/apartment.json').success(function(data) {

        $scope.apartments = data.apartments;

    });

    //Javascript initialization
    $(document).ready(function() {
        $('select').material_select();

        $('.parallax').parallax();
    });

}]);

demoControllers.controller('DetailCtrl', ['$scope','$http', '$routeParams',function ($scope, $http, $routeParams) {
    // retrieve name from $routeParams
    $scope.name = $routeParams.name;

}]);

