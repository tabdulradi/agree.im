"use strict";
define([ 'require', 
         'angularfire', 
         'common/firebase-service',
         'angular'], function(require) {
  var angular = require('angular');
  
  var getVote = function ($scope, $firebase) {
    $firebase(
      $scope.fireRef.child("v/" + $scope.slug)
    )
    .$asObject()
    .$loaded()
    .then(
      function (vote) {
        $scope.vote = vote
        getResults($scope, $firebase)
        $scope.isMulti = vote.mode === 'multi'
        $scope.notFound = !$scope.vote.$value 
      }
    ).catch(function (error) {
      console.log(error);
    });
  };

  var getResults = function ($scope, $firebase) {
    $firebase(
      $scope.fireRef.child("r/" + $scope.vote.resultId)
    )
    .$asObject()
    .$bindTo($scope, 'results')
  };

  var auth = function ($scope, $firebase) {
    if (! $scope.fireRef.getAuth()) {
      $scope.fireRef
      .authAnonymously(function(error, authData) {
        if (error) {
          $('.js-empty-slate').html("Authenticated Failed")
        }
      });
    }
    $scope.voterId = $scope.fireRef.getAuth().uid
  };

  return angular
  .module("voteView", [
  	"firebase", 
  	"voteFireRefServiceModule"
  ]).
  controller("voteViewCtrl", function($scope, $firebase, $routeParams, voteFireRef) {
    $scope.slug = $routeParams.slug;
    document.title += " - " + $scope.slug
    $scope.fireRef = voteFireRef();
    auth($scope, $firebase);
    getVote($scope, $firebase);
    $scope.voteMe = function () {
      $scope.results.results.map(function(r, i){
        if ($scope.isMulti) {
          r.voters[$scope.voterId] = $scope.selected[i] ? 1 : 0;
        }
        else {
          r.voters[$scope.voterId] = i === $scope.selected ? 1 : 0;
        }
      })
    }
  });
});
