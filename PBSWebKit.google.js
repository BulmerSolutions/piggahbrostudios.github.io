PBS.google = {
  auth2, // The Sign-In object.
  googleUser // The current user.
}

/**
 * Calls startAuth after Sign in V2 finishes setting up.
 */
PBS.google.appStart = function() {
  gapi.load('auth2', PBS.google.initSigninV2);
};

/**
 * Initializes Signin v2 and sets up listeners.
 */
PBS.google.initSigninV2 = function() {
  PBS.google.auth2 = gapi.auth2.init({
    client_id: '998686719090-ic3fu760a1tld25lp389kd7h4geqe5tf.apps.googleusercontent.com',
    scope: 'profile'
  });

  // Listen for sign-in state changes.
  PBS.google.auth2.isSignedIn.listen(PBS.google.signinChanged);

  // Listen for changes to current user.
  PBS.google.auth2.currentUser.listen(PBS.google.userChanged);

  // Sign in the user if they are currently signed in.
  if (PBS.google.auth2.isSignedIn.get() == true) {
    PBS.google.auth2.signIn();
  }

  // Start with the current live values.
  PBS.google.refreshValues();
};

/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
PBS.google.signinChanged = function(val) {
  console.log('Signin state changed to ', val);
  document.getElementById('signed-in-cell').innerText = val;
};

/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
PBS.google.userChanged = function(user) {
  console.log('User now: ', user);
  PBS.google.googleUser = user;
  PBS.google.updateGoogleUser();
  document.getElementById('curr-user-cell').innerText = JSON.stringify(user, undefined, 2);
};

/**
 * Updates the properties in the Google User table using the current user.
 */
PBS.google.updateGoogleUser = function() {
  if (PBS.google.googleUser) {
    document.getElementById('user-id').innerText = PBS.google.googleUser.getId();
    document.getElementById('user-scopes').innerText = PBS.google.googleUser.getGrantedScopes();
    document.getElementById('auth-response').innerText = JSON.stringify(PBS.google.googleUser.getAuthResponse(), undefined, 2);
  } else {
    document.getElementById('user-id').innerText = '--';
    document.getElementById('user-scopes').innerText = '--';
    document.getElementById('auth-response').innerText = '--';
  }
};

/**
 * Retrieves the current user and signed in states from the GoogleAuth
 * object.
 */
PBS.google.refreshValues = function() {
  if (PBS.google.auth2) {
    console.log('Refreshing values...');

    PBS.google.googleUser = PBS.google.auth2.currentUser.get();

    document.getElementById('curr-user-cell').innerText = JSON.stringify(PBS.google.googleUser, undefined, 2);
    document.getElementById('signed-in-cell').innerText = PBS.google.auth2.isSignedIn.get();

    PBS.google.updateGoogleUser();
  }
}
