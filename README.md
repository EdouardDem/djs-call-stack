# djs-call-stack

This is a JavaScript library to manage ordered callback sets.
The usage is simple, you push callbacks, define an order, and call the stack when you need.
When you call the stack, the callbacks will be called in compliance with the order.
It doesn't matters when you push the callbacks, as long as you define the order before calling the stack.
This class is "chainable".

## Installation

Installation with bower :

```
bower install djs-call-stack
```

## Usage

### Adding callbacks

```javascript
// Create a new object
var cs = new djs.CallStack();

// Add a callback
cs.add('callback-1', function() {
    console.log('Callback 1');
});

// Add another callback
cs.add('callback-2', function() {
    console.log('Callback 2');
});
```

### Setting the order

```javascript
cs.order = ['callback-2', 'callback-1'];
```

The stack will execute `callback-2` and the `callback-1`.

### Execute the stack

```javascript
cs.run();
```

### Reverse & execute the stack

```javascript
cs.reverse().run();
```

### Restore the order of the stack

```javascript
cs.restore();
```

### Delete a registered callback

```javascript
cs.delete('callback-1');
```

Then, it will execute only `callback-2`.
