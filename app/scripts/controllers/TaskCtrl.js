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

		$ctrl.priorityMap = {
			0: "Low",
			1: "Med",
			2: "High"
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

		$ctrl.dateFormat = function(date) {
			var string = '';
			var today = new Date();
			var diff = today - date;
			var daysAgo = Math.floor((today - date) / (1000*60*60*24));
			if (daysAgo > 1 || daysAgo === 0) {
				string = "days";
			} else {
				string = "day";
			}
			return daysAgo + " " + string + " ago";
		};
	}

	angular
		.module('blocItOff')
		.controller('TaskCtrl', ['Task', TaskCtrl]);
})();
