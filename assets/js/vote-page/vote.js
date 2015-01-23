"use strict";
define([ 'require', 
         'angularfire', 
         'common/firebase-service',
         'angular'], function(require) {
  var angular = require('angular');
  
  return angular
  .module("votePage", [
  	"firebase", 
  	"voteFireRefServiceModule"
  ]).
  controller("votePageCtrl", function($scope, $firebase, $routeParams, voteFireRef) {
    $scope.slug = $routeParams.slug;
    $scope.fireRef = voteFireRef();
    var sync = $firebase($scope.fireRef.child("v/" + $scope.slug))
    $scope.vote = sync.$asObject()
  });
});
