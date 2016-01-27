/**
 * Log function
 *
 * @param function
 */
displayLog = function(text) {
    $('.results').append('<div>'+text+'</div>');
    console.log(text);
};
/**
 * Run the tests
 */
runTests = function() {
    //Init call stack
    var cs = new djs.CallStack();
    cs.add('cs-1', function() { displayLog('Calling : cs-1'); });
    cs.add('cs-4', function() { displayLog('Calling : cs-4'); });
    cs.add('cs-3', function() { displayLog('Calling : cs-3'); });
    cs.add('cs-2', function() { displayLog('Calling : cs-2'); });

    displayLog('====== Unordered ======');
    cs.run();

    displayLog('====== Ordered ======');
    cs.order = ['cs-1', 'cs-2', 'cs-3', 'cs-4', 'cs-5'];
    cs.run();

    displayLog('====== Reversed ======');
    cs.reverse().run();

    displayLog('====== Restore & delete ======');
    cs.restore().delete('cs-3').run();
};
/**
 * Auto ruun test
 */
$(document).ready(function () {
    runTests();
});