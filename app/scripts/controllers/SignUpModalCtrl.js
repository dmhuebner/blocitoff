(function() {
	function SignUpModalCtrl($uibModalInstance, User, $cookies) {
		var $ctrl = this;

		/*===== Services =====*/
		/**
		* @desc User Service
		* @type {Object} | Service
		*/
		$ctrl.User = User;

		$ctrl.auth = User.auth;

		$ctrl.currentUserId = null;

		$ctrl.isValid = true;

		$ctrl.errorMessage = null;


		/*===== Service Methods =====*/
		// /**
		// * @function signup
		// * @desc creates new user account
		// * @param {String} {String}
		// */

		// $ctrl.validateSignUp = function(password) {
		// 	if ($ctrl.User.passwordInput !== null && $ctrl.User.confirmPasswordInput !== null && $ctrl.User.passwordInput === $ctrl.User.confirmPasswordInput && $ctrl.User.validatePassword(password)) {
		// 		return true;
		// 	} else {
		// 		$ctrl.isValid = false;
		// 		return false;
		// 	}
		// };
		//
		// $ctrl.signup = function(email, password) {
		// 	if ($ctrl.validateSignUp(password)) {
		// 		firebase.auth().createUserWithEmailAndPassword(email, password)
		// 		.then(function(firebaseUser) {
		// 			console.log("User " + email + " - " + firebaseUser.uid + " created successfully!");
		// 			$ctrl.currentUserId = firebaseUser.uid;
		// 			// $ctrl.User.createUsername($ctrl.Account.usernameInput);
		// 			// $ctrl.setUsername($ctrl.Account.usernameInput);
		// 			$uibModalInstance.dismiss('submit');
		// 			window.location.replace('/tasks');
		// 		})
		// 		.catch(function(error) {
		// 		console.error("Error: ", error);
		// 		$ctrl.isValid = false;
		// 		alert(error['message']);
		// 		});
		//
		// 	}
		// };

		$ctrl.closeModal = function() {
			$uibModalInstance.dismiss('cancel');
			$cookies.remove('signInModalClicked');
			location.reload();
		};

	}

	angular
		.module('nextTask')
		.controller('SignUpModalCtrl', ['$uibModalInstance', 'User', '$cookies', SignUpModalCtrl]);
})();
