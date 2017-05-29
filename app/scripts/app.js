(function() {
	function config($locationProvider, $stateProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
			});

		$stateProvider
			.state('home', {
				url: '/',
				controller: 'HomeCtrl as home',
				templateUrl: '/templates/home.html'
			})
			.state('tasks', {
				url: '/tasks',
				controller: 'TaskCtrl as task',
				templateUrl: '/templates/tasks.html'
			});
	}

	angular
		.module('blocItOff', ['ui.router', 'firebase', 'ui.bootstrap'])
		.config(config);
})();
