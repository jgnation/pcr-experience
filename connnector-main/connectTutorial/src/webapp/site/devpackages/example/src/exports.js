define(['core', './js/exampleModule', './js/adder','./basicConnection'], function (Core, ExampleModule, Adder, BasicConnection) {
    'use strict';

    var exports = {
        ExampleModule: ExampleModule, //All modules must be exported. Add to config.json via example:Module
        Adder: Core.TypeWrapper.wrap(Adder, {
            methods: ['compute']
        })
    , BasicConnection:BasicConnection};

    return exports;
});
