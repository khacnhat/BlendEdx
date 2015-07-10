/**
 * Created by nhatnk on 5/19/15.
 */

(function(){
  var app = angular
    .module('BlendEdxApp', ['restangular', 'ngRoute', 'LocalStorageModule'])

    .config(['$routeProvider', 'RestangularProvider', '$httpProvider',
      function($routeProvider, RestangularProvider, $httpProvider) {
        RestangularProvider.setBaseUrl('http://localhost:9000');
        $routeProvider
          .when('/', {
            templateUrl: 'views/index.html',
            controller: 'IndexController'
          })
          .otherwise({redirectTo: '/'});
      }])
    .run(function(){
      toastr.options.positionClass = "toast-bottom-right";
      toastr.options.closeButton = true;
    });

  app.controller('IndexController', ['$scope', 'Restangular', 'localStorageService',
    function($scope, Restangular, localStorageService){

      var user = localStorageService.get('user');
      if(user){
        window.location.href = "home.html";
      }

      $scope.loginModel = {};
      $scope.registerModel = {role: 'student'};

      /**
       * Login with the login model
       */
      $scope.login = function(){
        Restangular.all('users/login').post($scope.loginModel)
          .then(function(response){
            localStorageService.set('token', response.token);
            localStorageService.set('user', response.user);
            window.location.href = "home.html";
          })
          .catch(function(err){
            toastr.error("Error", err.data.message);
          });
      };

      $scope.register = function(){
        Restangular.all('users/register').post($scope.registerModel)
          .then(function(response){
            localStorageService.set('token', response.token);
            localStorageService.set('user', response.user);
            window.location.href = "home.html";
          })
          .catch(function(err){
            toastr.error("Error", err.data.message);
          });
      };
  }]);
}());