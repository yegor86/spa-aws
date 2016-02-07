'use strict';

var spa = {
	poolId: 'us-east-1:8b90d9aa-e71c-4ee7-afce-55d405aa4959'
};
spa.identity = new $.Deferred();

spa.problems = [{
		description: "Are we alone?",
		code: "function problem(){return __;}"
	},{
		description: "Do we have only one universe?",
		code: "function problem(){return 42 === 6*__;}"
	}
];

spa.landingView = function(){
	return spa.template('landing-view');
}

spa.problemView = function(data) {
	var problemNumber = parseInt(data, 10);
	var view = $('.templates .problem-view').clone();
	var problemData = spa.problems[problemNumber - 1];
	var resultFlash = view.find('.result');
	var answer = view.find('.answer');

	function checkAnswer(){
		var test = problemData.code.replace('__', answer.val()) + '; problem();';
		return eval(test);
	}

	function checkAnswerClick(){
		if (checkAnswer()){
			var content = spa.buildCorrectFlash(problemNumber);
			spa.flashElement(resultFlash, content);
			spa.saveAnswer(problemNumber, answer.val());
		} else {
			spa.flashElement(resultFlash, 'Incorrect');
		}
		return false;
	}

	if (problemNumber < spa.problems.length) {
		var buttonItem = spa.template('skip-btn');
		buttonItem.find('a').attr('href', '#problem-' + (problemNumber + 1));
		$('.nav-list').append(buttonItem);
		view.bind('removingView', function(){
			buttonItem.remove();
		});
	}

	spa.fetchAnswer(problemNumber).then(function(data) {
	    if (data.Item) {
	    	answer.val(data.Item.answer);
	    }
	});

	view.find('.check-btn').click(checkAnswerClick);
	view.find('.title').text('Problem #' + problemNumber);
	spa.applyObject(spa.problems[problemNumber - 1], view);
	return view;
}

spa.profileView = function(){
	var view = spa.template('profile-view');
	spa.identity.done(function(){
		view.find('email').text(identity.email);
	});
	return view;
}

spa.addProfileLink = function(profile){
	var link = spa.template('profile-link');
	link.find('a').text(profile.email);
	$('.signin-bar').prepend(link);
}

spa.showView = function(hash) {

	var routes = {
		'': spa.landingView,
		'#': spa.landingView,
		'#problem': spa.problemView,
		'#profile': spa.profileView
	};
	var parts = hash.split('-');
	var viewFn = routes[parts[0]];
	if (viewFn) {
		spa.triggerEvent('removingView', []);
		$('.view-container').empty().append(viewFn(parts[1]));
	}
}

spa.appOnReady = function() {
	window.onhashchange = function(){
		spa.showView(window.location.hash);
	};
	spa.showView(window.location.hash);
	spa.identity.done(spa.addProfileLink);
}

spa.applyObject = function(obj, elem) {
	for (var key in obj){
		elem.find('[data-name="' + key + '"]').text(obj[key]);
	}
}

spa.template = function(name) {
	return $('.templates .' + name).clone();
}

spa.flashElement = function(elem, content){
	elem.fadeOut('fast', function(){
		elem.html(content);
		elem.fadeIn();	
	});
}

spa.buildCorrectFlash = function(problemNumber){
	var correctFlash = spa.template('correct-flash');
	var link = correctFlash.find('a');
	if (problemNumber < spa.problems.length) {
		link.attr('href', '#problem-' + (problemNumber + 1));
	} else {
		link.attr('href', '');
		link.text('You are finished');
	}
	return correctFlash;
}

spa.triggerEvent = function(name, args){
	$('.view-container>*').trigger(name, args);
}

function googleSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  AWS.config.update({
    region: 'us-east-1',
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: spa.poolId,
      // RoleArn: 'arn:aws:iam::655508188333:role/_cognito_authenticated',
      // AccountId: '655508188333',
      Logins: {
        'accounts.google.com': id_token
      }
    })
  })
  function refresh() {
	return gapi.auth2.getAuthInstance().signIn({
	    prompt: 'login'
	  }).then(function(userUpdate) {
		  var creds = AWS.config.credentials;
		  var newToken = userUpdate.getAuthResponse().id_token;
		  creds.params.Logins['accounts.google.com'] = newToken;
		  return spa.awsRefresh();
	  });
  }
  spa.awsRefresh().then(function(id) {
  	spa.identity.resolve({
  		id: id,
  		email: googleUser.getBasicProfile().getEmail(),
  		refresh:refresh
  	});	
  });
}

spa.awsRefresh = function() {
	var deferred = new $.Deferred();
	AWS.config.credentials.refresh(function(err) {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(AWS.config.credentials.identityId);
		}
	});
	return deferred.promise();
}

spa.sendDbRequest = function(req, retry) {
	var promise = new $.Deferred();
	req.on('error', function(error) {
		if (error.code === "CredentialsError") {
			spa.identity.then(function(identity) {
				return identity.refresh().then(function() {
					return retry();
				}, function() {
					promise.reject(resp);
				});
			});
		} else {
			promise.reject(error);
		}
	});
	req.on('success', function(resp) {
		promise.resolve(resp.data);
	});
	req.send();
	return promise;
}

spa.saveAnswer = function(problemId, answer) {
	return spa.identity.then(function(identity) {
		var db = new AWS.DynamoDB.DocumentClient();
		var item = {
			TableName: 'problems',
			Item: {
				userId: identity.id,
				problemId: problemId,
				answer: answer
			}
		};
		return spa.sendDbRequest(db.put(item), function(){
			return spa.saveAnswer(problemId, answer);
		})
	})
}


spa.fetchAnswer = function(problemId){
	return spa.identity.then(function(identity) {
		var db = new AWS.DynamoDB.DocumentClient();
		var item = {
			TableName: 'problems',
			Key: {
				userId: identity.id,
				problemId: problemId
			}
		};
		return spa.sendDbRequest(db.get(item), function(){
			return spa.fetchAnswer(problemId);
		})
	})
}

spa.countAnswers = function(problemId) {
  return spa.identity.then(function(identity) {
    var db = new AWS.DynamoDB.DocumentClient();
    var params = {
      TableName: 'problems',
      Select: 'COUNT',
      FilterExpression: 'problemId = :problemId',
      ExpressionAttributeValues: {':problemId': problemId}
    };
    return spa.sendDbRequest(db.scan(params), function() {
      return spa.countAnswers(problemId);
    })
  });
}