
var _ = require('lodash');

var tree = require('../lib/tree');
var treeStructure = require('../structure').scopes;


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
	
	var vars = Object.create(null);
	
	scope.varsRefd = [];
	
	// BUG: this doesn't get vars nested inside member expressions
	extractFirstLayer(scope.ast, ['MemberExpression']).map(function(n) {
		var o = baseObject(n);
		
		if(o.type == 'Identifier' && !vars[o.name]) {
			vars[o.name] = true;
			
			scope.varsRefd.push({
				name: o.name,
			});
		}
		
		console.log(o);
		
		console.log('-------------------------------------------'.blue.bold);
		
		console.log('==========================================='.magenta);
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


function baseObject(exp) {
	if(!exp.object) {
		console.log('!! Missing object '.red, exp);
		return;
	}
	
	// recurse, object is nested
	if(exp.object.type == 'MemberExpression') {
		return baseObject(exp.object);
	}
	
	//if(exp.object.type == 'Identifier' || exp.object.type == 'ThisExpression') {
	return exp.object;
	//}
	
	console.log('!! unexpected path in baseObject. '.red, exp);
}





// we need to pull out the 'object' of the deepest nested member expression
// however, recurse into calculated expressions as other variables may be referenced


// object references have deeply nested identifier names.
function collectIdName(id) {
	
	if(id.type == 'Identifier');
	
	console.log(id);
	
}



function extractFirstLayer(ast, types) {
	
	var ts = _.extend({}, treeStructure);
	
	// don't recurse into the node types we are looking for 
	types.map(function(t) {
		ts[t] = [];
	});
	
	var crawl = tree.dfSearch(ts);
	
	
	return crawl(ast.body, function(node, acc) {
		
		if(types.indexOf(node.type) > -1) {
			acc.push(node);
		}
		
		return acc;
	}, []);
};

