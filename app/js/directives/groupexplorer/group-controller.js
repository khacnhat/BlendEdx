'use strict';
/**
 * Created by nhatnk on 4/26/15.
 */
(function(){
  angular
    .module('BlendEdxApp')
    .directive('groupExplorer', groupExplorer);

  function groupExplorer(){
    return {
      templateUrl: 'js/directives/groupexplorer/group-explorer.html',
      controller: controllerFn
    };

    function controllerFn($scope, $modal, $location, Restangular, groupService){
      $scope.add = function(size){
        var modalInstance = $modal.open({
          templateUrl: 'js/directives/groupexplorer/add-group.html',
          controller: 'AddGroupCtrl',
          size: size
        });
      }

      $scope.groups = groupService.getList().$object;

      var unbindRefreshGroup = $scope.$on('refreshGroups', function(){
        $scope.groups = groupService.getList().$object;
      });

      $scope.$on('$destroy', unbindRefreshGroup);

      $scope.join = function(){
        groupService.one('join').customPOST({code: $scope.groupCode})
          .then(function(response){
            $location.path('/groups/' + response.groupId);
          })
          .catch(function(response){
            toastr.error(response.data.message, 'Error');
          });
      };
    }
  }

  angular
    .module('BlendEdxApp')
    .controller('AddGroupCtrl', ['$scope', '$rootScope', '$state', '$modalInstance', 'Restangular', 'subjectService', 'groupService', addGroup]);

  function addGroup($scope, $rootScope, $state, $modalInstance, Restangular, subjectService, groupService){
    $scope.group = {name: "", description: "", subject: {id: "", name: ""}};

    $scope.subjects =  subjectService.getList().$object;

    $scope.add = function(){
      groupService.post($scope.group)
        .then(function(result){
          $rootScope.$broadcast('refreshGroups');
          $state.go('groups.posts', {groupId: result._id});
          toastr.success("New group created successfully", "Success");
          $modalInstance.close('added');
        }, function(){
          toastr.error("Error", "Creating group failed");
        });
    };

    $scope.cancel = function(){
      $modalInstance.dismiss('cancel');
    }
  }
})();
