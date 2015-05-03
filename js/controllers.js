var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('MainController', ['$scope', 'CommonData'  , function($scope, CommonData) {
$scope.data = "";
   
	$(document).ready(function (){
		initNavbar();
	});
	
}]);

demoControllers.controller('ArtistController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";
	
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

demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
		
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
