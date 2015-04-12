
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
	
	
	

	
	
	scope.varsDeclared = _.where(scope.flatExp, {type: 'VariableDeclarator'}).map(function(e) {
		return {
			name: e.name,
			ast: e,
			
		};
	});
	
	scope.symsDeclared = _.extend([], scope.varsDeclared, scope.params);
	
	
	
	scope.varsRefd = _.where(scope.flatExp, {type: 'MemberExpression'}).map(function(e) {
		
		
		return {
			name: collectIdName(e),
			ast: e,
			
		};
	});
	
	
};




// object references have deeply nested identifier names.
function collectIdName(id) {
	
	if(id.type == 'Identifier');
	
	console.log(id);
	
}











