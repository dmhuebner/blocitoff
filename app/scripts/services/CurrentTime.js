// (function() {
// 	function CurrentTime() {
// 		var currentDate = new Date();
// 		var currentHours = currentDate.getHours();
// 		var currentMinutes = currentDate.getMinutes();
// 		var amTrue = true;
//
// 		if (currentMinutes < 10) {
// 				currentMinutes = '0' + currentMinutes;
// 		}
//
// 		if (currentHours > 12) {
// 				currentHours = (currentHours - 12);
// 				amTrue = false;
// 		}
//
// 		var currentTime = (currentHours + ':' + currentMinutes);
//
// 		if (amTrue) {
// 				currentTime += 'am';
// 		} else {
// 				currentTime += 'pm';
// 		}
//
// 		return currentTime;
// 	}
//
// 	angular
// 		.module('nextTask')
// 		.value('CurrentTime', [CurrentTime]);
// })();
