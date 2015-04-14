
var _ = require('lodash');

var tree = require('../lib/tree');
var treeStructure = require('../structure');


module.exports = function(scope) {
	
	
	
	// bad name. this is for low level exceptions like division.
	scope.canHaveNativeExceptions = false;
	// divide by 0
	// null reference
	

	
	
	scope.varsDeclared = scope.flatExp.map(function(e) {
		if(!e.loc || e.loc.start.line != 17) return;
		console.log(e.type, e);
		console.log('-------------');
	});
	
	
	
	
	scope.varsRefd = _.where(scope.flatExp, {type: 'BinaryExpression'}).map(function(e) {
		
		
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











