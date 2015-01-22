define([ 'require', 
         'angularfire', 
         'angular'], function(require) {
  var angular = require('angular');
  
  return angular
  .module("resultsPage", ["firebase"]).
  controller("voteResultCtrl", function($scope, $firebase, $routeParams) {
    $scope.id = $routeParams.id;
  });
});

