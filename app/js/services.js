'use strict';

/* Services */
var spaServices = angular.module('spaServices', ['ngResource']);

spaServices.factory('Problems', ['$resource', '$q', 
    function($resource, $q) {
        
        return {
            getData: function(problemId) {
                return cognito.identity.then(function(identity) {
                    var db = new AWS.DynamoDB.DocumentClient();
                    var item = {
                        TableName: 'problems',
                        Key: {
                            problemId: problemId
                        }
                    };
                    return cognito.sendAwsRequest(db.get(item), function(){
                        return getData(problemId);
                    })
                })
            },

            saveAnswer: function(problemId, answer) {
                return cognito.identity.then(function(identity) {
                    var db = new AWS.DynamoDB.DocumentClient();
                    var item = {
                        TableName: 'answers',
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
                        TableName: 'answers',
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

            checkAnswer: function(problemId, answer) {
                return cognito.identity.then(function(identity) {
                    var lambda = new AWS.Lambda();
                    var params = {
                        FunctionName: 'spa_verifyAnswer',
                        Payload: JSON.stringify({
                            problemId: problemId,
                            answer: answer
                        })
                    };                    
                    return cognito.sendAwsRequest(lambda.invoke(params), function(){
                        return checkAnswer(problemId, answer);
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