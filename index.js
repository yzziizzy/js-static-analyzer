 


var jsparser = require('jsparser');
var fs = require('fs');



var path = process.argv[2];


var source = readFileSync(path)+'';

try {
	var ast = jsparser.parse(source);
}
catch(e) {
	console.log("JS Parse Error: " + e);
}


function parseFn(ast, parent, fnnode) {
	var scope = {
		symDeclared: {},
		fnDeclared: {},
		varDeclared: {},
		symReferenced: {},
		fnCalled: {},
		varReferenced: {},
		
		
		
	};
	
	
	
	var handlers = {
		Identifier: function(node) {
			
		},
		
	};
	
	
	function parseNode(node) {
		if(node instanceof Array) {
			return node.map(parseNode);
		}
		
		var fn = handlers[node.type];
		if(!fn) return;
		
		fn(node)
	}
	
	parseNode(ast);
	
	return scope;
}





function walkTree(node) {
	

	
	
}














