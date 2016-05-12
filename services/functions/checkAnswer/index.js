'use strict';
console.log('Loading function');

let doc = require('dynamodb-doc');
let dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    let params = {
        TableName : "problems",
        KeyConditionExpression: "problemId = :problemId",
        ExpressionAttributeValues: {
            ":problemId":event.problemId
        }
    };

    dynamo.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            if (data.Items.length > 0) {
                let test = data.Items[0].Code.replace('__', event.answer) + '; problem();';        
                context.succeed(eval(test));    
            } else {
                callback(Error("Problem not found"));
            }
        }
    });
};