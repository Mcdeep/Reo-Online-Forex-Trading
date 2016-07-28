
(function() {
  'use strict';


  angular.module('rapp')
    .controller('CourseCtrl', ['DataCtx','$rootScope',Course]);

  function Course(DataCtx, $rootScope) {
    var vm = this;
    vm.Modules = [];


    DataCtx.modules.get().$promise.then(loadModules, errLoading)

    function loadModules(data){
      if(data.code == "00"){
          vm.Modules = data.modules;

      }
    }

    function errLoading(err){
      console.log('Error...');
    }
  }

})();
