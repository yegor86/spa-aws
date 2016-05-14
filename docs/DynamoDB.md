## Configure DynamoDb
1. Populate table 'problems'

```
$ aws dynamodb batch-write-item --request-items file://conf/dynamodb/sampledata/Problems.json --profile spa
```