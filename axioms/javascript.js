

function standardMath() {
	return {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	};
}

function constant(val) {
	return {
		type: 'number',
		value: val,
	};
}
	


module.exports = {
	eval: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},
	uneval: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},
	isFinite: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},
	isNaN: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},
	parseFloat: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},
	parseInt: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},
	decodeURI: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},
	decodeURIComponent: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},
	encodeURI: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},
	encodeURIComponent: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},
	escape: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},
	unescape: {
		throwsExceptions: false,
		canReturn: ['number', 'NaN', 'Infinity'],
		synchronous: true,
		type: 'function',
	},

	'Math.abs': standardMath(),
	'Math.acos': standardMath(),
	'Math.acosh': standardMath(),
	'Math.asin': standardMath(),
	'Math.asinh': standardMath(),
	'Math.atan': standardMath(),
	'Math.atan2': standardMath(),
	'Math.atanh': standardMath(),
	'Math.cbrt': standardMath(),
	'Math.ceil': standardMath(),
	'Math.clz32': standardMath(),
	'Math.cos': standardMath(),
	'Math.exp': standardMath(),
	'Math.expm1': standardMath(),
	'Math.floor': standardMath(),
	'Math.fround': standardMath(),
	'Math.hypot': standardMath(),
	'Math.imul': standardMath(),
	'Math.log': standardMath(),
	'Math.log10': standardMath(),
	'Math.log1p': standardMath(),
	'Math.log2': standardMath(),
	'Math.max': standardMath(),
	'Math.min': standardMath(),
	'Math.pow': standardMath(),
	'Math.random': standardMath(),
	'Math.round': standardMath(),
	'Math.sign': standardMath(),
	'Math.sin': standardMath(),
	'Math.sinh': standardMath(),
	'Math.sqrt': standardMath(),
	'Math.tan': standardMath(),
	'Math.tanh': standardMath(),
	'Math.trunc': standardMath(),

	'Math.E': constant(Math.E),
	'Math.LN10': constant(Math.LN10),
	'Math.LN2': constant(Math.LN2),
	'Math.LOG10E': constant(Math.LOG10E),
	'Math.LOG2E': constant(Math.LOG2E),
	'Math.PI': constant(Math.PI),
	'Math.SQRT1_2': constant(Math.SQRT1_2),
	'Math.SQRT2': constant(Math.SQRT2),
	
	
	
};




