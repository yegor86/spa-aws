'use strict';

/* Controllers */

var spaControllers = angular.module('spaControllers', []);

spaControllers.controller('NavCtrl', ['$scope', '$http', 'MenuItems',
	function($scope, $http, MenuItems) {
		MenuItems.query(function(data){
			$scope.items = data;
		});
	}
]);

spaControllers.controller('ProfileCtrl', ['$scope', function($scope) {
	angular.element(document).ready(function () {
        cognito.identity.done(function(profile) {
        	$scope.$apply(function () {
        		$scope.email = profile.email;
        	});
        });
    });
}]);

spaControllers.controller('LandingCtrl', ['$scope', function($scope) {
	$scope.problemId = '1';
}]);

spaControllers.controller('ProblemCtrl', ['$document', '$scope', '$routeParams', 'Problems',
	function($document, $scope, $routeParams, Problems) {
		$scope.problemId = $routeParams.problemId;	
		$scope.problemName = 'Problem #' + $routeParams.problemId;	
		
		var problemNumber = parseInt($routeParams.problemId, 10);		
		Problems.fetchAnswer(problemNumber).then(function(data) {
	    	$scope.$apply(function () {
	    		$scope.answer = data.Item? data.Item.answer: '';
            });
		});

		Problems.getData(problemNumber).then(function(data) {
        	$scope.$apply(function () {
	        	$scope.description = data.Item.Description;
	        	$scope.code = data.Item.Code;
			});

        	if (!data.Item.Last) {
        		angular.element($document[0].getElementById('nav-bar')).scope().skipBtn = {
        			name: 'Skip This Problem',
        			href: 'problems/' + (problemNumber + 1)
        		};
			} else {
				angular.element($document[0].getElementById('nav-bar')).scope().skipBtn = null;				
			}

        	$scope.checkAnswerClick = function () {				
				$scope.templateUrl = 'partials/correct-flash.html';
	            Problems.checkAnswer(problemNumber, $scope.answer).then(function(result) {            		
						
	            	$scope.flash = buildAnswer(data);
	            	if (result.Payload === 'true') {
						$scope.$apply(function () {
							$scope.flash.answer = 'Correct!';
						});
						Problems.saveAnswer(problemNumber, $scope.answer);
					} else {
					 	$scope.$apply(function () {
					 		$scope.flash.answer = 'Incorrect!';
					 		$scope.flash.text = '';
					 	});
					}
				});
	        }			
		});	
		function buildAnswer(data) {
			if (!data.Item.Last) {
				return {
					href: 'problems/' + (problemNumber + 1),
					text: 'Next Problem'
				};
			} else {
				return {
					href: '',
					text: 'You are finished'
				};
			}
		}	
	}
]);