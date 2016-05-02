## Create Identity Pool

1. Open the file _scripts/config.json_ and put your _Google Client ID_ here
2. Create Identity Pool from CLI

```bash
	$  ./scripts/cognito.sh test1
```
3. Check that Identity pool gets created: AWS Console | All AWS Services | Cognito
4. Update Identity Pool Id in the code
		
		* Filename: _app/js/cognito.js_
		* Update cognito.poolId var
