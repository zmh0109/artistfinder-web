var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices']);

demoApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
	$httpProvider.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' };
	$httpProvider.defaults.headers.put  = {'Content-Type': 'application/x-www-form-urlencoded'};
	$routeProvider.
	 when('/list', {
	 templateUrl: 'partials/list.html',
	 controller: 'ListCtrl'
	}).
	when('/detail/:id', {
	 templateUrl: 'partials/detail.html',
	 controller: 'ArtistInfoController'
	}).
	when('/artists/edit/:id', {
	 templateUrl: 'partials/artistEdit.html',
	 controller: 'ArtistEditController'
	}).
	when('/artists/new', {
	 templateUrl: 'partials/artistNew.html',
	 controller: 'ArtistNewController'
	}).
	when('/albums/info/:id', {
	 templateUrl: 'partials/album.html',
	 controller: 'AlbumInfoController'
	}).
	when('/albums/edit/:id', {
	 templateUrl: 'partials/albumEdit.html',
	 controller: 'AlbumEditController'
	}).
	when('/albums/new', {
	 templateUrl: 'partials/albumNew.html',
	 controller: 'AlbumNewController'
	}).
	when('/user/settings', {
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
	when('/signout', {
	 templateUrl: 'partials/signout.html',
	 controller: 'SignoutController'
	}).
	when('/notification', {
		templateUrl: 'partials/notification.html',
		controller: 'NotificationController'
	}).
	otherwise({
	 redirectTo: '/list'
	});
}]);

demoApp.run(function($rootScope) {
    $rootScope.user = undefined;
})