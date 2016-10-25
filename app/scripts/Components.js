(function () {
	angular.module('rapp')
		.factory('_m', function () {
			return window.moment;
		})
		.factory('_', function () {
			return window._;
		})
		.filter('momento', ['_m', function (_m) {
			return function (input) {
				return _m(input.date).fromNow();
			}
		}])
		.component('pageHeader', {
			templateUrl: "component-page-head.html",
			bindings: {
				page: '='
			}
		})
		.component('post', {
			templateUrl: "post-component.html",
			bindings: {
				postData: '='
			}
		})
		.component('comments', {
			templateUrl: "comments-component.html",
			bindings: {
				postComments: '='
			}
		})
		.component('commentPost', {
			templateUrl: "comments-post-component.html",
			bindings: {
				postInfo: '='
			},
			controllerAs: 'vm',
			controller: ['DataCtx' , function (DataCtx) {
				var vm = this;
				vm.comment = "";
				vm.commenting  = false;

				vm.postComment = postComment;

				function postComment () {

					if(vm.comment.trim() !== ""){
						vm.commenting = true;
						var Comment = new DataCtx.comment();
						Comment.content = vm.comment;

						Comment.$save({id: vm.postInfo.id}).then(function (res){

							vm.commenting = true;
						}, function (err) {
							console.log('FAiled save', err);
							vm.commenting = true;
						});
					}

				}
			}]
		})
		.component('sessionItem', {
			templateUrl: "component-session-item.html",
			bindings: {
				session: '=',
				onBook: '&'
			},
			controller: ["_m", SessionController]
		});

	function SessionController(_m) {
		var vm = this;

		vm.day = _m(vm.session.day, "YYYY-MM-DD HH:mm:ss").format("DD");
		vm.time = _m(vm.session.day, "YYYY-MM-DD HH:mm:ss").format("HH:mm");
		vm.weekDay = _m(vm.session.day, "YYYY-MM-DD HH:mm:ss").format("ddd");
		vm.month = _m(vm.session.day, "YYYY-MM-DD HH:mm:ss").format("MMM");

		//Functions
		vm.book = book;

		function book() {
			vm.onBook({session: vm.session});
		}
	}

})();
