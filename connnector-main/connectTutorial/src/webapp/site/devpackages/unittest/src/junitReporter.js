/* globals jasmine */
define([], function() {
    'use strict';

    function JunitReporter() {
        var output = [];

        function xmlEncode(str) {
            if (!str) return '';
            return str.replace(/</g, "&lt;")
                .replace(/\>/g, "&gt;")
                .replace(/\"/g, "&quot;")
                .replace(/\'/g, "&apos;")
                .replace(/\&/g, "&amp;");
        }

        function serializeSuite(suite) {
            if (!suite.children) return;

            var result = suite.result;
            var specs = suite.children.filter(function(child) { return child instanceof jasmine.Spec; });
            var suites = suite.children.filter(function(child) { return child instanceof jasmine.Suite; });

            if (specs.length) {
                output.push(['  <testsuite name="', xmlEncode(result.fullName), '" ',
                                  'time="', ((result.endTime-result.startTime)/1000)||0, '" ',
                                  'tests="', specs.length, '" ',
                                  'errors="0" ',
                                  'failures="', specs.filter(function(s) { return s.result.status === 'failed'; }).length, '" ',
                                  'timestamp="', new Date().toISOString(), '">'].join(''));
            }

            specs.forEach(function(spec) {
                serializeSpec(spec);
            });

            if (specs.length) {
                output.push('  </testsuite>');
            }

            suites.forEach(function(childSuite) {
                serializeSuite(childSuite);
            });

        }

        function serializeSpec(spec) {
            var result = spec.result;
            var s = ['    <testcase name="', xmlEncode(result.fullName), '" time="', ((result.endTime-result.startTime)/1000)||0, '"'];

            if (result.status === 'passed') {
                s.push(' />');
            }
            else if (!result.status || result.status === 'pending') { //!result.status is when using xdescribe
                s.push('>\n      <skipped />\n    </testcase>');
            }
            else if (result.status === 'failed') {
                var exception = (result.failedExpectations && result.failedExpectations[0]) || {};
                s.push('>\n',
                    '      <failure>\n', xmlEncode(exception.stack || exception.message).replace(/^\s*/gm, '        '), '</failure>\n',
                    '    </testcase>');
            }

            output.push(s.join(''));
        }

        this.jasmineDone = function () {
            output.push('<testsuites>');
            serializeSuite(jasmine.getEnv().topSuite());
            output.push('</testsuites>');

            this.output = output.join('\n');
        };

        this.suiteStarted = function (result) {
            result.startTime = new Date().getTime();
        };

        this.suiteDone = function (result) {
            result.endTime = new Date().getTime();
        };

        this.specStarted = function (result) {
            result.startTime = new Date().getTime();
        };

        this.specDone = function (result) {
            result.endTime = new Date().getTime();
        };
    }

    return JunitReporter;
});
