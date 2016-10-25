(function () {
	'use strict';

	angular.module('rapp')
		.controller('ThoughtCtrl', ['DataCtx', 'localStorageService', 'ngDialog', '$rootScope', '_m', 'UserSrv', ThoughtCtrl]);

	function ThoughtCtrl(DataCtx, localStorageService, ngDialog, $rootScope, _m, UserSrv) {
		var vm = this;

		vm.Profile = UserSrv.checkUserAuth();
		if (vm.Profile) {
			vm.Profile = UserSrv.getUserInfo();
		}
	}

	angular.module('rapp')
		.controller('ThoughtCreateCtrl', ['DataCtx', 'localStorageService', '$rootScope', '$state', ThoughtCreateCtrl]);

	function ThoughtCreateCtrl(DataCtx, localStorageService, $rootScope, $state) {
		var vm = this;

	}
})();
