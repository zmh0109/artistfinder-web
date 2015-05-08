var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('MainController', ['$scope', 'Artists'  , function($scope, Artists) {
	$scope.top = {};
	$scope.artists = {};
	$scope.recent = Array();
   	Artists.getTopN(9, function(data){
   		$scope.top = data.data;
   	});
	Artists.get(function (data) {
		$scope.artists = data.data;
	});
   	Artists.getRecentlyAddedN(9, function(data){
   		for (var i = 0; i < data.data.length; i++) {
   			Artists.getArtistById(data.data[i].modelId, function(artist) {
   				$scope.recent.push(artist.data);
   			});
   		}
   	});
	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('SettingsController', ['$scope', '$routeParams', 'Users', '$window' , function($scope, $routeParams, Users, $window) {
	$scope.user = "";
	$scope.userID = $routeParams.id;
	Users.getUserById($scope.userID, function(data){
		$scope.user = data.data;
	});
	$scope.update_user = function(){
		Users.updateUser($scope.user, function(){});
	};

	$scope.delete_user = function(){
		Users.deleteUser($scope.userID, function(){});
	};	

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('ArtistInfoController', ['$scope', '$routeParams', 'Artists', 'Albums', function($scope, $routeParams, Artists, Albums) {
	$scope.artist = "";
	$scope.members = Array();
	$scope.albums = null;
	$scope.ID = $routeParams.id;
	
	Artists.getArtistById($scope.ID, function(data) {
		$scope.artist = data.data;
		
		if(data.data.isBand) {
			for (var i = 0; i < data.data.members.length; i++) {
				Artists.getArtistById(data.data.members[i], function(artist) {
	   				$scope.members.push(artist.data);
	   			});
			}
		}
		
	});
	
	Albums.getByArtist($scope.ID, function(albums) {
		$scope.albums = albums.data;
	});

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('ArtistEditController', ['$scope', '$routeParams', 'Artists', function($scope, $routeParams, Artists) {
	$scope.artist = "";
	$scope.members = Array();
	$scope.ID = $routeParams.id;
	Artists.getArtistById($scope.ID, function(data){
		$scope.artist = data.data;
		
		if(data.data.isBand) {
			for (var i = 0; i < data.data.members.length; i++) {
				Artists.getArtistById(data.data.members[i], function(artist) {
	   				$scope.members.push(artist.data);
	   			});
			}
		}
	});
	
	$scope.update_artist = function(){
		Artists.updateArtist($scope.artist, function(){

		});
	};

	$scope.delete_artist = function(){
		Artists.deleteArtist($scope.artistId, function(){
			
		});
	};
	
	$scope.add_member = function(memberId){
		$scope.artist.members.push(memberId);
		Artists.updateArtist($scope.artist, function(){
			$route.reload();
		});
	};
	
	$scope.remove_member = function(memberId){
		$scope.artist.members.pop(memberId);
		Artists.updateArtist($scope.artist, function(){
			$route.reload();
		});
	};

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('ArtistNewController', ['$scope', 'Artists', function($scope, Artists) {
	$scope.artist = null;

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('AlbumInfoController', ['$scope', '$routeParams', 'Albums', 'Artists', function($scope, $routeParams, Albums, Artists) {
	$scope.artist = "";
	$scope.album = "";
	$scope.ID = $routeParams.id;

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('AlbumEditController', ['$scope', '$routeParams', 'Albums', 'Artists', function($scope, $routeParams, Albums, Artists) {
	$scope.artist = "";
	$scope.album = "";
	$scope.ID = $routeParams.id;

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('AlbumNewController', ['$scope', 'Albums', function($scope, Albums) {
	$scope.album = null;

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('SigninController', ['$scope', function($scope) {
	
	$(document).ready(function (){
		$('footer').css('display', 'none');
		$("nav").css('display', 'none');
		$('body').addClass('full-background');
	});

}]);

demoControllers.controller('SignupController', ['$scope', function($scope) {
	
	$(document).ready(function (){
		$('footer').css('display', 'none');
		$("nav").css('display', 'none');
		$('body').addClass('full-background');
	});

}]);

demoControllers.controller('MainLoggedController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  $(document).ready(function (){
		initNavbar();
	});

}]);




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
