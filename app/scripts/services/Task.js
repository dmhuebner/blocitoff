(function() {
	function Task($firebaseArray) {
		var ref = firebase.database().ref().child("tasks");
		var tasks = $firebaseArray(ref);

		/**
    * @function getCurrentTime
    * @desc Gets current time in proper format
    */
    Task.getCurrentTime = function() {
        var currentDate = new Date();
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

        return currentTime;
    };

		Task.newTask = {};
		Task.newTask.description = {};
		Task.newTask.priority = {};
		Task.newTask.status = "active";
		Task.newTask.createdAt = Task.getCurrentTime();

		return {
			all: tasks
		}
	}

	angular
		.module('blocItOff')
		.factory('Task', ['$firebaseArray', Task]);
})();
