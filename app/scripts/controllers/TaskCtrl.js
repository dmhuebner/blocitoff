(function() {
	function TaskCtrl(Task, User, $cookies) {
		var $ctrl = this;

		var seven_days = 604800000;
    var one_day = 86400000;

		/**
		* @desc test object
		* @type {Object}
		*/
		$ctrl.test = "Testing main controller";


		/*===== Authorization on Load =====*/
		if (firebase.auth().currentUser) {
			$cookies.remove('signInModalClicked');
		} else {
			window.location.replace('/');
		}

		/*===== Services =====*/
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
		$ctrl.allTasks = $ctrl.Task.all;

		$ctrl.currentUserTasks = $ctrl.Task.getByUserId(firebase.auth().currentUser.uid);

		$ctrl.tasksLength = null;

		/**
		* @desc User Service
		* @type {Object} | Service
		*/
		$ctrl.User = User;

		/*===== Service Methods =====*/


		$ctrl.getTasksLength = function() {
			$ctrl.allTasks.$loaded().then(function() {
				$ctrl.tasksLength = $ctrl.allTasks.length;
			});
		};

		$ctrl.getTasksLength();


		// $ctrl.tasksLength = $ctrl.getTasksLength();

		/*===== Models =====*/

		/**
		* @desc initialize newTask
		* @type {Object}
		*/
		$ctrl.newTask = {};


		/**
		* @desc newTask
		* @type {Object} | Model
		*/
		$ctrl.newTask = {
			description: '',
			priority: '',
			createdAt: firebase.database.ServerValue.TIMESTAMP,
			completed: false,
			userId: firebase.auth().currentUser.uid
		};
			// order: $ctrl.tasksLength + 1

		/**
		* @desc priorityMap
		* @type {Object} | Model
		*/
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
			if (daysAgo > 1) {
				string = daysAgo + " days ago";
			} else if (daysAgo === 0) {
				string = "today";
			} else {
				string = daysAgo + " day ago";
			}
			return string;
		};

	}

	angular
		.module('blocItOff')
		.controller('TaskCtrl', ['Task', 'User', '$cookies', TaskCtrl]);
})();
