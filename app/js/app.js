'use strict';

/* App Module */

var spa = angular.module('spa', [
  'ngRoute',
  'spaControllers'
]);

spa.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/nav-container', {
        templateUrl: 'partials/nav-container.html',
        controller: 'NavCtrl'
      })
      .when('/skip-btn', {
        templateUrl: 'partials/skip-btn.html',
        controller: 'NavCtrl'
      })
      .when('/profile-link', {
        templateUrl: 'partials/profile-link.html',
        controller: 'ProfileCtrl'
      })
      .when('/profile-view', {
        templateUrl: 'partials/profile-view.html',
        controller: 'ProfileCtrl'
      })
      .when('/', {
        templateUrl: 'partials/landing-view.html',
        controller: 'LandingCtrl'
      })
      .when('/problem-view', {
        templateUrl: 'partials/problem-view.html',
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