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
			}
		}
	}

	angular
		.module('blocItOff')
		.factory('Task', ['$firebaseArray', Task]);
})();
