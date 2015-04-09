
var _ = require('lodash');


// perhaps a switch to print out stuff based on some sort of 'xpath' for function scopes
// perhaps an interactive scope explorer

module.exports = function(write) {
	var M = {
		scopes: function(scope, indent) {
			indent = indent || '';
// 			console.log(scope);
			write(indent + 'Name:   ' + scope.name);
			write(indent + 'Params: ' + _.pluck(scope.params, 'name').join(', '));
			if(scope.fnDec.length) {
				write(indent + 'SubFns: ');
				scope.fnDec.map(function(s) {
					M.scopes(s, indent + '  ');
				});
			}
			write(indent);
			
		},
	}
	
	
	
	return M;
}















