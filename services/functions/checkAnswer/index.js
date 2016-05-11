'use strict';
console.log('Loading function');

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

/**
 * Provide an event that contains the following keys:
 *
 *   - problemId: Problem Identifier
 *   - answer: Problem Answer
 *   - payload: a parameter to pass to the operation being performed
 */
exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    const operation = event.operation;

    if (event.tableName) {
        event.payload.TableName = event.tableName;
    }

    switch (operation) {
        case 'create':
            dynamo.putItem(event.payload, callback);
            break;
        case 'read':
            dynamo.getItem(event.payload, callback);
            break;
        case 'update':
            dynamo.updateItem(event.payload, callback);
            break;
        case 'delete':
            dynamo.deleteItem(event.payload, callback);
            break;
        case 'list':
            dynamo.scan(event.payload, callback);
            break;
        case 'echo':
            callback(null, event.payload);
            break;
        case 'ping':
            callback(null, 'pong');
            break;
        default:
            callback(new Error(`Unrecognized operation "${operation}"`));
    }

    /*
    exports.dynamodb.scan({
-    FilterExpression: "problemId = :problemId",
-    ExpressionAttributeValues: {
-      ":problemId": json.problemNumber
-    },
-    TableName: config.dynamoTableName
-  }, function(err, data) {
-    if (err) {
-      context.fail(err);
-    } else {
-      if (json.problemNumber > 0 && json.problemNumber <= problems.length) {
-        var problemData = problems[json.problemNumber - 1];
-        var test = problemData.code.replace('__', json.answer) + '; problem();';        
-        context.succeed(eval(test));
-      } else {
-        context.succeed(false);
-      }
-    }
-  });
    */
};