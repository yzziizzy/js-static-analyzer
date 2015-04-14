 
 
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


