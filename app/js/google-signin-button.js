'use strict';

var app = angular.module('signInButton', []);

app.controller('MainController', ['$scope',
    function($scope) {
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