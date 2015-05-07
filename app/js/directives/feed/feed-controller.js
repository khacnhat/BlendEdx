'use strict';
/**
 * Created by nhatnk on 4/26/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .directive('feed', ['groupService', 'announcementService', feed]);

  function feed(){
    return {
      templateUrl: 'js/directives/feed/feed.html',
      controller: feedFn,
      controllerAs: 'feedCtrl',
      link: linkFn,
      bindToController: true
    }

    function feedFn($scope, groupService, announcementService){

    }

    function linkFn($scope, $element, $attrs){

    }
  }
})();