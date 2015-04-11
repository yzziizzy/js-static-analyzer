
var tree = require('../lib/tree');
var treeStructure = require('../structure');


module.exports = function(scope) {
	
	if(!scope.ast.params) return;
	
	
	scope.params = scope.ast.params.map(function(p) {
		return {
			name: p.name,
			
			
		};
	});
	
	console.log(scope.ast);
	
	
	var flatExp = tree.dfSearch(treeStructure)(scope.ast.body, function(node, acc) {
		acc.push(node);
		return acc;
	}, []);
	
	
	
	
};

















