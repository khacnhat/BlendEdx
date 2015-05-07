'use strict';
/**
 * Created by nhatnk on 4/28/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .service('announcementService', announcementService);

  announcementService.$inject = ['$rootScope', 'Restangular'];

  function announcementService($rootScope, Restangular){
    return Restangular.service('announcements');
  }
})();