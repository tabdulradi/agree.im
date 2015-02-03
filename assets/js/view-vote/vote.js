"use strict";
define([ 'require',
         'angularfire',
         'common/vote-factory',
         'common/anonymous-user',
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
        AnonymousUser,
        Vote
      ) {

        $scope.slug = $routeParams.slug;
        document.title += " - " + $scope.slug
        $scope.auth = AnonymousUser()
        Vote($scope.slug).$loaded()
        .then(
          function (vote) {
            $scope.vote = vote
            $scope.isMulti = vote.mode === 'multi'
            $scope.notFound = !$scope.vote.$value
          }
        )
        $scope.voteMe = function () {
          $scope.vote.voteForThis($scope.selected, $scope.auth.voterId);
        };


        $scope.getVotersDetails = function(index) {
          var votersDetails = $scope.vote.getVotersDetails(index)
          return {
            votersAgree: votersDetails.agreeSize,
            percent: {
              width: votersDetails.percent  + "%"
            }
          }
        };
      }
    );
});
