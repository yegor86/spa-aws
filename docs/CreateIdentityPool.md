## Create Identity Pool

1. Open the file _conf/cognito/identity_pools/spa_aws/config.json_ and put your _Google Client ID_ here
2. Create Identity Pool from CLI

```bash
	$ ./sspa create_pool conf/cognito/identity_pools/spa
```
3. Check that Identity pool gets created: AWS Console | All AWS Services | Cognito
4. Update Identity Pool Id in the code
		
		* Filename: _app/js/cognito.js_
		* Update cognito.poolId var
