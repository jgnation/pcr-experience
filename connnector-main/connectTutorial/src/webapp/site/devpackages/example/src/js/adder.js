// The purpose of this file is to give a sample of exporting an API.
// See exports.js to see how to export the API.
define([], function() {
    'use strict';

    function Adder() {}

    // This function will not be exported in exports.js
    Adder.prototype.displayResult = function(result) {
        alert('Beep Bloop Beep the result is ' + result);
    };

    // This function will be exported in exports.js
    Adder.prototype.compute = function(a, b) {
        var result = a + b;
        this.displayResult(result);
    };

    return Adder;
});