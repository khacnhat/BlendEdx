'use strict';

// Declare app level module which depends on views, and directives
angular.module('BlendEdxApp', [
  //'ngRoute',
  'ui.router',
  'ui.bootstrap',
  'restangular',
  'ngTagsInput',
  'angularFileUpload',
  'infinite-scroll',
  'LocalStorageModule',
  'pascalprecht.translate',
  'angularMoment',
  'ngMaterial'
])
  .constant("Configuration", {
    BaseUrl: 'http://localhost:9000'
  })
    //.config(['$routeProvider', 'RestangularProvider', '$httpProvider', '$translateProvider', '$rootScopeProvider',
    //function($routeProvider, RestangularProvider, $httpProvider, $translateProvider, $rootScopeProvider) {

  .config(['$stateProvider', '$urlRouterProvider', 'RestangularProvider', '$httpProvider', '$translateProvider', '$rootScopeProvider',
    function($stateProvider, $urlRouterProvider, RestangularProvider, $httpProvider, $translateProvider, $rootScopeProvider) {

      RestangularProvider.setBaseUrl('http://localhost:9000');

      $httpProvider.interceptors.push('authInterceptor');

      $translateProvider
        .useStaticFilesLoader({
          prefix: 'languages/bld-',
          suffix: '.json'
        })
        .registerAvailableLanguageKeys(['en', 'vi'], {
          'en_US': 'en',
          'vi_VN': 'vi',
          '*': 'en'
        })
        .useSanitizeValueStrategy('escaped')
        .determinePreferredLanguage();

      $urlRouterProvider.otherwise("/");

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'views/home/home.html',
          controller: 'MainController'
        })
        .state('groups', {
          url: '/groups/:groupId',
          templateUrl: 'views/group/group.html',
          controller: 'GroupController'
        })
        .state('groups.posts', {
          url: '/posts',
          templateUrl: 'views/group/posts.html',
          controller: 'GroupController'
        })
        .state('groups.members', {
          url: '/members',
          templateUrl: 'views/group/members.html',
          controller: 'GroupController'
        })
        .state('profile', {
          url: '/profiles/:profileId',
          templateUrl: 'views/profile/profile.html',
          controller: 'ProfileController'
        });

      //$routeProvider
      //  .when('/', {
      //    templateUrl: 'views/home/home.html',
      //    controller: 'MainController'
      //  })
      //  .when('/groups/:groupId', {
      //    templateUrl: 'views/group/group.html',
      //    controller: 'GroupController'
      //  })
      //  .when('/groups/:groupId/students', {
      //    templateUrl: 'views/group/members.html',
      //    controller: 'GroupController'
      //  })
      //  .when('/profiles/:profileId', {
      //    templateUrl: 'views/profile/profile.html',
      //    controller: 'ProfileController'
      //  })
      //  .otherwise({redirectTo: '/'});
  }]
)
  .run(function($rootScope, amMoment){
    toastr.options.positionClass = "toast-bottom-right";
    toastr.options.closeButton = true;

    $rootScope.$on('$translateChangeSuccess', function(event, language){
      amMoment.changeLocale(language.language);
    });
  })
  .factory('authInterceptor', ['localStorageService', function(localStorageService){
    return {
      'request': function(config){
        //var accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NTRiNDE5ZjgxNTZiOWMyMjY0ZDU2NjEiLCJ1cGRhdGVkIjoiMjAxNS0wNS0wN1QxMDo0MjozOS43MjhaIiwiY3JlYXRlZCI6IjIwMTUtMDUtMDdUMTA6NDI6MzkuNzI3WiIsImF2YXRhciI6Imh0dHA6Ly96ZXJvdGlwcy5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMTIvMDIvYmVhdXRpZnVsLWJpcmRzLXdhbGxwYXBlcnNfYmx1ZS1iaXJkLXdhbGxwYXBlci1mcmVlLmpwZyIsInJvbGUiOiJ0ZWFjaGVyIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJlbWFpbCI6Im5oYXRuazNAZ21haWwuY29tIiwibmFtZSI6Ik5oYXROSyIsIl9fdiI6MCwiZ3JvdXBzIjpbXX0.xssBC-sdURDMvGSeQ85Ek71fHQnnZxCL7of7Lg7NVJg';
        var accessToken = localStorageService.get('token');
        config.headers = config.headers || {};
        config.headers['x-access-token'] = (accessToken !== null) ? accessToken : '';
        return config;
      }
    }
  }])
  .factory('_', function(){
    return window._;
  })
  .controller('BaseController', ['$scope', '$rootScope', 'localStorageService', 'Configuration',
    function($scope, $rootScope, localStorageService, Configuration){
      $scope.BaseUrl = Configuration.BaseUrl;

      $rootScope.user = $scope.user = localStorageService.get('user');
      if(!$scope.user){
        window.location.href = "index.html";
      }

      //Hide the overlay content
      $scope.hideOverlay = function(){
        angular.element('#overlay').css('display', 'none');
      }

      $scope.logout = function(){
        localStorageService.remove('token');
        localStorageService.remove('user');
        window.location.href = "index.html";
      };

      /**
       * Show the sidebar menu
       */
      $scope.showSidebar = function(){
        angular.element('#sidebar')
          .stop(true, true)
            .animate({
              left: '0'
            }, 100);
      }

      /**
       * Hide the sidebar menu
       */
      $scope.hideSidebar = function(){
        angular.element('#sidebar')
          .stop(true, true)
          .animate({
            left: '-200px'
          }, 100);
      }
  }]);
;
