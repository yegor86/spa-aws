## Add Google Identity Provider to interact with Cognito
1. Open the Google Developers Console and log in using your Google account.
2. Click the “Create Project” button. This may be located in a dropdown menu in the navbar.
3. Give your project a name _spa-aws_.
4. After the project is generated, open the project detail page and select “Enable and Manage APIs” under “Use Google APIs” in the dashboard.
5. Find the Google+ API and enable it.
6. Select “Credentials” in the left sidebar.
7. Click the tab that says “OAuth consent screen” and fill out the form. This form will be presented to users when they are asked to connect to your app with Google. 
* Product name shown to users = Single Page Application with AWS

8. Click the Create Credentials” button and select “OAuth 2.0 client ID.”
9. Select “Web application” as the application type. and click “Create.”
* Name = spa-aws
* Authorized JavaScript origins = http://localhost:9292
* Authorized redirect URIs = http://localhost:9292/oauth2callback

10. Click "Save" button
11. Update Google metadata in _app/index.html_
```html
<meta name="google-signin-client_id" content="105303240909-s1498bdjvam1nkfpr1fmo9d2bce5pbkv.apps.googleusercontent.com"/>
```