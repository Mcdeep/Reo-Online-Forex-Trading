(function() {
  'use strict';
  var rapp =  angular.module('rapp');

    rapp.controller('ScheduleCtrl', ['DataCtx','localStorageService','ngDialog','$rootScope', '_m','WidgetSrv',ScheduleCtrl]);
      function ScheduleCtrl(DataCtx, localStorageService, ngDialog, $rootScope, _m, WidgetSrv) {
        var vm = this;
        vm.zeroSessions = true;
        vm.page = {
          title: "Class Schedule",
          subTitle: "Upcoming"
        };

        vm.sessions = [];
        vm.bookSession = bookSession;

        function bookSession(session) {

          var book = ngDialog.open({
            template: 'templates/booking_dialog.tmpl.html',
            className: 'ngdialog-theme-default confirmbook',
            controller: ["session", function(session) {
              var vm = this;
              vm.session = session;
            }],
            controllerAs: 'vm',
            resolve: {
              session: function() {
                return session;
              }
            }
          });

          book.closePromise.then(function(data) {
            if (data.value !== null && data.value == "okay") {
              var Book = new DataCtx.session();
              Book.day = session.day;
              Book.id = session.id;
              Book.$save({
                id: 'book'
              }).then(function(res) {
                    if(res.code == "00"){
                            var suc = WidgetSrv.successDialog(
                                    {
                                            title:'Yay',
                                            message: 'succes',
                                            icon:'fa-check-square-o',
                                            button:'Cool'
                                    }
                            );
                    }else if(res.code == "03"){
                            var suc = WidgetSrv.successDialog(
                                    {
                                            title:'Already Booked',
                                            message: 'You have already booked for a class this week',
                                            icon:'fa-exclamation',
                                            button:'Alright'
                                    }
                            );
                    }
            }, function(res){
                    var suc = WidgetSrv.successDialog(
                            {
                                    title:'Yay',
                                    message: 'succes',
                                    icon:'fa-adjust',
                                    button:'Cool'
                            }
                    );
            });
            }
          });
        }

        DataCtx.session.get().$promise.then(loadSessions, errLoading);

        function loadSessions(res) {
          if (angular.isArray(res.data)) {
            vm.sessions = res.data;
            vm.zeroSessions = true;
            if(vm.sessions.length >  0){
                  vm.zeroSessions = false;
            }

          } else {
            vm.zeroSessions = true;
          }
        }

        function errLoading() {
          Materialize.toast("Session Expired, log In", 2000);
        }
      }

})();


(function() {
  'use strict';
  var rapps =  angular.module('rapp');

    rapps.controller('ScheduleManageCtrl', ['DataCtx','localStorageService','ngDialog','$rootScope', '$state',"_m", ScheduleManageCtrl]);

      function ScheduleManageCtrl(DataCtx, localStorageService, ngDialog, $rootScope, $state,_m) {
        var vm = this;
        vm.page = {
          title: "Manage Sessions",
        };



        vm.loadSessions = loadSessions;


        vm.add = add;

        DataCtx.session.get({id:'admin'}).$promise.then(loadSessions, errLoading);

        function loadSessions(res) {
          if (angular.isArray(res.data)) {
            if(res.data.length > 0){
              vm.schedules = res.data;
              angular.forEach(vm.schedules, function(sched, key){
                vm.schedules[key]["session_datetime"] = _m(vm.schedules[key].day, "YYYY-MM-DD HH:mm:ss").format("DD-MMM-YYYY HH:mm");
              });
              vm.zeroSessions = false;
            }else{
              vm.zeroSessions = true;
            }
          } else {
            vm.zeroSessions = true;
           // Materialize.toast("Session Expired, log In", 2000);
          }
        }

        function errLoading() {
          Materialize.toast("Could Connect to Server", 2000);
        }

        function add() {
          $state.go('schedule-create');
        }



      }

    rapps.controller('ScheduleCreateCtrl', ['DataCtx','localStorageService','ngDialog','$rootScope', '_m', '$state',ScheduleCreateCtrl]);
      function ScheduleCreateCtrl(DataCtx, localStorageService, ngDialog, $rootScope, _m, $state) {
        var vm = this;
        vm.page = {
          title: "Create Session"
        };
        var currentTime = new Date();
        vm.currentTime = currentTime;
        vm.minDate = (new Date(vm.currentTime.getTime())).toISOString();;
        console.log(vm.minDate);
        vm.schedule = {
          recuring: false
        };

        vm.createSchedule = createSchedule;

        function createSchedule() {

          if (angular.isDefined(vm.time) && angular.isDefined(vm.schedule.session_date)) {
            vm.schedule.day = _m(vm.schedule.session_date + " " + vm.time, "DD-MM-YYYY HH:mm");
            var Session = new DataCtx.session();
            Session.day = vm.schedule.day.format("YYYY-MM-DD HH:mm:ss");
            Session.slots = vm.schedule.slots
            Session.duration = vm.schedule.duration;
            Session.location = vm.schedule.location;
            Session.level = vm.schedule.level;
            Session.note = vm.schedule.notes;
            Session.recuring = vm.schedule.recuring;
            Session.day_week = vm.schedule.day.day();
            Session.$save().then(function(res) {
              if (res.code == "00") {
                Materialize.toast("Session saved Successful", 2000);
                $state.go('schedule-manages');
              } else {
                Materialize.toast("Failed to save Session", 2000);
              }
            }, function() {
              Materialize.toast("Something Went Wrong", 2000);
            });
          }
        }
      }

 rapps.controller('MySessionsCtrl', ['DataCtx',
        'localStorageService',
        'ngDialog',
        '$rootScope', '$state',
        MySessionsCtrl]);
  function MySessionsCtrl(DataCtx, localStorageService, ngDialog, $rootScope, _m) {
    var vm = this;
    vm.zeroSessions = true;
    vm.page = {
      title: "My Classes",
      subTitle: "Upcoming"
    };

    vm.sessions = [];
    vm.bookSession = bookSession;

    function bookSession(session) {

      var book = ngDialog.open({
        template: 'templates/booking_dialog.tmpl.html',
        className: 'ngdialog-theme-default confirmbook',
        controller: ["session", function(session) {
          var vm = this;
          vm.session = session;
        }],
        controllerAs: 'vm',
        resolve: {
          session: function() {
            return session;
          }
        }
      });

      book.closePromise.then(function(data) {
        if (data.value !== null && data.value == "okay") {
          var Book = new DataCtx.session();
          Book.day = session.day;
          Book.id = session.id;
          Book.$save({
            id: 'book'
          }).then(function(res) {

          });
        }
      });
    }

    DataCtx.session.get({id:'all'}).$promise.then(loadSessions, errLoading);

    function loadSessions(res) {
      if (angular.isArray(res.data)) {
        vm.sessions = res.data;
        if(vm.sessions.length > 0){
                vm.zeroSessions = false;
        }else{
                vm.zeroSessions = true;
        }
      } else {
        vm.zeroSessions = true;
      }
    }

    function errLoading() {
      Materialize.toast("Session Expired, log In", 2000);
    }
  }
})();
