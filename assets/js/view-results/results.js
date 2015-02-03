"use strict";
define([ 'require',
         'angularfire',
         'common/firebase-service',
         'angular'], function(require) {
  var angular = require('angular');

  angular
    .module("viewResults", [
    	"firebase",
    	"voteFireRefServiceModule"
    ])
    .controller("voteResultCtrl",
      function(
        $scope,
        $firebase,
        $routeParams,
        voteFireRef
      ) {
        $scope.id = $routeParams.id;
        $scope.fireRef = voteFireRef();
      }
    );
});
