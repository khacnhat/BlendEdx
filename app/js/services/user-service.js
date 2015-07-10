/**
 * Created by nhatnk on 5/31/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .service('userService', userService);

  userService.$inject = ['Restangular'];

  function userService(Restangular){
    return Restangular.service('users');
  }
}());