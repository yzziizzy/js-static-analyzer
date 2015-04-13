
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
/*
{ type: 'MemberExpression',
  object: 
   { type: 'Identifier',
     name: 't',
     loc: { source: null, start: [Object], end: [Object] } },
  property: 
   { type: 'Identifier',
     name: 'u',
     loc: { source: null, start: [Object], end: [Object] } },
  computed: false,
  loc: 
   { source: null,
     start: { line: 17, column: 1 },
     end: { line: 17, column: 4 } } }
{ type: 'MemberExpression',
  object: 
   { type: 'MemberExpression',
     object: { type: 'Identifier', name: 't', loc: [Object] },
     property: { type: 'Identifier', name: 'u', loc: [Object] },
     computed: false,
     loc: { source: null, start: [Object], end: [Object] } },
  property: 
   { type: 'Identifier',
     name: 'k',
     loc: { source: null, start: [Object], end: [Object] } },
  computed: false,
  loc: 
   { source: null,
     start: { line: 17, column: 1 },
     end: { line: 17, column: 6 } } }
*/
};




// object references have deeply nested identifier names.
function collectIdName(id) {
	
	if(id.type == 'Identifier');
	
	console.log(id);
	
}











