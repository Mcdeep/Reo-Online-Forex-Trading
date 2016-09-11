(function () {
	'use strict';

	var app = angular.module("rapp",
		['ui.router',
			'ngSanitize',
			'ngAnimate',
			'ui.materialize',
			'ngResource',
			'ngDialog',
			'ngCsvImport',
			'LocalStorageModule',
			'anim-in-out',
			'mgo-angular-wizard',
			'youtube-embed',
			'angular-jwt']);

	app.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', 'jwtInterceptorProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, localStorageServiceProvider, jwtInterceptorProvider, $httpProvider) {
		// For any unmatched url, redirect to /state1
		$urlRouterProvider.otherwise("/");
		//
		$stateProvider
			.state('home', {
				url: "/",
				templateUrl: "templates/home.tmpl.html",
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('course', {
				url: "/course",
				templateUrl: "templates/course.tmpl.html",
				controller: 'CourseCtrl',
				controllerAs: 'vm'
			})
			.state('lesson', {
				url: "/lesson/:id",
				templateUrl: "templates/course.single.tmpl.html",
				controller: 'CourseLessonCtrl',
				controllerAs: 'vm'
			})
			.state('schedule-create', {
				url: "/schedule-create",
				templateUrl: "templates/create.schedule.tmpl.html",
				controller: 'ScheduleCreateCtrl',
				controllerAs: 'vm'
			})
			.state('schedule-manages', {
				url: "/schedule-manage",
				templateUrl: "templates/list.schedule.tmpl.html",
				controller: 'ScheduleManageCtrl',
				controllerAs: 'vm'
			})
			.state('schedule-me', {
				url: "/my-schedule",
				templateUrl: "templates/mysessions.tmpl.html",
				controller: 'MySessionsCtrl',
				controllerAs: 'vm'
			})
			.state('student-manage', {
				url: "/students-manage",
				templateUrl: "templates/list.students.tmpl.html",
				controller: 'StudentManageCtrl',
				controllerAs: 'vm'
			})
			.state('student-upload', {
				url: "/students-upload",
				templateUrl: "templates/upload.students.tmpl.html",
				controller: 'StudentUploadCtrl',
				controllerAs: 'vm'
			})
			.state('schedule', {
				url: "/schedule",
				templateUrl: "templates/schedule.tmpl.html",
				controller: 'ScheduleCtrl',
				controllerAs: 'vm'
			})
			.state('quiz', {
				url: "/quiz/:id",
				templateUrl: "templates/quiz.tmpl.html",
				controller: 'QuizLessonCtrl',
				controllerAs: 'vm'
			})
			.state('verify', {
				url: "/email/:email/:code",
				templateUrl: "templates/verify.tmpl.html",
				controller: 'VerifyCtrl',
				controllerAs: 'vm'
			})
			.state('resetPassword', {
				url: "/password/:email/:code",
				templateUrl: "templates/verify.tmpl.html",
				controller: 'PasswordCtrl',
				controllerAs: 'vm'
			})
			.state('thoughts', {
				url: "/thoughts",
				templateUrl: "templates/thoughts.tmpl.html",
				controller: 'ThoughtCtrl',
				controllerAs: 'vm'
			});

		localStorageServiceProvider
			.setPrefix('reo')
			.setStorageType('sessionStorage');

		jwtInterceptorProvider.tokenGetter = ['localStorageService', function (localStorageService) {
			return localStorageService.get('token');
		}];

		$httpProvider.interceptors.push('jwtInterceptor');
		$httpProvider.defaults.headers.post = {'Content-Type': 'application/json'};
	}]);

})();
