## Create Administrative user for AWS
1. Open the Amazon Web Services console, create an account if necessary.
2. "Under Services | All AWS Services | Security & Identity" click on IAM (Identity & Access Management)
3. In the left sidebar, click on "Users".
4. Click "Create New Users" to create a user.
5. Pick a name for your user and fill in the first row
6. Enshure that the "Generate an access key for each user" checkbox is checked, and click "Create"
7. Dowload the credentials when prompted
8. Get to the user summary page
9. Click on Permissions tab
10. Attach Policy button | Select _AdministratorAccess_
11. Create User Policy button | Policy Generator | 
	* Effect=Allow 
	* AWS Service=AWS Identity and Access management
	* Actions=All Actions
	* ARN=*