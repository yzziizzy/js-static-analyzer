 

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




module.exports = {
	dfSearch: mkDFSearch,
	
	
};


