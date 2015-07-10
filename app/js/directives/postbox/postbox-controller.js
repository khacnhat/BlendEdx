'use strict';
/**
 * Created by nhatnk on 4/30/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .directive('postbox', ['announcementService', 'groupService', 'FileUploader', '$q', 'localStorageService', postbox]);

  function postbox(){
    return {
      templateUrl: 'js/directives/postbox/postbox.html',
      controller: controllerFn,
      link: linkFn,
      scope: {
        group: '=',
        addFeed: '='
      }
    }

    function controllerFn($scope, announcementService, groupService, FileUploader, $q, localStorageService){
      $scope.note = {text: '', attachments: [], groups: []};

      /**
       * Create new note
       */
      $scope.postNote = function(){
        announcementService.post($scope.note).then(function(data){
          $scope.addFeed(data);
          $scope.note.text = "";
          $scope.note.attachments = [];
          $scope.uploader.clearQueue();
          toastr.success("Announcement posted successfully", "Success");
        },function(){
          toastr.error("Error", "Posting annoucement failed");
        });
      }

      /**
       * Load groups for auto-complete input-tags
       * @param query
       */
      $scope.loadGroups = function(query){
        var deferred = $q.defer();
        groupService.getList({name: query}).then(function(groups){
          var tags = [];
          deferred.resolve(groups);
        });
        return deferred.promise;
      };

      $scope.uploader = new FileUploader({
        autoUpload: true,
        url: 'http://localhost:9000/files',
        headers: {'x-access-token': localStorageService.get('token')},
        onSuccessItem: function(item, response, status, headers){
          $scope.note.attachments.push(response);
        },
        onErrorItem: function(item, response, status, headers){
          $scope.uploader.removeFromQueue(item);
          toastr.error(response.message, "Error");
        }
      });
    }

    function linkFn(scope, element, attrs){
      scope.$watch(attrs.group, function(g){
        if(g)
          scope.note.groups = [g];
      });
    }
  }
})();