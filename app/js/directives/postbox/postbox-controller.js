'use strict';
/**
 * Created by nhatnk on 4/30/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .directive('postbox', ['announcementService', 'groupService', 'FileUploader', '$q', postbox]);

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

    function controllerFn($scope, announcementService, groupService, FileUploader, $q){
      $scope.note = {text: '', attachments: []};

      /**
       * Create new note
       */
      $scope.postNote = function(){
        $scope.note.groups = [];
        $scope.groupTags.forEach(function(g){
          $scope.note.groups.push({_id: g._id, name: g.text});
        });
        announcementService.post($scope.note).then(function(data){
          $scope.addFeed(data);
          $scope.note = {};
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
          if(groups && groups.length > 0) {
            groups.forEach(function (g) {
              tags.push({_id: g._id, text: g.name});
            });
          }
          deferred.resolve(tags);
        });
        return deferred.promise;
      };

      $scope.uploader = new FileUploader({
        autoUpload: true,
        url: 'http://localhost:9000/files',
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
          scope.groupTags = [{_id: g._id, text: g.name}];
      });
    }
  }
})();