Combinatorics = require('js-combinatorics');
Underscore = require('underscore');

exports = module.exports = function () {

}

exports.getPermutations = function (n) {

  var permArray = [];
  for(var i=0; i<=n; i++) {

    var array = [];
    for(var j=0; j<n; j++) {
      if (j < i) {
        array.push(1);
      } else {
        array.push(0);
      }
    }

    permArray.push(Combinatorics.permutation(array).toArray());
  }

  flattened = Underscore.flatten(permArray, true);

  unique = Underscore.uniq(flattened, false, function(obj){
    return obj.toString();
  });

  return unique;
}