 
var stdStructure = require('../structure').scopes;
 
 
// depth first
function mkDFSearch(treeStructure) {
	function depthFirst(node, fn, acc) {
		
		if(!node) return acc;
		//console.log(node);

		if(node instanceof Array) {
			return node.reduce(function(acc, node) {
				return depthFirst(node, fn, acc); 
				
			}, acc);
		}
		
		
		var edges = treeStructure[node.type];

		edges.map(function(e) {
			if(!node[e]) return;
			acc = depthFirst(node[e], fn, acc);
		});
		
		return fn(node, acc);
	};
	
	return depthFirst;
}



function nextLayer(ast) {
	if(!ast) return [];
	
	if(ast instanceof Array) {
		return ast.reduce(function(acc, node) {
			return acc.concat(nextLayer(node)); 
		}, []);
	}
	
	
	var edges = stdStructure[ast.type];
	var acc = [];
	
	edges.map(function(e) {
		if(!ast[e]) return;
		acc.push(ast[e]);
	});
	
	return acc;
}




module.exports = {
	dfSearch: mkDFSearch,
	nextLayer: nextLayer,
	
};

// a return value that is a choice as to whether to decend or not..., and maybe whether to add to the accumulator
