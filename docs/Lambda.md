## Configure Lambda access and deploy Lambda service

1. Create Bundle, i.e. create _services/archive.zip_ file
```bash
 $ ./sspa build_bundle
```
2. Go to AWS Lambda Console: Services | All AWS Services | Compute | Lambda
3. Choose _microservice-http-endpoint_ blueprint
	* Name function as _checkAnswer_ 
	* Runtime = Node.js
	* Select Code entry type = Upload a .ZIP file and select _archive.zip_
	* Name Handler = index.checkAnswer
	* Role = Basic with DynamoDb
	* Memory(Mb) = 128
	* Timeout = 10 sec
4. Update Cognito User's Role to invoke Lambda functions
	* Go to Services | Security & Identity | IAM
	* Choose Roles on the right sitebar and select _spa_cognito_authenticated_
	* Permissions tab | Click on "Create Role Policy" button
	* Select Policy Generator | AWS Service=AWS Lambda | Actions = InvokeFunction
	* Copy ARN from "Lambda > Functions > checkAnswer" page and pase it into Role's permissions last field
