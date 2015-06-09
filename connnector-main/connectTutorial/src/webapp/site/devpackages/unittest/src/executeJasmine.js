define(function () {
    'use strict';

    return function(options) {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 500;

        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;

        var defaultHtmlReporter = jasmineRequire.defaultHtmlReporter;
        var done = defaultHtmlReporter.jasmineDone;
        defaultHtmlReporter.jasmineDone = function() {
            var defaultReturn = done.apply(this, arguments);
            [].forEach.call(document.getElementsByClassName('stack-trace'), function(e) {
                var original = e.innerText.replace(/(\w+?Spec\.js:\d+)/g, "<span class='filename'>$1</span>").trim();
                e.innerHTML = original.replace(/^.+?jasmine\.js.*(\n|$)/mg, "").trim();
                var element = document.createElement('a');
                element.innerText = ' [full stack]'; 
                element.href = "#";
                element.addEventListener("click", function() {e.innerHTML = original;});
                e.appendChild(element);
            });
            return defaultReturn;
        };

        var reporter = options.isBrowser? jasmineRequire.defaultHtmlReporter : new jasmine.JUnitReporter();
        jasmineRequire.reporter = reporter;
        jasmineEnv.addReporter(reporter);

        if (reporter.initialize) reporter.initialize();

        if (window.blanket) {
            blanket.readyToRunTests();
            jasmineEnv.addReporter(new jasmine.BlanketReporter());
        }

        jasmineEnv.execute();
    };
});

