'use strict';
/**
 * Created by nhatnk on 4/30/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .directive('postblock', ['_', 'announcementService', 'Configuration', postblock]);

  function postblock(_, announcementService, Configuration){
    return {
      templateUrl: 'js/directives/postblock/postblock.html',
      controller: controllerFn,
      controllerAs: 'postblockCtrl',
      link: linkFn,
      scope: {
        feed: '=data',
        group: '=',
        removeFeed: '='
      }
    }

    function controllerFn($scope, Configuration){
      $scope.BaseUrl = Configuration.BaseUrl;
      $scope.comment = {text: ''};
      $scope.showAllComment = false;
      $scope.sendComment = function(keyEvent) {
        if (keyEvent.which === 13){
          announcementService.one($scope.feed._id).all('comments').post($scope.comment)
            .then(function(data){
              $scope.showAllComment = true;
              $scope.feed.comments.push(data);
              $scope.comment = {text: ''};
              toastr.success("Comment posted", "Success");
            }
            ,function(){
              toastr.error("Error", "Comment not posted");
            });
        }
      }

      //show all comments
      $scope.showComments = function(){
        $scope.showAllComment = !$scope.showAllComment;
      }

      //delete the note
      $scope.delete = function(){
        if(confirm('Sure to delete?')) {
          announcementService.one($scope.feed._id).remove()
            .then(function () {
              $scope.removeFeed($scope.feed);
            })
            .catch(function () {
              toastr.error("Error", "Note was not deleted");
            });
        }
      }

      //preview content
      $scope.preview = function(attachment){
        var overlay = angular.element('#overlay');
        var overlayContent = angular.element('#overlay > .overlay-content');
        var officeExtensions = ['.doc', '.docx', '.ppt', '.pptx', '.xsl', '.xslx', '.pdf', '.jpg'];
        if(_.contains(officeExtensions, attachment.extension)){
          overlayContent.html('<iframe src="https://view.officeapps.live.com/op/view.aspx?src=https%3A%2F%2Fwww.dropbox.com%2Fs%2Fsbras8q63poj2rp%2Fbai1lesson5.docx%3Fdl%3D1" width="100%" height="100%"></iframe>');
        }
        overlay.css('display', 'block');
      }

      $scope.fileThumbnail = function(extenstion){
        switch (extenstion){
          case '.jpg':
            return 'fa-file-image-o';
          case '.docx':
            return 'fa-file-word-o';
          case '.pdf':
            return 'fa-file-pdf-o';
          case '.xsl':
            return 'fa-file-excel-o';
          case '.pptx':
            return 'fa-file-powerpoint-o';
          default:
            return 'fa-file';
        }
      }
    }

    function linkFn($scope, $element, $attrs){

    }
  }
})();