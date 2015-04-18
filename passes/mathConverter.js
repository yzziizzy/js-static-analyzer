 

var _ = require('lodash');

var tree = require('../lib/tree');
var treeStructure = require('../structure');


module.exports = function(scope) {
	
	
	scope.fnAST = null;
	
	// find math operations and swap them out with fake builtin functions
	
	// do a deep copy
	
	
	
	scope.varsRefd = _.where(scope.flatExp, {type: 'BinaryExpression'}).map(function(e) {
		
	});

};


// by operator
var handlers = {
	'/': function(n) {
		return {
			type: 'CallExpression',
			fake: true,
			name: '#Math.div',
			arguments: [
				// top,
				// bottom
			],
			loc: _.extend({}, n.loc),
			
		}
	
	}
	
	
};












