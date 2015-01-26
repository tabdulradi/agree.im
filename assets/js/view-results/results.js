"use strict";
define([ 'require', 
         'angularfire', 
         'common/firebase-service',
         'angular'], function(require) {
  var angular = require('angular');
  
  return angular
  .module("resultsPage", [
  	"firebase", 
  	"voteFireRefServiceModule"
  ]).
  controller("voteResultCtrl", function($scope, $firebase, $routeParams, voteFireRef) {
    $scope.id = $routeParams.id;
    $scope.fireRef = voteFireRef();
  });
});
