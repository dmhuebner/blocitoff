(function() {
	function User($firebaseAuth) {

		User.auth = $firebaseAuth();

		// firebase.auth().onAuthStateChanged(function(user) {
		// if (user) {
		// 	// User is signed in.
		// 	User.displayName = user.displayName;
		// 	User.email = user.email;
		// 	User.emailVerified = user.emailVerified;
		// 	User.isAnonymous = user.isAnonymous;
		// 	User.uid = user.uid;
		// 	User.providerData = user.providerData;
		// 	// ...
		// 	} else {
		// 		// User is signed out.
		// 		// ...
		// 	}
		// });

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
			currentUserId: User.uid,
			test: "test"
		}
	}

	angular
		.module('blocItOff')
		.factory('User', ['$firebaseAuth', User]);
})();
