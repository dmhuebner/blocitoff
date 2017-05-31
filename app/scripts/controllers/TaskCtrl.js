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
		if ($ctrl.currentUser) {
			$cookies.remove('signInModalClicked');
		} else {
			// window.location.replace('/');
		}

		/*===== Services =====*/
		/**
		* @desc Task Service
		* @type {Object} | Service
		*/
		$ctrl.Task = Task;

		/**
		* @desc User Service
		* @type {Object} | Service
		*/
		$ctrl.User = User;

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


/**
* @desc getCurrentUser | from User Service
* @type {Promise} | user
*/
		$ctrl.User.getCurrentUser().then(function(user) {
			// console.log(user);
			/**
			* @desc currentUserTasks | from Task Service
			* @type {Object}
			*/
			$ctrl.currentUserTasks = $ctrl.Task.getByUserId(user.uid);
			$ctrl.currentUser = user;
			$ctrl.currentUserId = user.uid;

			/**
			* @desc newTask
			* @type {Object} | Model
			*/
			$ctrl.newTask = {
				description: '',
				priority: '',
				createdAt: firebase.database.ServerValue.TIMESTAMP,
				completed: false,
				userId: $ctrl.currentUserId
			};
				// order: $ctrl.tasksLength + 1

			/*** Set Current User Name in navbar ***/
			if (user.displayName) {
				var userFirstName = user.displayName.split(' ')[0];
				document.getElementById('current-user-display-name').innerHTML = "Welcome " + userFirstName + "!";
			} else {
				console.log('No user display name');
			}

		})

		$ctrl.tasksLength = null;


		/*===== Service Methods =====*/


		$ctrl.getTasksLength = function() {
			$ctrl.allTasks.$loaded().then(function() {
				$ctrl.tasksLength = $ctrl.allTasks.length;
			});
		};

		$ctrl.getTasksLength();


		// $ctrl.tasksLength = $ctrl.getTasksLength();


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
