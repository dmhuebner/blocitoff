(function() {
	function TaskCtrl(Task) {
		var $ctrl = this;

		var seven_days = 604800000;
    var one_day = 86400000;

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


		/*===== Models =====*/
		$ctrl.newTask = {
			description: '',
			priority: '',
			createdAt: firebase.database.ServerValue.TIMESTAMP,
			completed: false
		};

		/*===== Controller Methods =====*/
		/**
		* @function expired()
		* @desc Determines if task is expired
		* @param {Object} task
		*/
		$ctrl.expired = function(task) {
			var currentTime = new Date().getTime();
			return ( ((task.createdAt + seven_days) - currentTime) <= 0 )
		};

		/**
		* @function completed()
		* @desc Determines if task is completed
		* @param {Object} task
		*/
		$ctrl.completed = function(task) {
			return task.completed == true;
		};
	}

	angular
		.module('blocItOff')
		.controller('TaskCtrl', ['Task', TaskCtrl]);
})();
