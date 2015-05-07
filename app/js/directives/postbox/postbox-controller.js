'use strict';
/**
 * Created by nhatnk on 4/30/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .directive('postbox', ['announcementService', postbox]);

  function postbox(){
    return {
      templateUrl: 'js/directives/postbox/postbox.html',
      controller: controllerFn,
      controllerAs: 'postboxCtrl',
      link: linkFn,
      bindToController: true
    }

    function controllerFn($scope, announcementService){
      $scope.note = {text: ''};
      $scope.note.groups = [$scope.group];
      $scope.postNote = function(){
        announcementService.post($scope.note).then(function(data){
          $scope.feeds.unshift(data);
          $scope.note = {};
          toastr.success("Announcement posted successfully", "Success");
        },function(){
          toastr.error("Error", "Posting annoucement failed");
        });
      }
    }

    function linkFn($scope, $element, $attrs){

    }
  }
})();