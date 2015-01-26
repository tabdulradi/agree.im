"use strict";
define([ 'require', 
         'angularfire', 
         'common/firebase-service',
         'angular'], function(require) {
  var angular = require('angular');
  
  return angular
  .module("voteView", [
  	"firebase", 
  	"voteFireRefServiceModule"
  ]).
  controller("voteViewCtrl", function($scope, $firebase, $routeParams, voteFireRef) {
    $scope.slug = $routeParams.slug;
    document.title += " - " + $scope.slug
    $scope.fireRef = voteFireRef();
    var sync = $firebase($scope.fireRef.child("v/" + $scope.slug))
    sync.$asObject().$loaded().then(
      function (vote) {
        $scope.vote = vote
        $scope.isMulti = vote.mode === 'multi'
        if (!$scope.vote.$value ) {
          $('.js-empty-slate').html("404")
        }
      }
    ).catch(function (error) {
      console.log(error);
    });
  });
});
