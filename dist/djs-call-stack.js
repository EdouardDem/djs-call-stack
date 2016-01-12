/**
 * This class manage an ordered callback stack
 * This class is chainable
 */
function CallStack() {
    //Vars
    this.reversed = false;
    this.order = null; //Array, includes ordered callback's names
    this.stack = {};
    this.debug = false;
    //Callbacks
    this.willExecute = function(namespace) {};
    this.didExecute = function(namespace) {};
}

//------------------------------------------------------------------------------
//	MEHTODS
//------------------------------------------------------------------------------
/**
 * Add a callback to the call stack
 *
 * @param {String} namespace
 * @param {Function} callback
 * @return {Object}
 */
CallStack.prototype.add = function(namespace, callback) {
    //Add the callback
    this.stack[namespace] = callback;
    //End
    return this;
};
/**
 * Remove a callback from the call stack
 *
 * @param {String} namespace
 * @return {Object}
 */
CallStack.prototype.delete = function(namespace) {
    //Remove the callback
    delete this.stack[namespace];
    //End
    return this;
};
/**
 * Reverse call stack execution
 *
 * @return {Object}
 */
CallStack.prototype.reverse = function() {
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
CallStack.prototype.restore = function() {
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
CallStack.prototype.run = function() {
    //If no order is defined
    if (this.order == null) {
        //Execute each function stored in the stack
        $.each(this.stack, function(i,e){
            this._execute(i);
        }.bind(this));
    }
    //If an order is defined
    else {
        //If we should execute the stack from the end
        if (this.reversed) {
            for(var i=this.order.length - 1; i >= 0; i--) {
                this._execute(this.order[i]);
            }
        }
        //We execute the stack using the order
        else {
            for(var i=0; i < this.order.length; i++) {
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
 * @param {String} namespace
 * @return {Object}
 */
CallStack.prototype._execute = function(namespace) {
    //Check if the function exsits
    if (typeof this.stack[namespace] == "function") {
        //Debug logging
        if (this.debug)
            console.log('[CallStack] Will execute ' + namespace);
        //Pre callback
        this.willExecute(namespace);
        //Execute function
        this.stack[namespace]();
        //After callback
        this.didExecute(namespace);
        //Debug logging
        if (this.debug)
            console.log('[CallStack] Did execute ' + namespace);
    }
    //End
    return this;
};