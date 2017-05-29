(function() {
	function SignUpModalCtrl($uibModalInstance, User) {
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
		/**
		* @function signup
		* @desc creates new user account
		* @param {String} {String}
		*/
		// $ctrl.signup = function(email, password) {
		// 	if ($ctrl.User.passwordInput !== null && $ctrl.User.confirmPasswordInput !== null && $ctrl.User.passwordInput === $ctrl.User.confirmPasswordInput && $ctrl.User.validatePassword(password)) {
		// 		$ctrl.auth.$createUserWithEmailAndPassword(email, password)
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
		// 		});
		// 		// console.log($ctrl.Account.emailInput, $ctrl.Account.passwordInput);
		// 	} else {
		// 		window.alert("Oh no! There was an error! Please try again.");
		// 	}
		// };

		$ctrl.validateSignUp = function(password) {
			if ($ctrl.User.passwordInput !== null && $ctrl.User.confirmPasswordInput !== null && $ctrl.User.passwordInput === $ctrl.User.confirmPasswordInput && $ctrl.User.validatePassword(password)) {
				return true;
			} else {
				$ctrl.isValid = false;
				return false;
			}
		}

		$ctrl.signup = function(email, password) {
			if ($ctrl.validateSignUp(password)) {
				firebase.auth().createUserWithEmailAndPassword(email, password)
				.then(function(firebaseUser) {
					console.log("User " + email + " - " + firebaseUser.uid + " created successfully!");
					$ctrl.currentUserId = firebaseUser.uid;
					// $ctrl.User.createUsername($ctrl.Account.usernameInput);
					// $ctrl.setUsername($ctrl.Account.usernameInput);
					$uibModalInstance.dismiss('submit');
					window.location.replace('/tasks');
				})
				.catch(function(error) {
				console.error("Error: ", error);
				$ctrl.isValid = false;
				alert(error['message']);
				});

			}
		}

	}

	angular
		.module('blocItOff')
		.controller('SignUpModalCtrl', ['$uibModalInstance', 'User', SignUpModalCtrl]);
})();
