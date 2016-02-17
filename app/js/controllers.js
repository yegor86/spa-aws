'use strict';

/* Controllers */

var spaControllers = angular.module('spaControllers', []);

spaControllers.controller('NavCtrl', ['$scope', function($scope) {
	$scope.orderProp = 'age';
}]);

spaControllers.controller('ProfileCtrl', ['$scope', function($scope) {
	$scope.orderProp = 'age';
}]);

spaControllers.controller('LandingCtrl', ['$scope', function($scope) {
	$scope.orderProp = 'age';
}]);

spaControllers.controller('ProblemCtrl', ['$scope', function($scope) {
	$scope.orderProp = 'age';
}]);

spaControllers.controller('FlashCtrl', ['$scope', function($scope) {
	$scope.orderProp = 'age';
}]);
