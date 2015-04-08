 
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

var treeStructure = require('./structure');


var path = process.argv[2];


var source = fs.readFileSync(path)+'';

try {
	var ast = jsparser.parse(source);
}
catch(e) {
	console.log("JS Parse Error: " + e);
}

var Path = require('path');

function scanDir(root) {
// 	var dir = root + '/' + path;
	
	var info = [];
	
	return fs.readdirAsync(root)
	.filter(function(x) { return x[0] != '.'; })
	.map(function(file) {
		var fp = Path.join(root, file);
		return fs.statAsync(fp)
		.then(function(stats) {
			return stats.isDirectory() ? scanDir(fp) : fp;
		});
	}).then(_.flatten);
}

scanDir('.').then(function(huh) {
	console.log(huh);
});


function parseFn(ast, parent, fnnode) {
	var scope = {
		symDeclared: {},
		fnDeclared: [],
		varDeclared: {},
		symReferenced: {},
		fnCalled: {},
		varReferenced: {},
		
		
		flatExp: walkTree(ast, expRules),
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








var fnCrawl = mkDFSearch(treeStructure);

function parseScope(ast) {
	var scope = {
		params: [],
		fnDec: [],
		ast: ast,
	}
	
	
	scope.fnDec = fnCrawl(ast.body, function(node, acc) {
		
		if(node.type == 'FunctionExpression' || node.type == 'FunctionDeclaration') {
			acc.push(node);
		}
		
		return acc;
	}, []).map(parseScope).setProperty('parent', scope);
	
	
	
	return scope;
}


// console.log(parseFn(ast.body, null, ast));
// console.log(mkDFSearch(treeStructure)(ast.body, function(node, acc) {
// 	//find all scopes
// // 	console.log(node.type);
// 	if(!node.type) console.log(node);
// 	acc.push(node.type);
// 	
// 	return acc;
// }, []));

// console.log(parseScope(ast));



// depth first
function mkDFSearch(treeStructure) {
	function depthFirst(node, fn, acc) {
		
		if(!node) return acc;
		console.log(node);

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



