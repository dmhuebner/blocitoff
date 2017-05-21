(function() {
	function TaskCtrl(Task) {
		var $ctrl = this;

		/**
		* @desc test object
		* @type {Object}
		*/
		$ctrl.test = "Testing main controller";

		/**
		* @desc Task Service
		* @type {Object} | Service
		*/
		$ctrl.Task = Task;

		// /**
		// * @desc CurrentTime Service
		// * @type {Object} | Value
		// */
		// $ctrl.CurrentTime = CurrentTime;

		/**
		* @desc Declare newMessage property
		* @type {Object}
		*/
		$ctrl.newTask = null;

		/**
		* @desc all tasks | from Task Service
		* @type {Object}
		*/
		$ctrl.tasks = $ctrl.Task.all

		/*===== Utility Functions =====*/
		/**
		* @function getCurrentTimeStamp
		* @desc Gets current time in proper format
		* @param {boolean} expiration | true/false
		*/
		$ctrl.getCurrentTimeStamp = function(expiration) {
			var currentDate = new Date();
			var dateStamp = currentDate;
			var currentHours = currentDate.getHours();
			var currentMinutes = currentDate.getMinutes();
			var amTrue = true;

			if (currentMinutes < 10) {
					currentMinutes = '0' + currentMinutes;
			}

			if (currentHours > 12) {
					currentHours = (currentHours - 12);
					amTrue = false;
			}

			var currentTime = (currentHours + ':' + currentMinutes);

			if (amTrue) {
					currentTime += 'am';
			} else {
					currentTime += 'pm';
			}

			if (expiration) {
				return dateStamp.setDate(dateStamp.getDate() + 7);
			} else {
				// return currentTime;
				return dateStamp.toString();
			}
		};

		/*===== Models =====*/
		$ctrl.newTask = {
			description: '',
			priority: '',
			status: 'active',
			createdAt: $ctrl.getCurrentTimeStamp(),
			expiresOn: $ctrl.getCurrentTimeStamp(true)
		};
	}

	angular
		.module('blocItOff')
		.controller('TaskCtrl', ['Task', TaskCtrl]);
})();
