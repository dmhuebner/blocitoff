(function() {
	function HomeCtrl() {
		this.test = "Testing home controller";
	}

	angular
		.module('blocItOff')
		.controller('HomeCtrl', [HomeCtrl]);
})();
