'use strict';

/* Services */
var spaServices = angular.module('spaServices', ['ngResource']);

spaServices.factory('Problems', ['$resource', '$q', 
    function($resource, $q) {
        
        return {
            getData: function() {
                var defer = $q.defer();
                $resource('resources/problems.json', {cache: 'true'}).query(function(data){
                    defer.resolve(data);
                });
                return defer.promise;
            },

            saveAnswer: function(problemId, answer) {
                return cognito.identity.then(function(identity) {
                    var db = new AWS.DynamoDB.DocumentClient();
                    var item = {
                        TableName: 'problems',
                        Item: {
                            userId: identity.id,
                            problemId: problemId,
                            answer: answer
                        }
                    };
                    return cognito.sendAwsRequest(db.put(item), function(){
                        return saveAnswer(problemId, answer);
                    })
                })
            },

            fetchAnswer: function(problemId) {
                return cognito.identity.then(function(identity) {
                    var db = new AWS.DynamoDB.DocumentClient();
                    var item = {
                        TableName: 'problems',
                        Key: {
                            userId: identity.id,
                            problemId: problemId
                        }
                    };
                    return cognito.sendAwsRequest(db.get(item), function(){
                        return fetchAnswer(problemId);
                    })
                })
            },

            checkAnswer: function(problemId) {
                return cognito.identity.then(function(identity) {
                    var lambda = new AWS.Lambda();
                    var params = {
                        FunctionName: '',
                        Payload: JSON.stringify({problemNumber: problemId})
                    };
                    var item = {
                        TableName: 'problems',
                        Key: {
                            userId: identity.id,
                            problemId: problemId
                        }
                    };
                    return cognito.sendAwsRequest(db.get(item), function(){
                        return fetchAnswer(problemId);
                    })
                })
            }
        };
    }
]);

spaServices.factory('MenuItems', ['$resource',
    function($resource) {
        return $resource('resources/menu-items.json', {cache: 'true'});
    }
]);

spaServices.factory('MenuItems', ['$resource',
    function($resource) {
        return $resource('resources/menu-items.json', {cache: 'true'});
    }
]);