(function () {
  'use strict';

  angular.module('rapp')
    .factory('DataCtx', ['$resource',DataCtx]);


  function DataCtx($resource) {
    var endpoint = 'api/';
    return {
      modules: $resource(endpoint + 'module/:id', {id: '@id'}),
      lesson: $resource(endpoint + 'lesson/:id', {id: '@id'}),
      quiz: $resource(endpoint + 'quiz/:id', {id: '@id'}),
      auth: $resource(endpoint + 'authenticate/:id', {id: '@id'}),
      user:$resource(endpoint + 'registration'),
      session: $resource(endpoint + 'sessions/:id', {id: '@id'}),
      userinfo: $resource(endpoint + 'userdetails'),
      base: $resource(endpoint + 'email'),
      submit: $resource(endpoint + 'submit')
    };
  }
})();
