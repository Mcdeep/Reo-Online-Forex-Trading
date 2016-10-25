(function () {
	angular.module('rapp')
		.component('tradeList', {
			templateUrl: "templates/tradebook-list.html",
			controller: ["_m","DataCtx","ngDialog", TradeBookList],
			controllerAs: "vm"
		})
		.component('tradePost', {
			templateUrl: "templates/tradebook-mypost.html",
			controller: ["_m", TradeBookPost],
			controllerAs: "vm"
		})
		.component('tradeNew', {
			templateUrl: "templates/tradebook-new-post.html",
			controller: ["_m","DataCtx", TradeBookNewPost],
			controllerAs: "vm",
			bindings: {
				cancel: '='
			}
		})
		.component('tradeProfile', {
			templateUrl: "templates/tradebook-profile.html",
			controller: ["_m", TradeBookProfile],
			controllerAs: "vm"
		});


	/* Post Controller*/
	function TradeBookList(_m, DataCtx, ngDialog) {
		var vm = this;
		vm.Posts = [];
		vm.meta = {};
		/*Functions*/
		vm.getPosts = getPosts;
		vm.viewPost	= viewPost;

		function viewPost (post) {

			var chartModal = ngDialog.open({
				template: 'view-thought.modal.html',
				className: 'ngdialog-theme-default chartModal',
				controller: ["Post", ViewPostController],
				controllerAs: 'vm',
				resolve: {
					Post: function () {
						return post;
					}
				}
			});

			chartModal.closePromise.then(function (Data) {
				if (Data.value == "register") {

				} else if (Data.value == "login") {

				} else {

				}
			});
		}

		function ViewPostController (Post) {
			var vm = this;
			vm.Post = Post;
		}

		function getPosts(){
			DataCtx.thoughts.get({include: 'user,comments'}).$promise.then(function (res) {
				if (angular.isArray(res.data)){
					vm.Posts 	= res.data;
					vm.meta 	= res.meta;
				}
			}, function (res) {
				Materialize.toast('Failed to load Posts', 3000);
				//console.log()
			});
		}
		getPosts();
	}


	/*New Post Controller*/
	function TradeBookNewPost(_m, DataCtx) {
		var vm = this;
		console.log('newPost');

		vm.publish = publish;
		vm.triggerAdd = triggerAdd;
		vm.triggerLeave = triggerLeave;
		vm.addPost = false;

		function publish() {
			console.log(vm.postUpload);

			var Post = new DataCtx.thoughts();

			Post.title 		= vm.data.title;
			Post.content 	= vm.data.content;
			Post.extra 		= vm.data.uploadFile;

			Post.$save().then(function (res) {
				console.log(res);
			}, function(res){
				console.log('Res');
			})

		}

		function triggerAdd() {
			vm.addPost = true;
		}

		function triggerLeave () {

			if(!angular.isDefined(vm.data)){
					vm.addPost  = false;
			}else{
				if(vm.data.title.trim() === ""){
					vm.addPost  = false;
				}
			}

		}
	}


	/*New Post Controller*/
	function TradeBookPost(_m) {
		var vm = this;
		console.log('Post');
	}


	/*New Post Controller*/
	function TradeBookProfile(_m) {
		var vm = this;
		console.log('Profile');
	}

})();
