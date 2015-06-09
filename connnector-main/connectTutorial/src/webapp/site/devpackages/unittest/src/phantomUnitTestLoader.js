// This file loads the index.html page into phantomjs
/* globals phantom, jasmineRequire */
(function() {
    'use strict';

    var system = require('system');
    var fs = require('fs');

    var args = {};
    for (var i = 1; i < system.args.length; i++) {
        var pair = system.args[i].split('=');
        args[pair[0]] = pair[1] || null;
    }

    args.timelimit = args.timelimit || 10;

    fs.changeWorkingDirectory(phantom.libraryPath.replace(/src$/, ''));

    phantom.onError = function(msg, trace) {
        // http://phantomjs.org/api/phantom/handler/on-error.html
        console.error('Phantom Error: ' + msg);
        phantom.exit(1);
    };

    var page = require('webpage').create();
    page.onError = function(msg, trace) {
        console.error('Page Error: ' + msg);
        phantom.exit(1);
    };
    page.open('index.html', function(status) {
        // break out of page.open or throwing will hang the process
        setTimeout(function() {
            if (status !== 'success') throw 'Could not load test page';

            var checkCounter = 0;
            var timer = setInterval(function() {
                if (checkCounter++ > args.timelimit) throw 'Tests timed out';
                var output = page.evaluate(function(){ return jasmineRequire.reporter && jasmineRequire.reporter.output; });
                if (!output) return;

                clearInterval(timer);
                console.log('Testing complete.');
                fs.write('testResults.xml', output, 'w');
                phantom.exit(output.indexOf('<failure') === -1? 0: 1);
            }, 1000);
        }, 1);
    });
})();
