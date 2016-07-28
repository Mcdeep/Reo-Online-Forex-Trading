(function () {
  'use strict';

  angular.module('rapp')
    .factory('UserSrv', ['DataCtx','localStorageService',UserSrv]);

  function UserSrv(DataCtx, localStorageService) {
    return {
      checkUserAuth: checkUserAuth,
      getUserInfo  : getUserInfo,
      logOutUser: logOutUser
    };

    function getUserInfo(){
      return localStorageService.get("userInfo");
    }

    function logOutUser(){
      localStorageService.remove('userInfo');
      localStorageService.remove('token');
    }

    function checkUserAuth(){
      var userInfo =  localStorageService.get("userInfo");
      console.log(userInfo);
     return (userInfo!==null);
    }


  }
})();
