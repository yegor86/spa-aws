<!doctype html>
<html lang='en' ng-app='spa'>
<head>
	<meta charset='utf-8'>
	<title>Single Page Application with AWS</title>
	<link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css'>
	<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.2/normalize.min.css'>
	<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css'>
	<link rel='stylesheet' href='../assets/css/main.css'>
	<script src='bower_components/angular/angular.js'></script>
	<script src='bower_components/angular-route/angular-route.js'></script>
  <script src='bower_components/angular-resource/angular-resource.js'></script>
	<script src='bower_components/jquery/dist/jquery.min.js'></script>
  <script src='bower_components/aws-sdk/dist/aws-sdk.min.js'></script>
	<script src='js/config.js'></script>
  <script src='js/app.js'></script>
	<script src='js/controllers.js'></script>
  <script src='js/services.js'></script>
  <script src='js/cognito.js'></script>

  <!-- Google Login -->
  <meta name='google-signin-client_id' content='${login_provider}'/>
  <script src='https://apis.google.com/js/platform.js' async defer></script>
</head>
<body>
  	<div class='nav-container no-select fixed-top u-full-width'>
      <ul id='nav-bar' class='inline-list hover-links nav-list six columns' ng-controller='NavCtrl'>
        <li ng-repeat='item in items'>
          <a class='{{item.class}}' href='{{item.href}}'>{{item.text}}</a>
        </li>
        <li class='skip-btn'>
          <a ng-href='#/{{skipBtn.href}}'>{{skipBtn.name}}</a>
        </li>
      </ul>
      <div class='four colums signin-bar' ng-controller='ProfileCtrl'>
        <span class='profile-link navbar-padding-lg'>
          <a href='#/profile'>{{email}}</a>
        </span>
        <span class='navbar-padding u-pull-right'>
          <span class='g-signin2' data-onsuccess='googleSignIn'></span>
        </span>
      </div>
    </div>
  	<div class='view-container' ng-view></div>
</body>
</html>