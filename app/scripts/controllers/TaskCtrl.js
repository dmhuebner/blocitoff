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
		* @desc allTasks | from Task Service
		* @type {Object}
		*/
		$ctrl.allTasks = $ctrl.Task.all

		/**
		* @desc activeTasks | from Task Service
		* @type {Object}
		*/
		$ctrl.activeTasks = $ctrl.Task.getByStatus('active');

		/**
		* @desc expiredTasks | from Task Service
		* @type {Object}
		*/
		$ctrl.expiredTasks = $ctrl.Task.getByStatus('expired');

		/**
		* @desc completedTasks | from Task Service
		* @type {Object}
		*/
		$ctrl.completedTasks = $ctrl.Task.getByStatus('complete');

		$ctrl.saveTask = $ctrl.Task.saveTask;

		/*===== Utility Functions =====*/
		/**
		* @function getCurrentTimeStamp
		* @desc Gets current time in proper format
		* @param {boolean} expiration | true/false
		*/
		$ctrl.getCurrentTimeStamp = function(expiration) {
			var currentDate = new Date();
			var dateStamp = currentDate;

			if (expiration) {
				return dateStamp.setDate(dateStamp.getDate() + 7);
				// return dateStamp.setSeconds(dateStamp.getSeconds() + 10);
			} else {
				// return currentTime;
				return dateStamp.setDate(dateStamp.getDate());
			}
		};

		$ctrl.currentTime = $ctrl.getCurrentTimeStamp();
		// console.log($ctrl.currentTime);
		//
		// $ctrl.expireTask = function(task) {
		// 	if (task.expiresOn >= Date().getDate()) {
		//
		// 	}
		// };

		$ctrl.checkExpirationDate = function(task) {
			if (task.expiresOn <= $ctrl.currentTime) {
				$ctrl.saveTask(task);
				console.log(task);
				return true;
			} else {
				return false;
			}
		};

		for (var i = 0; i < $ctrl.Task.all.length; i++) {
			$ctrl.checkExpirationDate($ctrl.Task.all[i]);
		}

		$ctrl.checkExpiration = function(task) {
			if (task.status == "expired") {
				return true;
 			} else {
				return false;
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
