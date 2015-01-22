define([ 'require', 
         'angularfire', 
         'angular'], function(require) {
  var angular = require('angular');
  
  return angular
  .module("votePage", ["firebase"]).
  controller("votePageCtrl", function($scope, $firebase, $routeParams) {
    $scope.slug = $routeParams.slug;
  });
});
