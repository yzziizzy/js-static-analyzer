
var _ = require('lodash');

var tree = require('../lib/tree');
var treeStructure = require('../structure');


module.exports = function(scope) {
	
	if(!scope.ast.params) return;
	
	
	scope.params = scope.ast.params.map(function(p) {
		return {
			name: p.name,
			
			
		};
	});
	
	
	
	var flatExp = tree.dfSearch(treeStructure)(scope.ast.body, function(node, acc) {
		acc.push(node);
		return acc;
	}, []);
	
	
	scope.varsDeclared = _.where(flatExp, {type: 'VariableDeclarator'}).map(function(e) {
		return {
			name: e.name,
			ast: e,
			
		};
	});
	
	scope.symsDeclared = _.extend([], scope.varsDeclared, scope.params);
	
	
	
	scope.varsRefd = _.where(flatExp, {type: 'Identifier'}).map(function(e) {
		
		
		
		return {
			name: e.name,
			ast: e,
			
		};
	});
	
	
};




// object references have deeply nested identifier names.
function collectIdName(id) {
	
	
	
}











