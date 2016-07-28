(function() {
  'use strict';

  angular.module('rapp')
    .controller('StudentUploadCtrl', ['DataCtx', 'localStorageService', 'ngDialog', '$rootScope', '_m','$scope', StudentUploadCtrl]);

  function StudentUploadCtrl(DataCtx, localStorageService, ngDialog, $rootScope, _m,  $scope) {
    var vm = this;
    vm.Students =[];
    vm.page = {
      title: "Upload Students",
    };

    vm.csv = {
      content: null,
      header: true,
      headerVisible: true,
      separator: ';',
      separatorVisible: true,
      result: null,
      encoding: 'ISO-8859-1',
      encodingVisible: true
    };

    vm.Students = vm.csv.result;;
    vm.uploadRecords = uploadRecords;
    vm.callback = uploadCallBack;

    function uploadCallBack() {
            var fields = ['email','password','firstname','lastname','cellphone','city','country','paid','student_number'];
            vm.Students = vm.csv.result;
            $scope.$apply();
    }

    function uploadRecords() {
        var Session = new DataCtx.session();
        Session.upload = vm.Students;
        Session.$save({id:'upload'}).then(function(res) {
          if (res.code == "00") {
            Materialize.toast("Session saved Successful", 2000);
            //$state.go('schedule-manage');
          } else {
            Materialize.toast("Failed to save Session", 2000);
          }
        }, function() {
          Materialize.toast("Something Went Wrong", 2000);
        });

    }

    DataCtx.session.get().$promise.then(loadSessions, errLoading);

    function loadSessions(res) {
      if (angular.isArray(res.data)) {
        vm.sessions = res.data;
        vm.zeroSessions = false;
      } else {
        vm.zeroSessions = true;
      }
    }

    function errLoading() {
      Materialize.toast("Session Expired, log In", 2000);
    }
  }

  angular.module('rapp')
    .controller('StudentManageCtrl', ['DataCtx', 'localStorageService', 'ngDialog', '$rootScope', '$state', StudentManageCtrl]);

  function StudentManageCtrl(DataCtx, localStorageService, ngDialog, $rootScope, $state) {
    var vm = this;
    vm.page = {
      title: "Manage Students"
    };

     DataCtx.session.get({id:'students'}).$promise.then(loadStudents, errLoading);

     function loadStudents(res){
             console.log(res);
     }

     function errLoading(res){

     }

    function add() {
      $state.go('schedule-create');
    }

  }

})();
