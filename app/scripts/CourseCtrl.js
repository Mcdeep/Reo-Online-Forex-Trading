(function () {
	'use strict';


	angular.module('rapp')
		.controller('CourseCtrl', ['DataCtx', '$rootScope', 'ngDialog', '$state','_', Course]);

	function Course(DataCtx, $rootScope, ngDialog, $state, _) {

		var vm = this;
		vm.page = {
			title: "Course",
			subTitle: "List of Free Courses"
		};
		vm.Modules = [];
		vm.StudentModules  = [];

		DataCtx.modules.get().$promise.then(loadModules, errLoading);

		function loadModules(data) {
			if (data.code == "00") {
				vm.Modules = data.modules;
				vm.StudentModules = data.stude_mod;
				enableModules();
			}
		}

		function enableModules() {
			if(vm.StudentModules.length == 0){
				vm.Modules[0]["enabled"] = true;
			}else{
				var prevCompleted = false;
				angular.forEach(vm.Modules, function(value, key){
					var i = _.findIndex(vm.StudentModules, {module_id: value.id});
                    console.log(i);
					if(key == 0){
						vm.Modules[0]["enabled"] = true;
					}else {
						if(vm.Modules[key - 1].status == "completed"){
							vm.Modules[key]["enabled"] = true;
						}
					}
					if(i >= 0){
						console.log(vm.Modules[key]);
						vm.Modules[key]["status"] = vm.StudentModules[i].status;
					}
				});
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

	angular.module('rapp')
		.controller('CourseManageCtrl', ['DataCtx', '$rootScope', 'ngDialog', '$state', CourseManage]);

	function CourseManage(DataCtx, $rootScope, ngDialog, $state) {

	}

	angular.module('rapp')
		.controller('SingleCourseManageCtrl', ['DataCtx', '$rootScope', 'ngDialog', '$state', SingleCourseManageCtrl]);

	function SingleCourseManageCtrl(DataCtx, $rootScope, ngDialog, $state) {

	}
})();
