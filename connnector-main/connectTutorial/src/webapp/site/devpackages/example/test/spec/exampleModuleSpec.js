define(['core', '../../src/js/exampleModule'], function(Core, ExampleModule) {
    'use strict';

    describe('ExampleModule', function() {
        var module = null;

        beforeEach(function() {
            module = new ExampleModule();
        });

        it('defines a path', function() {
            expect(module.path).toBe('example');
        });

        describe('routes', function() {
            //todo: test your route handlers
        });

        describe('connected', function() {
            it("sets the element content", function() {
                module.connected();
                expect(module.$element).not.toBeEmpty();
            });
        });

        describe('icon', function() {
            it('defines className', function() {
                expect(module.icon.className).not.toBeNull();
            });

            it('sets the text', function() {
                expect(module.icon.text).toBe(Core.Strings.translate('example.title'));
            });
        });
    });
});
