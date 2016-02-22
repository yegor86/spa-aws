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

function reduceItems(memo, items) {
  items.forEach(function(item) {
    memo[item.answer] = (memo[item.answer] || 0) + 1;
  });
  return memo;
}

function byCount(e1, e2) {
  return e2[0] - e1[0];
}

function filterItems(items) {
  var values = [];
  for (i in items) {
    values.push([items[i], i]);
  }
  var topFive = {};
  values.sort(byCount).slice(0,5).forEach(function(e) {
    topFive[e[1]] = e[0];
  })
  return topFive;
}

exports.popularAnswers = function(json, context) {
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
      context.succeed(filterItems(reduceItems({}, data.Items)));
    }
  });
};

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

exports.echo = function(json, context) {  
  context.succeed(["Hello from the cloud! You sent " + JSON.stringify(json)]);
};