(function() {
  'use strict';


  angular.module('rapp')
    .controller('HomeCtrl', ['DataCtx', 'ngDialog', 'UserSrv', '$rootScope', '$state', HomeCtrl])
    .controller('VerifyCtrl', ['DataCtx', 'ngDialog', '$rootScope', '$state', '$stateParams', 'WidgetSrv', VerifyCtrl])
    .controller('LayoutCtrl', ['$scope', 'ngDialog', 'DataCtx', 'UserSrv', '$state', '$rootScope', LayoutCtrl]);

  //Home Controller
  function HomeCtrl(DataCtx, ngDialog, UserSrv, $rootScope, $state) {
    var vm = this;

    vm.loggedIn = UserSrv.checkUserAuth();

    if (vm.loggedIn) {
      vm.loggedUser = UserSrv.getUserInfo();
    }

    vm.gotoSchedules = function() {
      $state.go('schedule');
    }

    vm.logOut = function() {
      $rootScope.$broadcast('logout');
      vm.loggedIn = false;
    }

    vm.registerUser = registerUser;

    function registerUser() {

      var UserResource = new DataCtx.user();

      UserResource.firstname = vm.user.firstname;
      UserResource.lastname = vm.user.lastname;
      UserResource.country = vm.user.country;
      UserResource.cellphone = vm.user.cellphone;
      UserResource.city = vm.user.city;
      UserResource.email = vm.user.email;
      UserResource.password = vm.user.password;

      UserResource.$save().then(function(res) {
        if (res.code === "00") {
          vm.user.firstname = "";
          vm.user.lastname = "";
          vm.user.country = "";
          vm.user.cellphone = "";
          vm.user.city = "";
          vm.user.email = "";
          vm.user.password = "";
          ngDialog.open({
            template: 'templates/registration_dialog.tmpl.html',
            className: 'ngdialog-theme-default registration',
            controller: function() {},
            controllerAs: 'vm'
          });

        } else {
          console.log(res);
        }
      });
    }
  }

  function VerifyCtrl(DataCtx, ngDialog, $rootScope, $state, $stateParams, WidgetSrv) {
    var vm = this;

    vm.page = {
      title: "Email Verification"
    };

    vm.email = $stateParams.email;
    vm.emailVerify = emailVerify;

    function emailVerify() {
      console.log("Less");
      var Email = new DataCtx.base();
      Email.email = $stateParams.email;
      Email.confirmation_code = $stateParams.code;

      Email.$save().then(function(res) {
        if (res.code === "00") {
          var suc = WidgetSrv.successDialog({
            title: 'Yay',
            message: 'succes',
            icon: 'fa-adjust',
            button: 'Cool'
          });
        } else {
          console.log(res);
        }
      });
    }
  }
  //Layout Controller
  function LayoutCtrl($scope, ngDialog, DataCtx, UserSrv, $state, $rootScope) {
    var lt = this;
    lt.quiz = false;
    lt.loggedIn = UserSrv.checkUserAuth();

    if (lt.loggedIn) {
      lt.loginUser = UserSrv.getUserInfo();
    }


    lt.viewMySession = viewMySession;
    lt.gotoView = gotoView;
    lt.logOut = logOut;

    function viewMySession() {
      $state.go("mysessions");
    }

    function gotoView(state) {
      $state.go(state);
    }

    function logOut() {
      $rootScope.$broadcast('logout');
      lt.loggedIn = false;
    }

    $scope.$on('quiz-login', function(event) {
      lt.loggedIn = true;
      lt.loginUser = UserSrv.getUserInfo();
    });
    $scope.$on('quiz-view', function(event, data) {
      lt.quiz = data.menu;
    });

    $scope.$on('logout', function(event) {
      UserSrv.logOutUser();
      $state.transitionTo($state.current, {}, {
        reload: true,
        inherit: false,
        notify: true
      });
      lt.loggedIn = false;
    });
    $scope.$on('http-loading', function(event, data) {
      console.log('Setting loading', data.loading);
      lt.loading = data.loading;
    });

    lt.openLogin = function() {
      ngDialog.open({
        template: 'login.form.html',
        className: 'ngdialog-theme-default',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      });
    };

    lt.closeLogin = function() {

    };

  }
})();
