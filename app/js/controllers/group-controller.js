/**
 * Created by nhatnk on 4/28/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .controller('GroupController', ['$scope', '$stateParams', 'groupService', '_', groupController]);

  function groupController($scope, $stateParams, groupService, _){
    var groupId = $stateParams.groupId;
    $scope.group = {};

    groupService.one(groupId).get()
      .then(function(response){
        $scope.group = response;
      });

    $scope.feeds = [];

    $scope.removeFeed = function(feed){
      var index = $scope.feeds.indexOf(feed);
      $scope.feeds.splice(index, 1);
    };

    $scope.addFeed = function(feed){
      $scope.feeds.unshift(feed);
    }

    $scope.isPagingBusy = false;
    /**
     * Infinitive scroll function for announcements
     */
    $scope.nextFeedPage = function(){
      $scope.isPagingBusy = true;
      groupService.one(groupId).all('announcements').getList({offset: $scope.feeds.length})
        .then(function(response){
          _.each(response, function(a){
            a.groups = [$scope.group];
            $scope.feeds.push(a);
          });
          $scope.isPagingBusy = _.size(response) === 0;
        })
        .catch(function(){
          $scope.isPagingBusy = false;
        });
    }

    $scope.members = groupService.one(groupId).all('members').getList().$object;

  }
})();