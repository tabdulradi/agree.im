"use strict";
define([ 'require', 
         'angular',
         'vote-page/vote',
         'results-page/results',
         'angular-route'], function(require) {
  var angular = require('angular');
  window.angular = angular

  angular
  .module("voteNowApp", [
    "ngRoute",
    "votePage",
    "resultsPage"
  ])
  .config([
    "$routeProvider", 
    function($routeProvider) {
      $routeProvider.when("/v/:slug", {
        templateUrl: "assets/js/vote-page/vote.html",
        controller: "votePageCtrl",
        controllerAs: "voteCtrl"
      });
      $routeProvider.when("/r/:id", {
        templateUrl: "assets/js/results-page/result.html",
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
