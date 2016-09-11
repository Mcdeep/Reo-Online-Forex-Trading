(function () {
	angular.module('rapp')
		.factory('_m', function () {
			return window.moment;
		})
		.factory('_', function () {
			return window._;
		})
		.component('pageHeader', {
			templateUrl: "component-page-head.html",
			bindings: {
				page: '=',
			}
		}).component('sessionItem', {
		templateUrl: "component-session-item.html",
		bindings: {
			session: '=',
			onBook: '&'
		},
		controller: ["_m", SessionController]
	});

	function SessionController(_m) {
		var vm = this;

		vm.day = _m(vm.session.day, "YYYY-MM-DD HH:mm:ss").format("DD");
		vm.time = _m(vm.session.day, "YYYY-MM-DD HH:mm:ss").format("HH:mm");
		vm.weekDay = _m(vm.session.day, "YYYY-MM-DD HH:mm:ss").format("ddd");
		vm.month = _m(vm.session.day, "YYYY-MM-DD HH:mm:ss").format("MMM");

		//Functions
		vm.book = book;

		function book() {
			vm.onBook({session: vm.session});
		}
	}

})();
