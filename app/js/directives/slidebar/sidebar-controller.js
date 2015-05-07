/**
 * Created by macmini on 4/22/15.
 */

(function() {
  angular
    .module('BlendEdxApp')
    .directive('bldSidebar', bldSidebar);

  function bldSidebar(){
    return{
      templateUrl: 'js/directives/slidebar/bld-sidebar.html',
      controller: controllerFn,
      controllerAs: 'bldSidebarCtrl',
      link: linkFn,
      bindToController: true
    }

    function controllerFn($scope){
      var vm = this;
      $scope.isVisible = true;

      $scope.buddies = [
        {
          id: "abc",
          name: "Mary A.",
          avatar: "images/woman-5.jpg",
          status: "online",
          slogan: "Feeling groovy"
        },
        {
          id: "abc",
          name: "Mary A.",
          avatar: "images/woman-5.jpg",
          status: "online",
          slogan: "Feeling groovy"
        },
        {
          id: "abc",
          name: "Mary A.",
          avatar: "images/woman-5.jpg",
          status: "online",
          slogan: "Feeling groovy"
        },
        {
          id: "abc",
          name: "Mary A.",
          avatar: "images/woman-5.jpg",
          status: "online",
          slogan: "Feeling groovy"
        }
      ];


      $scope.toggle = function() {
        $scope.isVisible = !$scope.isVisible;
      }
    }

    function linkFn($scope, $element, $attr){
      $scope.$watch(
        'isVisible',
        function(newValue, oldValue){
          if(newValue === oldValue){
            return;
          }
          if(newValue){
            $element
              .stop(true, true)
              .animate({
                right: '0'
              }, 500);
          }else{
            $element
              .stop(true, true)
              .animate({
                right: '-' + ($element.width() - 60) + 'px'
              }, 500);
          }
      });
    }
  }
})();