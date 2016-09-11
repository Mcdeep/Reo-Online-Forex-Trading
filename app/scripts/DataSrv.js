(function () {
	'use strict';

	angular.module('rapp')
		.factory('DataCtx', ['$resource', DataCtx]);


	function DataCtx($resource) {
		var endpoint = 'http://163.172.160.199/api/';
		return {
			modules: 	$resource(endpoint + 'module/:id', {id: '@id'}),
			lesson: 	$resource(endpoint + 'lesson/:id', {id: '@id'}),
			quiz: 		$resource(endpoint + 'quiz/:id', {id: '@id'}),
			auth: 		$resource(endpoint + 'auth/login', {id: '@id'}),
			user: 		$resource(endpoint + 'auth/register'),
			thoughts: 	$resource(endpoint + 'thoughts', {id: '@id'}),
			session: 	$resource(endpoint + 'sessions/:id', {id: '@id'}),
			userinfo: 	$resource(endpoint + 'userdetails'),
			base: 		$resource(endpoint + 'email'),
			reset: 		$resource(endpoint + 'resetPassword'),
			submit: 	$resource(endpoint + 'submit')
		};
	}
})();
