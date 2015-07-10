/**
 * Created by macmini on 4/22/15.
 */

angular
    .module('BlendEdxApp')
    .controller('MainController', ['$scope', 'meService', '_', MainController]);

function MainController($scope, meService, _){
  $scope.feeds = [];

  $scope.isPagingBusy = false;

  /**
   * Feed pagination
   */
  $scope.nextFeedPage = function(){
    $scope.isPagingBusy = true;
    meService.one().getList('announcements', {offset: _.size($scope.feeds)})
      .then(function(response){
        _.each(response, function(a){
          $scope.feeds.push(a);
        });
        $scope.isPagingBusy = _.size(response) === 0;
      })
      .catch(function(){
        $scope.isPagingBusy = false;
      });
  };

  $scope.addFeed = function(feed){
    $scope.feeds.unshift(feed);
  }
}