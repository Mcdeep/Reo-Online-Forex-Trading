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



        }

        angular.module('rapp')
                .controller('ThoughtCreateCtrl', ['DataCtx', 'localStorageService', 'ngDialog', '$rootScope', '$state', StudentManageCtrl]);


        function StudentManageCtrl(DataCtx, localStorageService, ngDialog, $rootScope, $state) {
                var vm = this;
                vm.page = {
                        title: "Manage Students"
                };

                vm.Students = [];
                vm.uploadStudents = uploadStudents;

                DataCtx.session.get({id: 'students'}).$promise.then(loadStudents, errLoading);

                function loadStudents(res) {
                        if (res.code == "00") {
                                vm.Students = res.data;
                        }

                }

                function errLoading(res) {
                        console.log(res);
                }

                function uploadStudents (){
                        $state.go('student-upload');
                }


                function add() {

                }

        }

})();
