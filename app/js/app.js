'use strict';

// Declare app level module which depends on views, and directives
angular.module('BlendEdxApp', [
  'ngRoute',
  'ui.bootstrap',
  'restangular'
])
  .config(['$routeProvider', 'RestangularProvider', '$httpProvider',
    function($routeProvider, RestangularProvider, $httpProvider) {
      RestangularProvider.setBaseUrl('http://localhost:9000');
      $httpProvider.interceptors.push('authInterceptor');
    $routeProvider
      .when('/', {
        templateUrl: 'views/home/home.html',
        controller: 'MainController'
      })
      .when('/groups/:groupId', {
        templateUrl: 'views/group/feed.html',
        controller: 'GroupCtrl'
      })
      .otherwise({redirectTo: '/'});
  }])
  .run(function(){
    toastr.options.positionClass = "toast-bottom-right";
    toastr.options.closeButton = true;
  })
  .factory('authInterceptor', [function(){
    return {
      'request': function(config){
        var accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NTRiNDE5ZjgxNTZiOWMyMjY0ZDU2NjEiLCJ1cGRhdGVkIjoiMjAxNS0wNS0wN1QxMDo0MjozOS43MjhaIiwiY3JlYXRlZCI6IjIwMTUtMDUtMDdUMTA6NDI6MzkuNzI3WiIsImF2YXRhciI6Imh0dHA6Ly96ZXJvdGlwcy5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTIvMDIvYmVhdXRpZnVsLWJpcmRzLXdhbGxwYXBlcnNfYmx1ZS1iaXJkLXdhbGxwYXBlci1mcmVlLmpwZyIsInJvbGUiOiJ0ZWFjaGVyIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJlbWFpbCI6Im5oYXRuazNAZ21haWwuY29tIiwibmFtZSI6Ik5oYXROSyIsIl9fdiI6MCwiZ3JvdXBzIjpbXX0.xssBC-sdURDMvGSeQ85Ek71fHQnnZxCL7of7Lg7NVJg';
        config.headers = config.headers || {};
        config.headers['x-access-token'] = (accessToken !== null) ? accessToken : '';
        return config;
      }
    }
  }])
;
