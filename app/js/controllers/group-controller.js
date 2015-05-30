/**
 * Created by nhatnk on 4/28/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .controller('GroupCtrl', ['$scope', '$routeParams', 'groupService', groupController]);

  function groupController($scope, $routeParams, groupService){
    var groupId = $routeParams.groupId;
    $scope.group = {};

    groupService.one(groupId).get()
      .then(function(response){
        $scope.group = response;
      });

    $scope.feeds = groupService.one(groupId).all('announcements').getList().$object;

    $scope.removeFeed = function(feed){
      var index = $scope.feeds.indexOf(feed);
      $scope.feeds.splice(index, 1);
    };

    $scope.addFeed = function(feed){
      $scope.feeds.unshift(feed);
    }
  }
})();