var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices','angularUtils.directives.dirPagination']);

demoApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	$httpProvider.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' };
	$httpProvider.defaults.headers.put  = {'Content-Type': 'application/x-www-form-urlencoded'};
	$routeProvider.
    // page navigation
    when('/list', {
	 templateUrl: 'partials/list.html',
	 controller: 'ListCtrl'
	}).
	when('/details/:name', {
	 templateUrl: 'partials/detail.html',
	 controller: 'DetailCtrl'
	}).
	otherwise({
	 redirectTo: '/list'
	});
}]);

demoApp.run(function($rootScope) {
    $rootScope.user = undefined;
});