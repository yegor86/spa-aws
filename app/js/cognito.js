// Cognito Module
var cognito = {};
cognito.identity = new $.Deferred();
cognito.poolId = vars.poolId;

function googleSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    AWS.config.update({
        region: 'us-east-1',
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: cognito.poolId,
            Logins: {
                'accounts.google.com': id_token
            }
        })
    });
    
    function refresh() {
        return gapi.auth2.getAuthInstance().signIn({
            prompt: 'login'
          }).then(function(userUpdate) {
              var creds = AWS.config.credentials;
              var newToken = userUpdate.getAuthResponse().id_token;
              creds.params.Logins['accounts.google.com'] = newToken;
              return cognito.awsRefresh();
          });
    }

    cognito.awsRefresh().then(function(id) {
        cognito.identity.resolve({
            id: id,
            email: googleUser.getBasicProfile().getEmail(),
            refresh:refresh
        }); 
    });
}

cognito.awsRefresh = function() {
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

cognito.sendAwsRequest = function(req, retry) {
    var promise = new $.Deferred();
    req.on('error', function(error) {
        if (error.code === "CredentialsError") {
            cognito.identity.then(function(identity) {
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