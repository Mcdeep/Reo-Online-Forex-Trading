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
                                            icon:'fa-adjust',
                                            button:'Cool'
                                    }
                            );
                    }else{
                            var suc = WidgetSrv.successDialog(
                                    {
                                            title:'Yay',
                                            message: 'succes',
                                            icon:'fa-adjust',
                                            button:'Cool'
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

    rapps.controller('ScheduleManageCtrl', ['DataCtx','localStorageService','ngDialog','$rootScope', '$state', ScheduleManageCtrl]);

      function ScheduleManageCtrl(DataCtx, localStorageService, ngDialog, $rootScope, $state) {
        var vm = this;
        vm.page = {
          title: "Manage Sessions",
        };

        vm.csv = {
          content: null,
          header: true,
          headerVisible: true,
          separator: ';',
          separatorVisible: true,
          result: null,
          encoding: 'ISO-8859-1',
          encodingVisible: true,
        };

        vm.schedules = [{
          "session_datetime": "2016/7/21",
          "level": "BEGINNER",
          "slots": "10",
          "location": "Sandton",
          "duration": "2"
        }, {
          "session_datetime": "2016/7/21",
          "level": "BEGINNER",
          "slots": "10",
          "location": "Sandton",
          "duration": "2"
        }, {
          "session_datetime": "2016/7/21",
          "level": "ADVANCED",
          "slots": "9",
          "location": "Sandton",
          "duration": "2"
        }];
        vm.edit = edit;
        vm.add = add;

        function edit(session) {

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
                $state.go('schedule-manage');
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
