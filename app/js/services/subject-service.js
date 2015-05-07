'use strict';
/**
 * Created by nhatnk on 4/28/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .service('subjectService', subjectService);

  subjectService.$inject = ['$rootScope', 'Restangular'];

  function subjectService($rootScope, Restangular){
    return Restangular.service('subjects');
  }
})();