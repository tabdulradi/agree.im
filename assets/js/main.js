"use strict";
define([ 'require', 
         'jQuery',
         'angular',
         'view-vote/vote',
         'view-results/results',
         'create-vote/create-vote',
         'angular-route'], function(require) {
  var angular = require('angular');
  window.angular = angular

  angular
  .module("voteNowApp", [
    "ngRoute",
    "voteView",
    "resultsPage",
    "createVote"
  ])
  .config([
    "$routeProvider", 
    function($routeProvider) {
      $routeProvider.when("/", {
        templateUrl: "assets/js/create-vote/create-vote.html",
        controller: "createVoteCtrl",
        controllerAs: "createVoteCtrl"
      });
      $routeProvider.when("/v/:slug", {
        templateUrl: "assets/js/view-vote/vote.html",
        controller: "voteViewCtrl",
        controllerAs: "voteCtrl"
      });
      $routeProvider.when("/r/:id", {
        templateUrl: "assets/js/view-results/result.html",
        controller: "voteResultCtrl",
        controllerAs: "resultsCtrl"
      });
      $routeProvider.otherwise({
        redirectTo: "/"
      });
    }
  ]);
  return angular
  .bootstrap(document, ["voteNowApp"])
});
