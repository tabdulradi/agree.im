"use strict";
define([ 'require', 
         'angularfire', 
         'common/firebase-service',
         'angular'], function(require) {
  var angular = require('angular');
  
  return angular
  .module("createVote", [
  	"firebase", 
  	"voteFireRefServiceModule"
  ]).
  controller("createVoteCtrl", function($scope, $firebase, voteFireRef) {
    $scope.fireRef = voteFireRef();    
  });
});
