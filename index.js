 
Object.defineProperty(Array.prototype, 'setProperty', {
	enumerable: false,
	configurable: false,
	writable: false,
	value: function(prop, value) {
		var len = this.length;
		for(var i = 0; i < len; i++) {
			if(typeof this[i] != 'object') continue;
			this[i][prop] = value;
		}
		return this;
	}
});



var Promise = require('bluebird');
var jsparser = require('jsparser');
// "jsparser": "git+http://git@github.com/cjihrig/jsparser.git", // old one, fuck json for not having comments
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');
var Path = require('path');
var util = require('util');



var print = require('./print')(console.log);

var treeStructure = require('./structure');


var path = process.argv[2];
var argv = require('minimist')(process.argv.slice(2));




function loadPasses(folder) {
	return fs.readdirAsync(folder)
	.filter(function(x) { return x[0] != '.'; })
	.map(function(file) {
		return require(Path.join(folder, file));
	}); 
}





function parseFile(path) {
	return fs.readFileAsync(path)
	.then(function(source) {
		
		return parseScope(jsparser.parse(source+''), null);
	});
}




function scanDir(root) {
	
	return fs.statAsync(root)
		.then(function(stats) {
			if(!stats.isDirectory()) return [root];
			
			return fs.readdirAsync(root)
				.filter(function(x) { return x[0] != '.'; })
				.map(function(file) {
					return scanDir(Path.join(root, file));
				});
		})
		.then(_.flatten);
}


/* old junk

function parseFn(ast, parent) {
	var scope = {
		symDeclared: {},
		fnDeclared: [],
		varDeclared: {},
		symReferenced: {},
		fnCalled: {},
		varReferenced: {},
		
		
// 		flatExp: walkTree(ast, expRules),
	};
	
	
	
	var handlers = {
		Identifier: function(node) {
			
		},
		FunctionDeclaration: function(node) {
			var fn = parseFn(node.body, scope, node);
			scope.fnDeclared.push(fn);
			
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



*/




var fnCrawl = mkDFSearch(treeStructure);

function parseScope(ast, name) {
	var scope = {
		name: name || 'unknown fn',
		params: [],
		fnDec: [],
// 		ast: ast,
	};
	
	
	scope.fnDec = fnCrawl(ast.body, function(node, acc) {
		
		if(node.type == 'FunctionExpression' || node.type == 'FunctionDeclaration') {
			acc.push(node);
		}
		
		return acc;
	}, []).map(parseScope).setProperty('parent', scope);
	
	
	
	return scope;
}





scanDir(argv._[0])
.map(parseFile)
.then(function(scopes) {
	loadPasses('./passes').then(function(mods) {
		
		// meh, prolly need some other sort of tree mapping function
		
		scopes.map(print.scopes);
// 		console.log(util.inspect(scopes, true, null));
	});
	
})
.catch(SyntaxError, function(e) {
	console.log(e);
	
});






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



