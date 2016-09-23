(function () {
	angular.module('rapp')
		.component('tradeList', {
			templateUrl: "templates/tradebook-list.html",
			controller: ["_m", TradeBookList],
			controllerAs: "vm"
		})
		.component('tradePost', {
			templateUrl: "templates/tradebook-mypost.html",
			controller: ["_m", TradeBookPost],
			controllerAs: "vm"
		})
		.component('tradeProfile', {
			templateUrl: "templates/tradebook-profile.html",
			controller: ["_m", TradeBookProfile],
			controllerAs: "vm"
		});

	function TradeBookList(_m) {
		var vm = this;
		console.log('List');

	}

	function TradeBookPost(_m) {
		var vm = this;
		console.log('Post');
	}

	function TradeBookProfile(_m) {
		var vm = this;
		console.log('Profile');
	}

})();
