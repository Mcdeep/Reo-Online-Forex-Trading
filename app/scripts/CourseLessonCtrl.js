(function () {
	'use strict';


	angular.module('rapp')
		.controller('CourseLessonCtrl', ['$scope', '$stateParams', 'ngDialog', 'DataCtx', 'localStorageService', '$sce', '$state', '$window', Lesson])
		.controller('QuizLessonCtrl', ['$rootScope', '$stateParams', 'ngDialog', 'DataCtx', '$sce', '$state', 'WidgetSrv','WizardHandler', Quiz]);


	function Lesson($scope, $stateParams, ngDialog, DataCtx, localStorageService, $sce, $state, $window) {
		var vm = this;
		vm.lessonTypeVideo = false;
		vm.headTitle = "What is Forex?";
		vm.headDesc = "Description of what forex is";
		//Scroll Page to the Top


		$window.scrollTo(0, angular.element(document.getElementById('main')));

		vm.switchLessonType = switchLessonType;
		vm.gotoQuiz = gotoQuiz;
		//Video Config
		vm.lessonVideo 	= "";
		vm.lessonPictorial = "";
		vm.lessonID = "";
		vm.playerVars =	 {
			controls: 1,
			rel: 0
		};

		var Module = new DataCtx.lesson();
		Module.$save({id: $stateParams.id}).then(loadModules, function (error) {
			console.log('Failed to get');
		});

		function loadModules(res) {
			if(res.code =="00"){
				vm.headTitle 		= res.data.name;
				vm.headDesc 		= res.data.description;
				vm.lessonVideo 		= res.data.video_url;
				vm.lessonPictorial 	= res.data.pictorial_url;
				vm.lessonID 		= res.data.lesson;
			}else{
				console.log('Could not load Lesson');
			}
		}

		function gotoQuiz() {
			//Take the Quiz
			$state.go('quiz', {id: $stateParams.id});
		}

		function switchLessonType() {
			vm.lessonTypeVideo = !vm.lessonTypeVideo;
		}

		$scope.$on('youtube.player.ended', function ($event, player) {
			// play it again
			console.log('It has Finished Playing');
		});
	}


	function Quiz($rootScope, $stateParams, ngDialog, DataCtx, $sce, $state, WidgetSrv, WizardHandler) {
		var vm = this;

		$rootScope.$broadcast('quiz-view', {menu: true});

		vm.headTitle = "...";
		vm.headDesc = "...";
		vm.Quiz = [];


		vm.AnsData = [];
		vm.QAnswer = {};

		vm.gotoLesson = gotoLesson;
		vm.submitQuiz = submitQuiz;
		vm.addQuestion = addQuestion;


		function submitQuiz() {
			var SendObject = {
				id: $stateParams.id,
				ans: vm.AnsData
			};

			var suc = WidgetSrv.confirmDialog(
				{
					title: 'Submit Quiz',
					message: 'Submit quiz for marking',
					icon: 'fa-check-square-o',
					button: 'Submit'
				}
			);

			suc.closePromise.then(function (data) {

				if (data.value == "cool") {
					var sQuiz = new DataCtx.submit();
					sQuiz.id = SendObject.id;
					sQuiz.ans = SendObject.ans;

					sQuiz.$save().then(quizResults, function (err) {
						console.log(err);
					});

				}
			});
		}

		function quizResults(res) {
			if(res.message == "fail"){
				var results = WidgetSrv.confirmDialog(
						{
							title: ' Quiz Results',
							//message: 'Sorry ',
							results:{
								message: 'You need to get 100% to Proceed to next Course',
								marks: parseInt(res.percentage),
								correct: res.correct_answer,
								wrong: res.wrong_answes
							},
							type:'results',
							icon: 'fa-frown-o',
							button: 'Try Again'
						}
				);

				results.closePromise.then(function (data) {
					if (data.value == "cool") {
						WizardHandler.wizard().reset();
						vm.QAnswer = {};
					}else{
						gotoLesson();
					}
				});


			}else if(res.message == "pass"){
				var results = WidgetSrv.successDialog(
						{
							title: ' Quiz Results',
							//message: 'Sorry ',
							results:{
								message: 'Congratulations! You have passed this quiz achieving 100%',
								marks: parseInt(res.percentage),
								correct: res.correct_answer,
								wrong: res.wrong_answes
							},
							type:'results',
							icon: 'fa-smile-o',
							button: 'Continue'
						}
				);

				results.closePromise.then(function (data) {
						$rootScope.$broadcast('quiz-view', {menu: false});
						$state.go('lesson', {id:parseInt($stateParams.id) + 1});
				});
			}
			//console.log(res);
		}

		function addQuestion(pIndex) {
			vm.AnsData[pIndex]["question_id"] = vm.Quiz[pIndex].id;
		}

		DataCtx.lesson.get({id: $stateParams.id}).$promise.then(loadModules, function (error) {
			console.log('Failed to Get...');
		});

		DataCtx.quiz.get({id: $stateParams.id}).$promise.then(loadQuiz, function (error) {
			console.log('Failed to get Quiz...');
		});

		function gotoLesson() {
			$rootScope.$broadcast('quiz-view', {menu: false});
			$state.go('lesson', {id: $stateParams.id});
		}

		function loadModules(data) {
			vm.headTitle = data.name;
			vm.headDesc = data.description;
		}

		function loadQuiz(res) {
			console.log('Loading Quiz...');
			if (res.code == "00") {
				console.log(res.data);
				vm.Quiz = res.data;
			}
		}


	}

})();
