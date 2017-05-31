(function() {
	function User($cookies, $q) {


		return {
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
		.factory('User', ['$cookies', '$q', User]);
})();
