/**
 * Created by nhatnk on 6/9/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .directive('groupCode', ['groupService', '$rootScope', groupCode]);

  function groupCode(groupService, $rootScope){
    return {
      templateUrl: 'js/directives/groupcode/group-code.html',
      scope: {
        group: '='
      },
      controller: controllerFn
    }

    function controllerFn($scope, $element, $attrs, $transclude, groupService, $rootScope){
      $scope.user = $rootScope.user;
      /**
       * Switch open status
       */
      $scope.switchOpen = function(){
        groupService.one($scope.group._id).customPUT(null, 'open', {open: $scope.group.open})
          .then(function(response){
            $scope.group.open = response.open;
            $scope.group.code = response.code;
          });
      };

      /**
       * Reset group code
       */
      $scope.reset = function(){
        groupService.one($scope.group._id).customPUT(null, 'code')
          .then(function(response){
            $scope.group.code = response.code;
          });
      };
    }
  }
}())