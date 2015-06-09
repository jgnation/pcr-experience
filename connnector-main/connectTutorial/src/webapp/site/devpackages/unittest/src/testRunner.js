/* global jasmine, jasmineRequire, blanket */
define(['require', './executeJasmine'], function (req, executeJasmine) {
    'use strict';

    var coverage = (document.location.search === '?coverage');
    var phantom = navigator.userAgent.indexOf('PhantomJS') > -1;

    function load(deps) {
        return new Promise(function(resolve, reject) {
            req(deps, function() { resolve(arguments.length === 1 ? arguments[0] : [].slice.call(arguments)); }, reject);
        });
    }

    function spread(fn) {
        return function(result) {
            return fn.apply(null, result);
        };
    }

    function ajax(url) {
        return new Promise(function(resolve) {
            var x = new XMLHttpRequest();
            x.open('GET', url);
            x.onload = function() { resolve(x.responseText); };
            x.send()
        });
    };

    function bootstrap() {
        window.isTestRun = true; // TypeWrapper hack
        return load(['requireConfig', 'packages/core/core']);
    }

    function loadSpecLists() {
        return ajax(req.toUrl('../../../config.json'))
        .then(function(config) {
            config = JSON.parse(config);
            if(config.unittest && config.unittest.tests) {
                return config.unittest.tests;
            }
            else {
                return ajax(req.toUrl('../tests.json'))
                         .then(function(tests) {
                            var specLists = eval(tests);
                            return specLists;
                         });
            }
        }); 
    }

    function parsePackages(specLists) {
        var packages = {};
        specLists.forEach(function(s) {
            var packageName = s.match(/packages\/(.*?)\//);
            if (!packageName) throw 'Could not load ' + s + '. Please use form "packages/<package name>/path/to/specs/list"';

            packageName = packageName[1];
            packages[packageName] = {
                path: 'packages/' + packageName + '/'
            };
        });

        return packages;
    }

    function createApp(App, specLists) {
        return new Promise(function(resolve) {
            new App({
                packages: parsePackages(specLists),
                config: {
                    shell: 'none',
                    loggingMethod: 'console',
                    loggingLevel: 'INFO'
                },
                onPackagesLoaded: function () {
                    resolve();
                }
            });
        });
    }

    function configureBlanket(specLists) {
        if (typeof (blanket) !== 'undefined') {
            var regex = specLists.map(function (s) {
                return s.match(/(.*\/)test\//)[1];
            }).join('|');

            blanket.options({
                filter: new RegExp(regex)
            });
        }
    }

    function loadDeps() {
        return Promise.all([
            loadSpecLists(),
            load(['./testLibLoader','packages/core/src/lib/less'])
        ])
        .then(spread(function(specLists, deps) {
            //Resolve the promise with a single array that contains specLists and the require results
            return [specLists].concat(deps);
        }));
    }

    return function() {

        bootstrap().then(loadDeps)
        .then(spread(function(specLists, LibLoader) {
            return new LibLoader(coverage, !phantom)
            .then(function() { configureBlanket(specLists); })
            .then(function() { return load(['packages/core/src/app']); })
            .then(function(App) { return createApp(App, specLists); })
            .then(function() { return load(specLists); })
            .then(function() { executeJasmine({isBrowser: !phantom}); })
        }));

    };
});
