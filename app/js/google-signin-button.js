'use strict';

var app = angular.module('signInButton', []);

app.controller('MainController', ['$scope', '$window',
    function($scope, $window) {
		//for more options visit 
		// https://developers.google.com/identity/sign-in/web/reference#gapisignin2renderwzxhzdk114idwzxhzdk115_wzxhzdk116optionswzxhzdk117
		$scope.options = {
			'onsuccess': googleSignIn
		}

		$scope.signOut = function () {
			var auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(function () {
				console.log('User signed out.');
			});
			$window.location.reload();
		}

		$scope.isSignedIn = function () {
			return gapi.auth2? gapi.auth2.getAuthInstance().isSignedIn.get(): false;
		}
    }
  ])
.directive('googleSignInButton', function() {
	return {
	  scope: {
	    buttonId: '@',
	    options: '&'
	  },
	  template: '<span></span>',
	  link: function(scope, element, attrs) {
	    var span = element.find('span')[0];
	    span.id = attrs.buttonId;
	    gapi.signin2.render(span.id, scope.options()); //render a google button, first argument is an id, second options
	  }
	};
});	