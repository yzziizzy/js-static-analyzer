 


var jsparser = require('jsparser');
var fs = require('fs');



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

var expRules = {
	Program: 'body',
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
	VariableDeclaration: 'declarations',
	VariableDeclarator: function(node, rules) { return c([node], walkTree(node.init, rules)) }, // hmm, hmm.... need this node and its kids
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




function walkTree(node, rules) {
	
	if(node instanceof Array) {
		return c(node.map(function(x) { return walkTree(x, rules) }));
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
		return f(node, rules);
	}
	
	return [];
}



function c() {
	return Array.prototype.concat.apply(arguments);
}



walkTree(ast, expRules);






