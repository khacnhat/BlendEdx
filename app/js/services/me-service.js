/**
 * Created by nhatnk on 5/31/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .service('meService', meService);

  meService.$inject = ['Restangular'];

  function meService(Restangular){
    return Restangular.service('me');
  }
}());