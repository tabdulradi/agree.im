'use strict';
define(['require',
        'angular',
        'angularfire',
        'common/firebase-service'], function(require) {
  angular
    .module('voteFactoryModule', [
    'firebase',
    'voteFireRefServiceModule'
    ])
    .factory("Vote",
      function(
        $FirebaseObject,
        $firebase,
        voteFireRef
      ) {
        var VoteFactory = $FirebaseObject.$extendFactory({
          // methods exist on the prototype
          voteForThis: function(selected, voterId) {
            var vote = this;
            vote.options.map(function(option, i){
              if (vote.mode === 'multi') {
                if (!option.voters) {
                  option.voters = {}
                }

                option.voters[voterId] = selected[i] ? 1 : 0;
              }
              else {
                if (!option.voters) {
                  option.voters = {}
                }
                option.voters[voterId] = i === selected ? 1 : 0;
              }
            })
            vote.$save();
          },

          getVotersDetails: function(optionIndex){
            var obj = this.options[optionIndex].voters,
            agreeSize = 0,
            totalSize= 0,
            key;

            for (key in obj) {
              if (obj.hasOwnProperty(key)) totalSize++;
              if (obj[key] === 1) agreeSize++;
            }
            return {
              "agreeSize": agreeSize,
              "totalSize": totalSize,
              "percent": totalSize !== 0 ? (agreeSize/ totalSize) * 100 : 0}
          }
        });
        return function(slug) {
          var ref = voteFireRef().child("v/" + slug);
          var sync = $firebase(ref, { objectFactory: VoteFactory });
          return sync.$asObject();
        }
      }
    )
});
