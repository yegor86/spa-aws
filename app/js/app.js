'use strict';

/* App Module */

var spa = angular.module('spa', [
  'ngRoute',
  'spaControllers',
  'spaServices',
  'signInButton'
]);

spa.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider      
      .when('/', {
        templateUrl: 'partials/landing-view.html',
        controller: 'LandingCtrl'
      })    
      .when('/problems/:problemId', {
        templateUrl: 'partials/problems.html',
        controller: 'ProblemCtrl'
      })
      .when('/profile', {
        templateUrl: 'partials/profile-view.html',
        controller: 'ProfileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);