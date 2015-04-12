

require('./monkeys');

var Promise = require('bluebird');
var jsparser = require('jsparser');
// "jsparser": "git+http://git@github.com/cjihrig/jsparser.git", // old one, fuck json for not having comments
var fs = Promise.promisifyAll(require('fs'));
var _ = require('lodash');
var Path = require('path');
var util = require('util');
var colors = require('colors');

var tree = require('./lib/tree');


var print = require('./print')(console.log);

var treeStructure = require('./structure');


var path = process.argv[2];
var argv = require('minimist')(process.argv.slice(2));




function loadPasses(folder) {
	return fs.readdirAsync(folder)
	.filter(function(x) { return x[0] != '.'; })
	.map(function(file) {
		return require('./'+Path.join(folder, file));
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




var fnCrawl = tree.dfSearch(treeStructure);

function parseScope(ast, name) {
	var scope = {
		name: name || 'unknown fn',
		params: [],
		fnDec: [],
 		ast: ast,
	};
	
	
	scope.fnDec = fnCrawl(ast.body, function(node, acc) {
		
		if(node.type == 'FunctionExpression' || node.type == 'FunctionDeclaration') {
			acc.push(node);
		}
		
		return acc;
	}, []).map(parseScope).setProperty('parent', scope);
	
	
	scope.flatExp = fnCrawl(scope.ast.body, function(node, acc) {
		acc.push(node);
		return acc;
	}, []);
	
	
	return scope;
}


function flatten(scope) {
	return [scope].concat(scope.fnDec.reduce(function(acc, s) {
		return acc.concat(flatten(s));
	}, []));
}


scanDir(argv._[0])
.map(parseFile)
.then(function(scopes) {
	
	var flat = Array.prototype.concat.apply([], scopes.map(flatten));
	
	loadPasses('./passes').then(function(mods) {
		
		// meh, prolly need some other sort of tree mapping function
		flat.map(mods[0]);
// 		scopes.map(print.scopes);
// 		console.log(util.inspect(scopes, true, null));
	});
	
})
.catch(SyntaxError, function(e) {
	console.log(e);
	
});







