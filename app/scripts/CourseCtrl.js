(function () {
        'use strict';


        angular.module('rapp')
                .controller('CourseCtrl', ['DataCtx', '$rootScope', 'ngDialog', '$state', Course]);

        function Course(DataCtx, $rootScope, ngDialog, $state) {

                var vm = this;
                vm.page = {
                        title: "Course",
                        subTitle: "List of Free Courses"
                };
                vm.Modules = [];

                DataCtx.modules.get().$promise.then(loadModules, errLoading)

                function loadModules(data) {
                        if (data.code == "00") {
                                vm.Modules = data.modules;
                        }
                }

                function errLoading(err) {
                        if (err.status == 401) {
                                var vidmodal = ngDialog.open({
                                        template: 'course.modal.html',
                                        className: 'ngdialog-theme-default videoOverview',
                                        controller: function () {
                                                var vm = this;
                                                vm.OverviewUrl = 'https://youtu.be/uFjiwuxQgZA';
                                                vm.playerVars = {
                                                        controls: 1,
                                                        rel: 0
                                                };
                                        },
                                        controllerAs: 'vm'
                                });

                                vidmodal.closePromise.then(function (Data) {
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
        }

})();
