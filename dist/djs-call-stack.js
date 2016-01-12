/**
 * Cette classe permet de gérer une pile d'appel ordonné
 * Cette classe est chainable
 */
function CallStack() {
    //Variables
    this.reversed = false;
    this.order = null; //Array, contient les namespace dans l'ordre
    this.stack = {};
    this.debug = false;
    //Callbacks
    this.willExecute = function(namespace) {};
    this.didExecute = function(namespace) {};
};

//------------------------------------------------------------------------------
//	MEHTODS
//------------------------------------------------------------------------------
/**
 * Ajoute un callback à la liste d'appel
 *
 * @param {String} namespace
 * @param {Function} callback
 * @return {Object}
 */
CallStack.prototype.add = function(namespace, callback) {
    //Ajoute le callback
    this.stack[namespace] = callback;
    //Fin
    return this;
}
/**
 * Supprime un callback de la liste d'appel
 *
 * @param {String} namespace
 * @return {Object}
 */
CallStack.prototype.delete = function(namespace) {
    //Supprime le callback
    delete this.stack[namespace];
    //Fin
    return this;
}
/**
 * Inverse l'ordre d'appel
 *
 * @return {Object}
 */
CallStack.prototype.reverse = function() {
    //Reverse
    this.reversed = true;
    //Fin
    return this;
};
/**
 * Rétabli l'ordre d'appel
 *
 * @return {Object}
 */
CallStack.prototype.restore = function() {
    //Reverse
    this.reversed = false;
    //Fin
    return this;
};
/**
 * Execute the whole stack
 *
 * @return {Object}
 */
CallStack.prototype.run = function() {
    //If an order is defined
    if (this.order == null) {
        //Execute each function stroed in the stack
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