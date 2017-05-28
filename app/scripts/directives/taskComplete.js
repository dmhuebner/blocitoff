(function() {
	function taskComplete($firebaseObject) {
		return {
			replace: false,
			restrict: 'A',
			scope: {},
			link: function(scope, element, attributes) {
				scope.completeTask = function(taskId) {
					var completedTask = $firebaseObject(ref.child(taskId));
					completedTask.completed = true;
					completedTask.$save();
					return
				};
			}
		}
	}

	angular
		.module('blocItOff')
		.directive('taskComplete', ['$firebaseObject', taskComplete]);
})();
