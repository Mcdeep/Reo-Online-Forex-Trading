(function () {
	'use strict';

	angular.module('rapp')
		.controller('ThoughtCtrl', ['DataCtx', 'localStorageService', 'ngDialog', '$rootScope', '_m', '$scope', ThoughtCtrl]);

	function ThoughtCtrl(DataCtx, localStorageService, ngDialog, $rootScope, _m, $scope) {
		var vm = this;
		vm.page = {
			title: "Thoughts",
			subTitle: "Share thoughts of the Market"
		};
		vm.zeroThoughts = true;

		vm.newThought = newThought;

		function newThought() {
			var newIdeaModal = ngDialog.open({
				template: 'publish-thought.modal.html',
				className: 'ngdialog-theme-default videoOverview',
				controller: 'ThoughtCreateCtrl',
				controllerAs: 'vm'
			});

			newIdeaModal.closePromise.then(function (Data) {
				if (Data.value == "register") {
					$state.go("home");
				} else if (Data.value == "login") {
					$rootScope.$broadcast("crs-login");
				} else {
					$state.go("home");
				}
			});
		}

	}

	angular.module('rapp')
		.controller('ThoughtCreateCtrl', ['DataCtx', 'localStorageService', '$rootScope', '$state', ThoughtCreateCtrl]);

	function ThoughtCreateCtrl(DataCtx, localStorageService, $rootScope, $state) {
		var vm = this;

	}
})();
