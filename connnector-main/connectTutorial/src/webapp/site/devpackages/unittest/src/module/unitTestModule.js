define(['core', 'require', '../testRunner'], function(Core, req, TestRunner) {
    'use strict';

    var UnitTestModule = Core.Module.extend({
        path: 'unitTest',

        routes: {
            '': function() {
                this.$element.html('<iframe style="display:block; width:100%; height:100%" src="packages/unittest/index.html"></iframe>');
            }
        },

        icon: {
            image32: req.toUrl('packages/sample/src/sample/content/icons/sample_32.png'),
            text: 'Sample Module'
        },

        connected: function() {
//            TestRunner();
        }
    });

    return UnitTestModule;
});
