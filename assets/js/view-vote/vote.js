"use strict";
define([ 'require',
         'angularfire',
         'common/vote-factory',
         'common/auth-user',
         'angular'], function(require) {

  angular
    .module("viewVote", [
    	"firebase",
    	"voteFactoryModule",
      "usersFactoryModule"
    ])
    .controller("voteViewCtrl",
      function(
        $scope,
        $firebase,
        $routeParams,
        User,
        Vote
      ) {

        $scope.slug = $routeParams.slug;
        document.title += " - " + $scope.slug
        var authPromise = User().catch(function(error){
          $scope.authError = error;
        });

        Vote($scope.slug).$loaded()
        .then(
          function (vote) {
            $scope.vote = vote
            $scope.isMulti = vote.mode === 'multi'
            $scope.notFound = !$scope.vote.$value
          }
        )
        $scope.voteMe = function () {
          authPromise.then(function(voterId){
            $scope.vote.voteForThis($scope.selected, voterId);
          });
        };


        $scope.getVotersDetails = function(index) {
          var votersDetails = $scope.vote.getVotersDetails(index)
          return {
            votersAgree: votersDetails.agreeSize,
            votersCount: votersDetails.totalSize,
            percent: {
              width: votersDetails.percent  + "%"
            }
          }
        };
      }
    );
});
