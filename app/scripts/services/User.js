(function() {
	function User($firebaseAuth, $cookies, $q) {

		User.auth = $firebaseAuth();

		/*=== Models ===*/
		User.emailInput = null;
		User.passwordInput = null;
		User.confirmPasswordInput = null;


		return {
			auth: $firebaseAuth(),
			currentUserAuth: User.auth.$getAuth(),
			validatePassword: function(p) {
				if (p.length >=5) {
					return true
				} else {
					return false;
				}
			},
			getCurrentUser: function() {
				var deferred = $q.defer();
				firebase.auth().onAuthStateChanged(function(user) {
				  if (user) {
				    // User is signed in.

						return deferred.resolve(user);
				  } else {
				    // No user is signed in.
						return false;
				  }
				});
				return deferred.promise;
				// return firebase.auth().currentUser.uid;
			},
			// getCurrentUser: function() {
			// 	return document.getElementById('current-user-id').textContent;
			// },
			signOut: function() {
				firebase.auth().signOut().then(function() {
				  // Sign-out successful.
					$cookies.remove('signInModalClicked');
					window.location.replace('/');
				}).catch(function(error) {
				  // An error happened.
					alert("Oh no! There was an problem logging out. Please try again.");
				});
			}
		}
	}

	angular
		.module('blocItOff')
		.factory('User', ['$firebaseAuth', '$cookies', '$q', User]);
})();
