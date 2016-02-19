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
		var problemNumber = parseInt($routeParams.problemId, 10);
		$scope.problemName = 'Problem #' + problemNumber;	
		
		Problems.fetchAnswer(problemNumber).then(function(data) {
		    if (data.Item) {
		    	$scope.$apply(function () {
		    		$scope.answer = data.Item.answer;
                });
		    } else {
		    	$scope.$apply(function () {
					$scope.answer = '';    	
                });
		    }
		});

		Problems.getData().then(function(problems) {
			var problemData = problems[problemNumber - 1];
        	$scope.description = problemData.description;
        	$scope.code = problemData.code;

        	if (problemNumber < problems.length) {
        		angular.element($document[0].getElementById('nav-bar')).scope().skipBtn = {
        			name: 'Skip This Problem',
        			href: 'problems/' + (problemNumber + 1)
        		};
			} else {
				angular.element($document[0].getElementById('nav-bar')).scope().skipBtn = null;				
			}

        	$scope.checkAnswerClick = function () {				
				$scope.templateUrl = 'partials/correct-flash.html';
	            $scope.flash = buildAnswer();
	            if (checkAnswer()) {            		
					$scope.flash.answer = 'Correct!';
					Problems.saveAnswer(problemNumber, $scope.answer);
				} else {
				 	$scope.flash.answer = 'Incorrect!';
				 	$scope.flash.text = '';
				}
	        };

        	function checkAnswer(){
				var test = problemData.code.replace('__', $scope.answer) + '; problem();';
				return eval(test);
			}

			function buildAnswer() {
				if (problemNumber < problems.length) {
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
		});		
	}
]);