/* globals blanket */
define(['require'], function (req) {
    'use strict';

    return function (coverage, isBrowser) {
        define('-jasmine', function () {
            return new Promise(function (resolve) {
                req(['../lib/jasmine-2.0.0/jasmine'], resolve);
            });
        });

        define('-jasmine-boot', ['-jasmine', '-jasmine-html'], function (Jasmine, JasmineHtml) {
            return new Promise(function (resolve) {
                Promise.all([Jasmine, JasmineHtml]).then(function () {
                    req(['../lib/jasmine-2.0.0/boot'], resolve);
                });
            });
        });

        define('-jasmine-html', ['-jasmine'], function (Jasmine) {
            return new Promise(function (resolve) {
                Jasmine.then(function () {
                    req(['../lib/jasmine-2.0.0/jasmine-html'], resolve);
                });
            });
        });

        define('-jasmine-junit', ['-jasmine', '-jasmine-boot'], function (Jasmine, JasmineBoot) {
            if (isBrowser) return Promise.resolve();

            return new Promise(function(resolve) {
                Promise.all([Jasmine, JasmineBoot]).then(function () {
                    Jasmine.then(function () {
                        req(['./junitReporter'], function(JunitReporter) {
                            window.jasmine.JUnitReporter = JunitReporter;
                            resolve();
                        });
                    });
                });
            });
        });

        define('-sinon', function () {
            return new Promise(function (resolve) {
                req(['../lib/sinon-1.9.0'], resolve);
            });
        });

        define('-blanket', function () {
            if (!coverage) return Promise.resolve();

            return new Promise(function (resolve) {
                req(['../lib/blanket'], function () {
                    blanket.options({
                        antifilter: /\b(core\/core|requireConfig|lib|test|spec|mocks)\b/
                    });
                    resolve();
                });
            });
        });

        define('-jasmine-jquery', ['-jasmine', '-jasmine-boot', 'jquery'], function (Jasmine, JasmineBoot) {
            return new Promise(function (resolve) {
                Promise.all([Jasmine, JasmineBoot]).then(function () {
                    req(['../lib/jasmine-jquery'], resolve);
                });
            });
        });

        define('-jasmine-blanket', ['-jasmine', '-jasmine-boot', '-blanket', '-jasmine-html'], function (Jasmine, JasmineBoot, Blanket, JasmineHtml) {
            if (!coverage) return Promise.resolve();

            return new Promise(function (resolve) {
                Promise.all([Jasmine, JasmineBoot, Blanket, JasmineHtml]).then(function () {
                    req(['../lib/jasmine-blanket'], resolve);
                });
            });
        });

        return new Promise(function (resolve) {
            require(['-jasmine-blanket', '-jasmine-jquery', '-jasmine-html', '-jasmine-junit', '-sinon'], function (JasmineBlanket, JasmineHtml, Sinon) {
                Promise.all([JasmineBlanket, JasmineHtml, Sinon]).then(resolve);
            });
        });
    };
});
