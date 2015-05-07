/**
 * Created by nhatnk on 4/28/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .controller('GroupCtrl', ['$scope', '$routeParams', 'groupService', groupController]);

  function groupController($scope, $routeParams, groupService){
    var groupId = $routeParams.groupId;
    $scope.group = {_id: groupId, name: 'New group'};
    $scope.feeds = groupService.one(groupId).all('announcements').getList().$object;
  }
})();