var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('MainController', ['$scope', '$rootScope', 'Artists', 'Users', '$window', function($scope, $rootScope, Artists, Users, $window) {
	$scope.top = {};
	$scope.artists = {};
	$scope.user = {};
	$scope.logged = false;
	$scope.recent = Array();
	$scope.favorites = Array();
   	Artists.getTop(9, function(data){
   		$scope.top = data.data;
   	});
	
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
	
   	Artists.getRecent(9, function(data){
   		for (var i = 0; i < data.data.length; i++) {
   			Artists.getById(data.data[i].modelId, function(artist) {
   				$scope.recent.push(artist.data);
   			});
   		}
   	});
	
	if(loadUser($rootScope, $scope, $window)) {
		for (var i = 0; i < $scope.user.favorites.length; i++) {
			Artists.getById($scope.user.favorites[i], function(artist) {
   				$scope.favorites.push(artist.data);
   			});
		}
	}
	 
	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('SettingsController', ['$scope', '$rootScope', '$routeParams', 'Users', '$window', 'Artists', function($scope, $rootScope, $routeParams, Users, $window, Artists) {
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	
	if(!loadUser($rootScope, $scope, $window)) {
		$window.location.href = '/#/signin?redirect=' + encodeURIComponent('/#/user/settings/' + $routeParams.id);
	}
	
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
	
	$scope.update_user = function(){
		Users.update($scope.user, function(){});
	};

	$scope.delete_user = function(){
		Users.delete($scope.userID, function(){});
	};	

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('ArtistInfoController', ['$scope', '$rootScope', '$routeParams', '$window', 'Artists', 'Albums', function($scope, $rootScope, $routeParams, $window, Artists, Albums) {
	$scope.artist = "";
	$scope.members = Array();
	$scope.albums = null;
	$scope.ID = $routeParams.id;
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
	
	Artists.getById($scope.ID, function(data) {
		$scope.artist = data.data;
		
		if(data.data.isBand) {
			for (var i = 0; i < data.data.members.length; i++) {
				Artists.getById(data.data.members[i], function(artist) {
	   				$scope.members.push(artist.data);
	   			});
			}
		}
		
	});
	
	Albums.getByArtist($scope.ID, function(albums) {
		$scope.albums = albums.data;
	});
	
	loadUser($rootScope, $scope, $window);

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('ArtistEditController', ['$scope', '$rootScope', '$routeParams', '$window', '$route', 'Artists', function($scope, $rootScope, $routeParams, $window, $route, Artists) {
	$scope.artist = "";
	$scope.members = Array();
	$scope.ID = $routeParams.id;
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
	
	if(!loadUser($rootScope, $scope, $window)) {
		$window.location.href = '/#/signin?redirect=' + encodeURIComponent('/#/artists/edit/' + $routeParams.id);
	}
	
	Artists.getById($scope.ID, function(data){
		$scope.artist = data.data;
		
		if(data.data.isBand) {
			for (var i = 0; i < data.data.members.length; i++) {
				Artists.getById(data.data.members[i], function(artist) {
	   				$scope.members.push(artist.data);
	   			});
			}
		}
	});
	
	$scope.update_artist = function(){
		$scope.artist.userId = $scope.user._id;
		Artists.update($scope.artist,  function(){
			$window.location.href = '/#/artists/info/' + $scope.artist._id;
		});
	};

	$scope.delete_artist = function(){
		Artists.delete($scope.artistId, $scope.user._id,  function(){
			$window.location.href = '/#/home';
		});
	};
	
	$scope.add_member = function(memberId){
		$scope.artist.members.push(memberId);
		Artists.update($scope.artist, $scope.user._id,  function(){
			$route.reload();
		});
	};
	
	$scope.remove_member = function(memberId){
		$scope.artist.members.pop(memberId);
		Artists.update($scope.artist, $scope.user._id,  function(){
			$route.reload();
		});
	};

	$(document).ready(function (){
		initNavbar();
	});
}]);


demoControllers.controller('ArtistNewController', ['$scope', '$rootScope', '$window', 'Artists', function($scope, $rootScope, $window, Artists) {
	$scope.artist = {};
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
	
	if(!loadUser($rootScope, $scope, $window)) {
		$window.location.href = '/#/signin?redirect=' + encodeURIComponent('/#/artists/new');
	}
	
	$scope.save_artist = function(){
		$scope.artist.userId = $scope.user._id;
		Artists.post($scope.artist,  function(data){
			$window.location.href = '/#/artists/info/' + data.data._id;
		});
	};
	
	
	$(document).ready(function (){
		initNavbar();
	});
}]);


demoControllers.controller('AlbumInfoController', ['$scope', '$rootScope', '$routeParams', '$window', 'Albums', 'Artists', function($scope, $rootScope, $routeParams, $window, Albums, Artists) {
	$scope.artist = "";
	$scope.album = "";
	$scope.ID = $routeParams.id;
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
	
	loadUser($rootScope, $scope, $window);
	
	$(document).ready(function (){
		initNavbar();
	});
}]);


demoControllers.controller('AlbumEditController', ['$scope', '$rootScope', '$routeParams', '$window', 'Albums', 'Artists', function($scope, $rootScope, $routeParams, $window, Albums, Artists) {
	$scope.artist = "";
	$scope.album = "";
	$scope.ID = $routeParams.id;
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
	
	if(!loadUser($rootScope, $scope, $window)) {
		$window.location.href = '/#/signin?redirect=' + encodeURIComponent('/#/albums/edit/' + $routeParams.id);
	}
	
	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('AlbumNewController', ['$scope', '$rootScope', '$window', 'Albums', 'Artists', function($scope, $rootScope, $window, Albums, Artists) {
	$scope.album = null;
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
	
	if(!loadUser($rootScope, $scope)) {
		$window.location.href = '/#/signin?redirect=' + encodeURIComponent('/#/albums/new/');
	}
	
	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('SigninController', ['$scope', '$routeParams', '$rootScope', '$location', '$window', 'Users', function($scope, $routeParams, $rootScope, $location, $window, Users) {
	$scope.user = {};
	var redirect = '/#/home';
	if ($location.search().redirect !== undefined) {
		redirect = decodeURIComponent($location.search().redirect);
		console.log(redirect);
	}
	else {
		console.log("NOT HERE :(");
	}
	$scope.signin = function() {
		Users.signin($scope.user, function(data){
			$rootScope.user = data.user;
			$window.location.href = redirect;
			$location.url(redirect);
		});
	};	
	
	$(document).ready(function (){
		$('footer').css('display', 'none');
		$("nav").css('display', 'none');
		$('body').addClass('full-background');
	});

}]);

demoControllers.controller('SignoutController', ['$scope', '$routeParams', '$rootScope', '$location', '$window', function($scope, $routeParams, $rootScope, $location, $window, Users) {	
	
	$rootScope.user = undefined;
	$window.location.href = '/#/home';

}]);


demoControllers.controller('SignupController', ['$scope', '$rootScope', '$location', 'Users', function($scope, $rootScope, $location, Users) {
	$scope.user = {};
	
	$scope.signup = function() {
		Users.signup($scope.user, function(data){
			$rootScope.user = data.user;
			$location.url('/#/home');
		});
	};	
	
	$(document).ready(function (){
		$('footer').css('display', 'none');
		$("nav").css('display', 'none');
		$('body').addClass('full-background');
	});

}]);

function loadUser($rootScope, $scope, $window) {
	if($rootScope.user !== undefined) {
		$scope.logged = true;
		$scope.user = $rootScope.user;
		return true;
	}
	else {
		$scope.logged = false;
		return false;
	}
}

function initNavbar() {
	$('body').removeClass('full-background');
	$('footer').css('display', 'inline');
	$('#search-results').css('display', 'none');
	$('nav').css('display', 'inline');
	$('#navbar').css('display', 'inline');
	$(".dropdown-button").dropdown();
	$("#search-form").css('display', 'none');
	$("#search-trigger").on('click', function () {
		$("#navbar").css('display', 'none');
		$("#search-form").css('display', 'inline');
		$("#search").focus();
	});
	$("#close-search").on('click', function () {
		$("#navbar").css('display', 'inline');
		$("#search-form").css('display', 'none');
		$('#search-results').css('display', 'none');
	});
	$("#search").on('keyup', function () {
		if ($('#search').val().length > 0) {
			$('#search-results').css('display', 'block');
		}
		else {
			$('#search-results').css('display', 'none');
		}
	});
	$("#search-trigger-mobile").on('click', function () {
		$("#navbar").css('display', 'none');
		$("#search-form").css('display', 'inline');
		$("#search").focus();
	});
	$(".button-collapse").sideNav({
		closeOnClick: true
	});
}
