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

		/**
		* @desc all tasks | from Task Service
		* @type {Object}
		*/
		$ctrl.tasks = $ctrl.Task.all

		$ctrl.prepareNewTask = function() {
			// TODO get current time

			return {
				description: $ctrl.Task.newTask.description,
				priority: $ctrl.Task.newTask.priority,
				status: $ctrl.Task.newTask.status,
				createdAt: $ctrl.Task.newTask.createdAt
			};
		};

		$ctrl.addTask = function(newTask) {
			Task.all.$add(newTask).then(function() {
				Task.all.$save(newTask);
			})
		};
	}

	angular
		.module('blocItOff')
		.controller('TaskCtrl', ['Task', TaskCtrl]);
})();
