(function() {
	function User($firebaseAuth) {

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
			currentUser: firebase.auth().currentUser,
			signOut: function() {
				firebase.auth().signOut().then(function() {
				  // Sign-out successful.
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
		.factory('User', ['$firebaseAuth', User]);
})();
