'use strict';
/**
 * Created by nhatnk on 4/28/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .service('groupService', groupService);

  groupService.$inject = ['$rootScope', 'Restangular'];

  function groupService($rootScope, Restangular){
    return Restangular.service('groups');
  }
})();