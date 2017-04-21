(function () {
	'use strict';
	angular.module('rapp')
		.controller('LoginCtrl', ['DataCtx', 'localStorageService', 'ngDialog', '$rootScope', '$state', LoginCtrl]);

	function LoginCtrl(DataCtx, localStorageService, ngDialog, $rootScope, $state) {
		var vm = this;
		vm.loading = false;
		vm.resetPassword = false;

		vm.login = login;
		vm.sendPasswordReset = sendPasswordReset;

		vm.resetMyPassword = function () {
			vm.resetPassword = !vm.resetPassword;
		};

		function sendPasswordReset() {
			vm.loading = true;
			var Reset = new DataCtx.reset();
			Reset.email = vm.log.email;

			Reset.$save().then(function (res) {
				console.log(res);
				if (res.code == "00") {
					Materialize.toast(vm.message, 3000);
				}
				vm.loading = false;
			}, function (res) {
				console.log(res);
				vm.loading = false;
			});
			console.log(vm.log);
		}

		function login() {
			if (vm.resetPassword) {
				sendPasswordReset();
			} else {

				if (vm.log.email !== "" && vm.log.password !== "") {

					vm.loading = true;
					var Login = new DataCtx.auth();
					Login.username = vm.log.email;
					Login.password = vm.log.password;

					Login.$save().then(function (res) {
						if (angular.isDefined(res.token)) {
							Materialize.toast("Login Successful", 2000);

							localStorageService.set('token', res.token);

							DataCtx.userinfo.get().$promise.then(function (res) {
								localStorageService.set('userInfo', res.data);
								vm.log.email = "";
								vm.log.password = "";
								vm.loading = false;
								$rootScope.$broadcast('quiz-login');
								ngDialog.close();
								$state.transitionTo($state.current, {}, {
									reload: true,
									inherit: false,
									notify: true
								});
							});
						} else {
							if (res.code == "06" || res.code == "07") {
								vm.message = "Invalid username / password combination";
								vm.loading = false;
								Materialize.toast(vm.message, 3000);
							}else if(res.code == "09"){
								vm.message = "Your Email Address has not been verified/Please check you emails for verification";
								vm.loading = false;
								Materialize.toast(vm.message, 10000);
							}
						}
					}, function () {
						vm.loading = false;
						Materialize.toast("Server Error", 2000);
					});
				}
			}
		}
	}

})();
