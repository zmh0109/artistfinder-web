var demoControllers = angular.module('demoControllers', ['720kb.datepicker']);

demoControllers.controller('MainController', ['$scope', '$rootScope', 'Artists', 'Users', '$window', function($scope, $rootScope, Artists, Users, $window) {
	$scope.top = {};
	$scope.artists = {};
	$scope.user = {};
	$scope.logged = false;
	$scope.recent = Array();
	$scope.favorites = Array();
   	Artists.getTop(9, function(data){
   		$scope.top = data.data;
        $('#circle').css('display','none');
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

demoControllers.controller('SettingsController', ['$scope', '$rootScope', '$routeParams', 'Users', '$window', 'Artists', 'Changelogs', function($scope, $rootScope, $routeParams, Users, $window, Artists, Changelogs) {
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	$scope.totalContributions = {};
	
	if(!loadUser($rootScope, $scope, $window)) {
		$window.location.href = '/#/signin?redirect=' + encodeURIComponent('/#/user/settings/');
	}
	
	Artists.get(function (data) {
		$scope.artists = data.data;

	});
	
	Changelogs.getCount(function (data) {
		$scope.totalContributions = data;
	});
	
	$scope.update_user = function(){
		console.log($scope.user);
		Users.update($scope.user, function(){});
	};

	$scope.delete_user = function(){
		Users.delete($scope.user._id, function(){});
		$window.location.href = '/#/home';
	};	

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('ArtistInfoController', ['$scope', '$rootScope', '$routeParams', '$window', '$route', 'Artists', 'Albums', 'Users', function($scope, $rootScope, $routeParams, $window, $route, Artists, Albums, Users) {
	$scope.artist = "";
	$scope.members = Array();
	$scope.albums = null;
	$scope.ID = $routeParams.id;
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	$scope.isFavorite = false;
	
	Artists.get(function (data) {
		$scope.artists = data.data;
        $('#circle').css('display','none');
	});
	
	Artists.getById($scope.ID, function(data) {
		$scope.artist = data.data;
		
		if (loadUser($rootScope, $scope, $window)) {
			for (var i = 0; i < $scope.user.favorites.length; i++) {
				if ($scope.user.favorites[i] === $scope.artist._id) {
					$scope.isFavorite = true;
				}
			}
		}
		
		if(data.data.isBand) {
			for (var i = 0; i < data.data.members.length; i++) {
				Artists.getById(data.data.members[i], function(artist) {
	   				$scope.members.push(artist.data);
	   			});
			}
		}	
	});
	
	loadUser($rootScope, $scope, $window);
	
	$scope.add_favorite = function() {
		$scope.user.favorites.push($scope.ID);
		Users.update($scope.user, function(){
			if ($scope.artist.favCount === undefined) {
				$scope.artist.favCount = 1;
			}
			else {
				var prev = Number($scope.artist.favCount);
				$scope.artist.favCount = prev + 1;
			}
			$scope.artist.userId = $scope.user._id;
			Artists.update($scope.artist, function(){
			});
		});
	};

	
	$scope.remove_favorite = function() {
		$scope.user.favorites.pop($scope.ID);
		Users.update($scope.user, function(){
			if ($scope.artist.favCount === undefined) {
				$scope.artist.favCount = 0;
			}
			else {
				var prev = Number($scope.artist.favCount);
				$scope.artist.favCount = prev - 1;
			}
			$scope.artist.userId = $scope.user._id;
			Artists.update($scope.artist, function(){
			});
		});
	};
	
	Albums.getByArtist($scope.ID, function(albums) {
		$scope.albums = albums.data;
	});

    $scope.enterAlbum = function(){
        $scope.class='card large';
    };

    $scope.leaveAlbum = function(){
        $scope.class='card medium';
    };

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('ArtistEditController', ['$scope', '$rootScope', '$routeParams', '$window', '$route', 'Artists', function($scope, $rootScope, $routeParams, $window, $route, Artists) {
	$scope.artist = {};
	$scope.members = Array();
	$scope.id = $routeParams.id;
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
	
	if(!loadUser($rootScope, $scope, $window)) {
		$window.location.href = '/#/signin?redirect=' + encodeURIComponent('/#/artists/edit/' + $routeParams.id);
	}
	
	Artists.getById($scope.id, function(data){
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
		$scope.artist.userId = $scope.user._id;
		Artists.delete($scope.id, function(){
			$window.location.href = '/#/home';
		});
	};
	
	$scope.add_member = function(memberId){
		$scope.artist.members.push(memberId);
		Artists.getById(memberId, function(artist) {
			$scope.members.push(artist.data);
		});
	};
	
	$scope.remove_member = function(memberId){
		$scope.artist.members.pop(memberId);
		Artists.getById(memberId, function(artist) {
			$scope.members.pop(artist.data);
		});
	};

	$(document).ready(function (){
		initNavbar();

	});
}]);


demoControllers.controller('ArtistNewController', ['$scope', '$rootScope', '$window', 'Artists', function($scope, $rootScope, $window, Artists) {
	$scope.artist = {};
	$scope.artist.members = Array();
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	$scope.artist.isBand = false;
	$scope.members = Array();
	
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
	
	$scope.add_member = function(memberId){
		$scope.artist.members.push(memberId);
		Artists.getById(memberId, function(artist) {
			$scope.members.push(artist.data);
		});
	};
	
	$scope.remove_member = function(memberId){
		$scope.artist.members.pop(memberId);
		Artists.getById(memberId, function(artist) {
			$scope.members.pop(artist.data);
		});
	};
	
	
	$(document).ready(function (){
		initNavbar();
	});
}]);


demoControllers.controller('AlbumInfoController', ['$scope', '$rootScope', '$routeParams', '$window', 'Albums', 'Artists', function($scope, $rootScope, $routeParams, $window, Albums, Artists) {
	$scope.artist = {};
	$scope.album = {};
	$scope.id = $routeParams.id;
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	
	Artists.get(function (data) {
		$scope.artists = data.data;
        $('#circle').css('display','none');
	});
	
	Albums.getById($scope.id, function(data) {
		$scope.album = data.data;
		
		Artists.getById(data.data.artistId, function (data) {
			$scope.artist = data.data;
		});
	});
	
	loadUser($rootScope, $scope, $window);
	
	$(document).ready(function (){
		initNavbar();
	});
}]);


demoControllers.controller('AlbumEditController', ['$scope', '$rootScope', '$routeParams', '$window', '$route', 'Albums', 'Artists', function($scope, $rootScope, $routeParams, $window, $route, Albums, Artists) {
	$scope.artist = "";
	$scope.album = "";
	$scope.id = $routeParams.id;
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	
	if(!loadUser($rootScope, $scope, $window)) {
		$window.location.href = '/#/signin?redirect=' + encodeURIComponent('/#/albums/edit/' + $routeParams.id);
	}
	
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
	
	$scope.update_album = function(){
		$scope.album.userId = $scope.user._id;
		Albums.update($scope.album,  function(data){
			$window.location.href = '/#/albums/info/' + $scope.album._id;
		});
	};
	
	$scope.delete_album = function(){
		$scope.album.userId = $scope.user._id;
		Albums.delete($scope.album,  function(){
			$window.location.href = '/#/home';
		});
	};
	
	$scope.add_track = function(track){
		$scope.album.tracks.push(track);
	};
	
	$scope.remove_track = function(track){
		$scope.album.tracks.pop(track);
	};
	
	Albums.getById($scope.id, function(data) {
		$scope.album = data.data;
		$scope.album.releaseDate = new Date(data.data.releaseDate);
		Artists.getById(data.data.artistId, function (data) {
			$scope.artist = data.data;
		});
	});
	
	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('AlbumNewController', ['$scope', '$rootScope', '$window', 'Albums', 'Artists', function($scope, $rootScope, $window, Albums, Artists) {
	$scope.album = {};
	$scope.album.tracks = Array();
	$scope.user = {};
	$scope.logged = false;
	$scope.artists = {};
	
	if(!loadUser($rootScope, $scope, $window)) {
		$window.location.href = '/#/signin?redirect=' + encodeURIComponent('/#/albums/new/');
	}
	
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
	
	$scope.save_album = function() {
		$scope.album.userId = $scope.user._id;
		Albums.post($scope.album,  function(data){
			$window.location.href = '/#/albums/info/' + data.data._id;
		});
	};
	
	$scope.add_track = function(track){
		$scope.album.tracks.push(track);
	};
	
	$scope.remove_track = function(track){
		$scope.album.tracks.pop(track);
	};
	
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
			if (data !== 'Unauthorized') {
				$rootScope.user = data.user;
				$window.location.href = redirect;
				$location.url(redirect);
			}
			else {
				Materialize.toast('Wrong e-mail/password. Try again', 4000);
				$('#circle').css('display', 'none');
			}
		});
        $('#circle').addClass('active');
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
			if (data !== 'Unauthorized') {
				$rootScope.user = data.user;
				$location.url('/#/home');
			}
			else {
				Materialize.toast('Email already in use', 4000);
				$('#circle').css('display', 'none');
			}
		});
        $('#circle').addClass('active');
	};	
	
	
	
	
	$(document).ready(function (){
		$('footer').css('display', 'none');
		$("nav").css('display', 'none');
		$('body').addClass('full-background');
	});

}]);

demoControllers.controller('NotificationController', ['$scope', '$rootScope', '$location', '$window', 'Changelogs', 'Users', 'Artists', 'Albums', function($scope, $rootScope, $location, $window, Changelogs, Users, Artists, Albums) {
	$scope.user = {};
	$scope.logged = false;
	$scope.artistHelper = Array();
	$scope.albumHelper = Array();
	$scope.artistLog = Array();
	$scope.albumLog = Array();
	var d = new Date();
	d.setDate(d.getDate() - 1);
	$scope.artists = {};

	Artists.get(function (data) {
		$scope.artists = data.data;
	});

	if(!loadUser($rootScope, $scope, $window)) {
		$window.location.href = '/#/signin?redirect=' + encodeURIComponent('/#/notification');
	}

	Changelogs.getOneDayInfo(d, function(data){
		for (var i = 0; i < data.length; i++) {
			if (data[i].userId !== $scope.user._id) {
				if (data[i].model === 'artist') {
					if ($scope.user.favorites.indexOf(data[i].modelId) !== -1 && $scope.artistHelper.indexOf(data[i].modelId) === -1) {
					   $scope.artistHelper.push(data[i].modelId);
				   	}
				}
				else {
					if ($scope.albumHelper.indexOf(data[i].modelId) === -1) {
					   $scope.albumHelper.push(data[i].modelId);
				   	}
				}
			}
		}
		
		for (var i = 0; i < $scope.artistHelper.length; i++) {
			Artists.getById($scope.artistHelper[i], function(artist) {
				   $scope.artistLog.push(artist.data);
			});
		}
		
		for (var i = 0; i < $scope.albumHelper.length; i++) {
			Albums.getById($scope.albumHelper[i], function(album) {
				if ($scope.user.favorites.indexOf(album.data.artistId) !== -1) {
					$scope.albumLog.push(album.data);	
				}
			});
		}
		
		$('#circle').css('display', 'none');
	});

	
	$(document).ready(function (){
		initNavbar();
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
