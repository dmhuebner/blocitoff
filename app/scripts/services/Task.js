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
			removeTask: function(task) {
				alert('Are you sure you want to remove the task: "' + task.description + '"?');
				tasks.$remove(task).then(function(ref) {
					ref.key === task.$id;
					console.log('The task "' + task.description + '" was removed successfully!');
				});
			},
			arrayMove: function(arr, fromIndex, toIndex) {
    		var element = arr[fromIndex];
    		arr.splice(fromIndex, 1);
    		arr.splice(toIndex, 0, element);
			},
			completeTask: function(task) {
				if (task.completed == false) {
					task.completed = true;
					tasks.$save(task);
				} else {
					task.completed = false;
					tasks.$save(task);
				}
			},
			getByUserId: function(userId) {
				var tempRef = ref.orderByChild('userId').equalTo(userId);
				tasks = $firebaseArray(tempRef);
				return tasks;
			}
		}
	}

	angular
		.module('blocItOff')
		.factory('Task', ['$firebaseArray', Task]);
})();
