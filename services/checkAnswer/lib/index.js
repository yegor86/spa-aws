var http = require('http');
var AWS = require('aws-sdk');

AWS.config.region = 'us-east-1';

var config = {
  dynamoTableName: 'problems',
};

exports.dynamodb = new AWS.DynamoDB.DocumentClient();

var problems = [{
    "description": "Are we alone?",
    "code": "function problem(){return __;}"
  },{
    "description": "Do we have only one universe?",
    "code": "function problem(){return 42 === 6*__;}"
  }
];

exports.checkAnswer = function(json, context) {
  exports.dynamodb.scan({
    FilterExpression: "problemId = :problemId",
    ExpressionAttributeValues: {
      ":problemId": json.problemNumber
    },
    TableName: config.dynamoTableName
  }, function(err, data) {
    if (err) {
      context.fail(err);
    } else {
      if (json.problemNumber > 0 && json.problemNumber <= problems.length) {
        var problemData = problems[json.problemNumber - 1];
        var test = problemData.code.replace('__', json.answer) + '; problem();';        
        context.succeed(eval(test));
      } else {
        context.succeed(false);
      }
    }
  });
};