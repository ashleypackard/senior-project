var app = angular.module('CipherApp', ['ngRoute']);


app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider.when('/', {
		templateUrl: 'views/home.html'
	})
	.when('/home', {
		templateUrl: 'views/home.html'
	})
	.when('/interactive-ciphers/:type', {
		controller: 'InteractiveController',
		templateUrl: 'views/interactive-ciphers.html'
	})
	.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode(true);

}]);