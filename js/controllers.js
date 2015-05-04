var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('MainController', ['$scope', 'Artists'  , function($scope, Artists) {
	$scope.top8 = {};
	$scope.recent9 = Array();
   	Artists.getTopN(8, function(data){
   		$scope.top8 = data.data;
   	});
   	Artists.getRecentlyAddedN(9, function(data){
   		for (var i = 0; i < data.data.length; i++) {
   			// console.log("id: " + data.data[i].modelId);
   			Artists.getById(data.data[i].modelId, function(artist) {
   				$scope.recent9.push(artist.data[0]);
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
	})
	$scope.update_user = function(){
		Users.updateUser($scope.user, function(){});
	}

	$scope.delete_user = function(){
		Users.deleteUser($scope.userID, function(){});
	}	

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('ArtistController', ['$scope', '$routeParams', 'Artists', function($scope, $routeParams, Artists) {
	$scope.artist = "";
	$scope.ID = $routeParams.id;
	Artists.getArtistById($scope.ID, function(data){
		$scope.artist = data.data;
	});

	$(document).ready(function (){
		initNavbar();
	});
}]);

demoControllers.controller('SigninController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";
	
	$(document).ready(function (){
		$('footer').css('display', 'none');
	});

}]);

demoControllers.controller('SignupController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";
	
	$(document).ready(function (){
		$('footer').css('display', 'none');
	});

}]);

demoControllers.controller('MainLoggedController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  $(document).ready(function (){
		initNavbar();
	});

}]);




function initNavbar() {
	$('footer').css('display', 'inline');
	$(".dropdown-button").dropdown();
	$("#search-form").css('display', 'none');
	$("#search-trigger").on('click', function () {
		$("#navbar").css('display', 'none');
		$("#search-form").css('display', 'inline');
		$("#search").focus();
	});
	$("#search-form").on('focusout', function () {
		$("#navbar").css('display', 'inline');
		$("#search-form").css('display', 'none');
	});
}
