(function() {
	function HomeCtrl($uibModal) {
		var $ctrl = this;

		$ctrl.test = "Testing home controller";

		$ctrl.test = function() {
			alert("testing");
		}

		/*===== Services =====*/

		$ctrl.currentUser = {};

		/*===== Service Methods =====*/
		/**
		* @function openSignUpModal()
		* @desc opens SignUp Modal
		* @param {String} size | 'sm' 'md' 'lg'
		*/
		$ctrl.openSignUpModal = function(size) {
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

	}

	angular
		.module('blocItOff')
		.controller('HomeCtrl', ['$uibModal', HomeCtrl]);
})();
