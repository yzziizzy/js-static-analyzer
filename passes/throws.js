
var _ = require('lodash');

var tree = require('../lib/tree');
var treeStructure = require('../structure');


module.exports = function(scope) {
	
	
	var x = _.find(scope.flatExp, function(x) { return x.type = 'ThrowStatement'; })
	
	scope.throwsExceptions = !!x;
};










