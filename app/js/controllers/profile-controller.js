/**
 * Created by nhatnk on 6/8/15.
 */

(function(){
  angular
    .module('BlendEdxApp')
    .controller('ProfileController', ['$scope', '$stateParams', 'userService', 'FileUploader', 'localStorageService', 'Configuration', profileController]);

  function profileController($scope, $stateParams, userService, FileUploader, localStorageService, Configuration){
    $scope.profile = {};

    userService.one($stateParams.profileId).get()
      .then(function(response){
        $scope.profile = response;
      });

    /**
     * Handler for avatar image uploading
     * @type {FileUploader}
     */
    $scope.uploader = new FileUploader({
      autoUpload: true,
      url: Configuration.BaseUrl + '/users/' + $stateParams.profileId+ '/avatar',
      headers: {'x-access-token': localStorageService.get('token')},
      onSuccessItem: function(item, response, status, headers){
        $scope.profile.avatar = response.path;
      },
      onErrorItem: function(item, response, status, headers){
        $scope.uploader.removeFromQueue(item);
        toastr.error(response.message, "Error");
      }
    });

  }
}())