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
      controller: controllerFn,
      controllerAs: 'groupExplorerCtrl',
      link: linkFn,
      bindToController: true
    };

    function controllerFn($scope, $modal, Restangular, groupService){
      $scope.add = function(size){
        var modalInstance = $modal.open({
          templateUrl: 'js/directives/groupexplorer/add-group.html',
          controller: 'AddGroupCtrl',
          size: size
        });
      }

      $scope.groups = groupService.getList().$object;
    }

    function linkFn($scope, $element, $attrs){

    }
  }

  angular
    .module('BlendEdxApp')
    .controller('AddGroupCtrl', ['$scope', '$location', '$modalInstance', 'Restangular', 'subjectService', 'groupService', addGroup]);

  function addGroup($scope, $location, $modalInstance, Restangular, subjectService, groupService){
    $scope.group = {name: "", description: "", subject: {id: "", name: ""}};

    $scope.subjects =  subjectService.getList().$object;

    $scope.add = function(){
      groupService.post($scope.group)
        .then(function(result){
          $location.path('/groups/' + result._id);
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
