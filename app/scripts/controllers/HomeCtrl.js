(function() {
	function HomeCtrl($uibModal, $cookies) {
		var $ctrl = this;

		$ctrl.test = "Testing home controller";

		$ctrl.test = function() {
			alert("testing");
		}

		/*===== Services =====*/

		$ctrl.currentUser = {};

		/*===== Service Methods =====*/

		$ctrl.putSignInModalClickedCookie = function() {
			var now = new Date();
			now.setMinutes(now.getMinutes() + 1);
			$cookies.put('signInModalClicked', 'angularjs', {expires: now});
		};

		/**
		* @function openSignUpModal()
		* @desc opens SignUp Modal
		* @param {String} size | 'sm' 'md' 'lg'
		*/
		$ctrl.openSignUpModal = function(size) {
			$ctrl.putSignInModalClickedCookie();

			var modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				animation: true,
				templateUrl: '/templates/signup-modal.html',
				controller: 'SignUpModalCtrl',
				controllerAs: '$ctrl',
				size: size,
				resolve: {
					currentUser: function() {
						return $ctrl.currentUser;
					}
				}
			});
		}


		$ctrl.signInModalClicked = $cookies.get('signInModalClicked');;

		if ($ctrl.signInModalClicked) {
			$ctrl.openSignUpModal('sm');
		}

	}

	angular
		.module('blocItOff')
		.controller('HomeCtrl', ['$uibModal', '$cookies', HomeCtrl]);
})();
