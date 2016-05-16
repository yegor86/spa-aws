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
      .when('/skip-btn', {
        templateUrl: 'partials/skip-btn.html',
        controller: 'NavCtrl'
      })      
      .when('/profile', {
        templateUrl: 'partials/profile-view.html',
        controller: 'ProfileCtrl'
      })
      .when('/', {
        templateUrl: 'partials/landing-view.html',
        controller: 'LandingCtrl'
      })
      .when('/problems/:problemId', {
        templateUrl: 'partials/problems.html',
        controller: 'ProblemCtrl'
      })
      .when('/correct-flash', {
        templateUrl: 'partials/correct-flash.html',
        controller: 'FlashCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
}]);