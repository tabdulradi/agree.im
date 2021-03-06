'use strict';
define(['require',
         'angular',
         'angularfire'], function(require) {

  angular
    .module('voteFireRefServiceModule', [
      'firebase'
    ])
    .factory('voteFireRef',
      function($firebase) {
        return function() {
          var url = 'https://votenow.firebaseio.com/';
          return new Firebase(url);
       };
     });
  });
