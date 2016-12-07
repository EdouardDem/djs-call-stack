/**
 * @author Edouard Demotes-Mainard <https://github.com/EdouardDem>
 * @license http://opensource.org/licenses/BSD-2-Clause BSD 2-Clause License
 */

/**
 * Object djs for namespace
 */
window.djs = window.djs || {};

/**
 * This class manage an ordered callback stack
 * This class is chainable
 */
djs.CallStack = function () {
	//Vars
	this.reversed = false;
	this.order = null; //Array, includes ordered callback's names
	this.stack = {};
	this.debug = false;
	//Callbacks
	this.willExecute = function (name) {
	};
	this.didExecute = function (name) {
	};
};

//------------------------------------------------------------------------------
//	MEHTODS
//------------------------------------------------------------------------------
/**
 * Add a callback to the call stack
 *
 * @param {String} name
 * @param {Function} callback
 * @return {Object}
 */
djs.CallStack.prototype.add = function (name, callback) {
	//Add the callback
	this.stack[name] = callback;
	//End
	return this;
};
/**
 * Remove a callback from the call stack
 *
 * @param {String} name
 * @return {Object}
 */
djs.CallStack.prototype.delete = function (name) {
	//Remove the callback
	delete this.stack[name];
	//End
	return this;
};
/**
 * Reverse call stack execution
 *
 * @return {Object}
 */
djs.CallStack.prototype.reverse = function () {
	//Reverse
	this.reversed = true;
	//End
	return this;
};
/**
 * Restore call stack execution order
 *
 * @return {Object}
 */
djs.CallStack.prototype.restore = function () {
	//Restore
	this.reversed = false;
	//End
	return this;
};
/**
 * Execute the whole stack
 *
 * @return {Object}
 */
djs.CallStack.prototype.run = function () {
	//If no order is defined
	if (this.order == null) {
		//Execute each function stored in the stack
		for(var key in this.stack) {
			if (this.stack.hasOwnProperty(key)) {
				this._execute(key);
			}
		}
	}
	//If an order is defined
	else {
		//If we should execute the stack from the end
		if (this.reversed) {
			for (var i = this.order.length - 1; i >= 0; i--) {
				this._execute(this.order[i]);
			}
		}
		//We execute the stack using the order
		else {
			for (var i = 0; i < this.order.length; i++) {
				this._execute(this.order[i]);
			}
		}
	}
	//End
	return this;
};
/**
 * Internal function
 * Execute a function stored in the stack
 *
 * @private
 * @callback willExecute
 * @callback didExecute
 * @param {String} name
 * @return {Object}
 */
djs.CallStack.prototype._execute = function (name) {
	//Check if the function exsits
	if (typeof this.stack[name] == "function") {
		//Debug logging
		if (this.debug)
			console.log('[djs.CallStack] Will execute ' + name);
		//Pre callback
		this.willExecute(name);
		//Execute function
		this.stack[name]();
		//After callback
		this.didExecute(name);
		//Debug logging
		if (this.debug)
			console.log('[djs.CallStack] Did execute ' + name);
	}
	//End
	return this;
};