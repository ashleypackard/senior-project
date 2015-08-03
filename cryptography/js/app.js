var app = angular.module('CipherApp', ['ngRoute']);


app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

	$routeProvider.when('/', {
		redirectTo: 'interactive-ciphers/caesar'
	})
	.when('/interactive-ciphers/:type', {
		controller: 'InteractiveController',
		templateUrl: 'views/interactive-ciphers.html'
	})
	.otherwise({redirectTo: '/'});

	$locationProvider.html5Mode(true);

}]);