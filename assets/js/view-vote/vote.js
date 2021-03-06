"use strict";
define([ 'require',
         'angular',
         'angularfire',
         'common/vote-factory',
         'common/auth-user'], function(require) {

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
        var authPromise = User().catch(function(error){
          $scope.authError = error;
        });

        Vote($scope.slug).$loaded()
        .then(
          function (vote) {
            $scope.vote = vote
            document.title += " - " + $scope.vote.title
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
