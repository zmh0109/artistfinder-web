var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices']);

demoApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	$httpProvider.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' };
	$httpProvider.defaults.headers.put  = {'Content-Type': 'application/x-www-form-urlencoded'};
	$routeProvider.
	 when('/home', {
	 templateUrl: 'partials/main.html',
	 controller: 'MainController'
	}).
	when('/artists/:id', {
	 templateUrl: 'partials/artist.html',
	 controller: 'ArtistController'
	}).
	when('/user/settings/:id', {
	 templateUrl: 'partials/settings.html',
	 controller: 'SettingsController'
	}).
	when('/home/:id', {
	 templateUrl: 'partials/main.html',
	 controller: 'MainLoggedController'
	}).
	when('/signin', {
	 templateUrl: 'partials/signin.html',
	 controller: 'SigninController'
	}).
	when('/signup', {
	 templateUrl: 'partials/signup.html',
	 controller: 'SignupController'
	}).
	otherwise({
	 redirectTo: '/home'
	});
}]);