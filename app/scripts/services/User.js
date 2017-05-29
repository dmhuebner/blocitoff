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
			currentUser: firebase.auth().currentUser
		}
	}

	angular
		.module('blocItOff')
		.factory('User', ['$firebaseAuth', User]);
})();
