
var _ = require('lodash');

var tree = require('../lib/tree');
var treeStructure = require('../structure').scopes;



/*




*/

module.exports = function(scope) {
	
	scope.fnAST = [];
	
	
	
	
	
	
};




var handlers = {
	Program: returnArg,
	EmptyStatement: returnArg,
	BlockStatement: returnArg,
	ExpressionStatement: returnArg,
	IfStatement: returnArg,
	LabeledStatement: returnArg,
	BreakStatement: returnArg,
	ContinueStatement: returnArg,
	WithStatement: returnArg,
	SwitchStatement: returnArg,
	ReturnStatement: returnArg,
	ThrowStatement: returnArg,
	TryStatement: returnArg,
	WhileStatement: returnArg,
	DoWhileStatement: returnArg,
	ForStatement: returnArg,
	ForInStatement: returnArg,
	DebugggerStatement: returnArg,
	FunctionDeclaration: returnArg,
	VariableDeclaration: returnArg,
	VariableDeclarator: returnArg,
	ArgExpression: returnArg,
	ArrayExpression: returnArg,
	ObjectExpression: returnArg,
	FunctionExpression: returnArg,
	SequenceExpression: returnArg,
	UnaryExpression: returnArg,
	BinaryExpression: returnArg,
	AssignmentExpression: returnArg,
	UpdateExpression: returnArg,
	LogicalExpression: returnArg,
	ConditionalExpression: returnArg,
	NewExpression: returnArg,
	CallExpression: returnArg,
	MemberExpression: returnArg,
	SwitchCase: returnArg,
	CatchClause: returnArg,
	Identifier: returnArg,
	Literal: returnArg,
};



function returnArg(x) { return x; }; 

function c(name, args) {
	return {
		type: 'fnCall',
		name: name,
		args: args,
	};
}

function t(body) {
	return {
		type: 'thunk',
		body: body,
	}
}




