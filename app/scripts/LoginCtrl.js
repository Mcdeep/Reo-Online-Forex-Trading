(function() {
  'use strict';
  angular.module('rapp')
    .controller('LoginCtrl', ['DataCtx', 'localStorageService', 'ngDialog', '$rootScope', '$state', LoginCtrl]);

  function LoginCtrl(DataCtx, localStorageService, ngDialog, $rootScope, $state) {
    var vm = this;
    vm.loading = false;
    vm.login = login;
    function login() {
      if (vm.log.email !== "" && vm.log.password !== "") {

        vm.loading = true;
        var Login = new DataCtx.auth();
        Login.username = vm.log.email;
        Login.password = vm.log.password;

        Login.$save().then(function(res) {
          if (angular.isDefined(res.token)) {
            Materialize.toast("Login Successful", 2000);
            localStorageService.set('token', res.token);
            DataCtx.userinfo.get().$promise.then(function(res) {
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
            if(res.code =="06" || res.code=="07"){
                    vm.message = "Invalid username / password combination";
                    vm.loading = false;
                    Materialize.toast(vm.message, 3000);
            }
          }
        }, function() {
          vm.loading = false;
          Materialize.toast("Server Error", 2000);
        });
      }
    }
  }

})();
