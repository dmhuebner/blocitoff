(function() {
	function Task($firebaseArray) {
		var ref = firebase.database().ref().child("tasks");
		var tasks = $firebaseArray(ref);

		return {
			all: tasks,
			addTask: function(newTask) {
				if (newTask.description !== null && newTask.description !== '') {
					tasks.$add(newTask).then(function() {
						tasks.$save(newTask);
						$('.task-form-input').val('');
					})
				} else {
					alert("There was an error saving the task.");
				}
			},
			saveTask: function(task) {

				for (var i = 0; i < tasks.length; i++) {
					if (tasks[i].$id === task.$id) {
						tasks[i].status = "expired";
					}
				}
				tasks.$save(task);
			},
			getByStatus: function(status) {
				var tempRef = ref.orderByChild('status').equalTo(status);
				var taskByStatus = null;
				taskByStatus = $firebaseArray(tempRef);
				return taskByStatus;
			}
			// TODO implement check if expired method
		}
	}

	angular
		.module('blocItOff')
		.factory('Task', ['$firebaseArray', Task]);
})();
