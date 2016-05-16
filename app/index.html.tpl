<!doctype html>
<html lang='en' ng-app='spa' ng-controller="MainController">
<head>
	<meta charset='utf-8'>
	<title>Single Page Application with AWS</title>
	<link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
	<script src='bower_components/angular/angular.js'></script>
	<script src='bower_components/angular-route/angular-route.js'></script>
	<script src='bower_components/angular-resource/angular-resource.js'></script>
	<script src='bower_components/jquery/dist/jquery.min.js'></script>
	<script src='bower_components/aws-sdk/dist/aws-sdk.min.js'></script>
	<script src='bower_components/bootstrap/dist/js/bootstrap.min.js'></script>
	<link rel='stylesheet' href='bower_components/bootstrap/dist/css/bootstrap.css'>
	<script src='js/config.js'></script>
	<script src='js/app.js'></script>
	<script src='js/controllers.js'></script>
	<script src='js/services.js'></script>
	<script src='js/cognito.js'></script>
	<script src="js/google-signin-button.js"></script>

  	<!-- Google Login -->
  	<meta name='google-signin-client_id' content='${login_provider}'/>
  	
  	<script src='https://apis.google.com/js/platform.js' async defer></script>
</head>
<body>
  	<div ng-include="'partials/navbar.html'"></div>
	<div class = 'container'>
		<div class='view-container' ng-view></div>
	</div>
</body>
</html>