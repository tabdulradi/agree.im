'use strict';
define(['require',
        'angular',
        'angularfire',
        'common/firebase-service'], function(require) {

    angular
      .module('usersFactoryModule', [
      'firebase',
      'voteFireRefServiceModule'
      ])
      .factory("AnonymousUser",
        function(
          $firebase,
          voteFireRef
        ) {
          return function() {
            var ref = voteFireRef()
            var authResult = {}
            if (! ref.getAuth()) {
              ref.authAnonymously(function(error, authData) {
                if (error) {
                  authResult["error"] = true;
                }
                authResult["voterId"] = authData.uid
              });
            } else{
              authResult["voterId"] = ref.getAuth().uid
            }

            return authResult;
          }
        }
      )
});
