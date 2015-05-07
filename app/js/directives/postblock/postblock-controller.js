'use strict';
/**
 * Created by nhatnk on 4/30/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .directive('postblock', ['announcementService', postblock]);

  function postblock(){
    return {
      templateUrl: 'js/directives/postblock/postblock.html',
      controller: controllerFn,
      controllerAs: 'postblockCtrl',
      link: linkFn,
      scope: {
        feed: '=data'
      }
    }

    function controllerFn($scope, announcementService){
      $scope.comment = {text: ''};
      $scope.showAllComment = false;
      $scope.sendComment = function(keyEvent) {
        if (keyEvent.which === 13){
          announcementService.one($scope.feed._id).all('comments').post($scope.comment)
            .then(function(data){
              $scope.feed.comments.push(data);
              $scope.comment = {text: ''};
              toastr.success("Comment posted", "Success");
            }
            ,function(){
              toastr.error("Error", "Comment not posted");
            });
        }
      }

      $scope.showComments = function(){
        $scope.showAllComment = !$scope.showAllComment;
      }
    }

    function linkFn($scope, $element, $attrs){

    }
  }
})();