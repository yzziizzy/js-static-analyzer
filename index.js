 


var jsparser = require('jsparser');
var fs = require('fs');
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





var rules = {
	Program: null,
	EmptyStatement: null,
	BlockStatement: null,
	ExpressionStatement: null,
	IfStatement: null,
	LabeledStatement: null,
	BreakStatement: null,
	ContinueStatement: null,
	WithStatement: null,
	SwitchStatement: null,
	ReturnStatement: null,
	ThrowStatement: null,
	TryStatement: null,
	WhileStatement: null,
	DoWhileStatement: null,
	ForStatement: null,
	ForInStatement: null,
	DebugggerStatement: null,
	FunctionDeclaration: null,
	VariableDeclaration: null,
	VariableDeclarator: null,
	ThisExpression: null,
	ArrayExpression: null,
	ObjectExpression: null,
	FunctionExpression: null,
	SequenceExpression: null,
	UnaryExpression: null,
	BinaryExpression: null,
	AssignmentExpression: null,
	UpdateExpression: null,
	LogicalExpression: null,
	ConditionalExpression: null,
	NewExpression: null,
	CallExpression: null,
	MemberExpression: null,
	SwitchCase: null,
	CatchClause: null,
	Identifier: null,
	Literal: null,
};

function self(node, rules) { return [node] };
function selfAnd() { 
	var props = Array.prototype.slice.call(arguments);
	return function(node, rules) { 
		return c(
			[node], 
			props.map(function(x) { return walkTree(node[x], rules) })
		);
	};
};

var expRules = {
	Program: 'body',
	EmptyStatement: null,
	BlockStatement: null,
	ExpressionStatement: selfAnd('expression'),
	IfStatement: null,
	LabeledStatement: null,
	BreakStatement: null,
	ContinueStatement: null,
	WithStatement: null,
	SwitchStatement: null,
	ReturnStatement: null,
	ThrowStatement: null,
	TryStatement: selfAnd('block', 'handlers', 'finalizer'),
	WhileStatement: selfAnd('test', 'body'),
	DoWhileStatement: null,
	ForStatement: null,
	ForInStatement: null,
	DebugggerStatement: null,
	FunctionDeclaration: self,
	VariableDeclaration: 'declarations',
	VariableDeclarator: selfAnd('init'), //function(node, rules) { return c([node], walkTree(node.init, rules)) }, // hmm, hmm.... need this node and its kids
	ThisExpression: null,
	ArrayExpression: null,
	ObjectExpression: null,
	FunctionExpression: self,
	SequenceExpression: null,
	UnaryExpression: null,
	BinaryExpression: null,
	AssignmentExpression: selfAnd('left', 'right'),
	UpdateExpression: null,
	LogicalExpression: null,
	ConditionalExpression: selfAnd('test','consequent','alternate'),
	NewExpression: null,
	CallExpression: selfAnd('callee', 'arguments'),
	MemberExpression: self,
	SwitchCase: null,
	CatchClause: null,
	Identifier: self,
	Literal: self,
};




function walkTree(node, rules) {
	if(!node) return [];
	if(node instanceof Array) {
		return _.flatten( c(node.map(function(x) { return walkTree(x, rules) })) );
	}
	
	var list = [];
	console.log(node); 
	console.log('------------');
	var a = rules[node.type];
	if(!a) {
		return [];
	}
	else if(a instanceof Array) {
		return c(a.map(function(x) { return walkTree(node[x], rules) }));
	}
	else if(typeof a == 'string') {
		return walkTree(node[a], rules);
	}
	else if(typeof a == 'function') {
		return a(node, rules);
	}
	
	return [];
}



function c() {
	return Array.prototype.concat.apply([], arguments);
}



// console.log(parseFn(ast.body, null, ast));
console.log(mkDFSearch(treeStructure)(ast.body, function() {
	//find all scopes
	
	
}, []));




// depth first
function mkDFSearch(treeStructure) {
	function depthFirst(node, fn, acc) {
		if(!node) return acc;
		
		var edges = treeStructure[node.type]
		
		edges.map(function(e) {
			
			acc = depthFirst(node[e], fn, acc);
			acc = fn(node[e], acc); // the children have already been walked by this point
		});
		
		return fn(node, acc);
	};
	
	return depthFirst;
}



