define(['core', '../../src/js/deptController'], function(Core, DeptController) {
    'use strict';

    describe('DeptController', function() {
        var deptController, mockDeptCollection, mockLogger, mockLocation;

        beforeEach(function () {
            mockDeptCollection = {
                fetch: sinon.stub(),
                get: sinon.stub().returns(1),
                length: 1
            };

            mockLogger = {
                log: sinon.stub()
            };

            mockLocation = {
                navigate: sinon.stub()
            };

            deptController = new DeptController({
                deptCollection: mockDeptCollection,
                logger: mockLogger,
                location: mockLocation
            });
        });

        it('has no selected dept by default', function () {
            expect(deptController.selectedDept).toBe(null);
        });

        describe('loadDepts', function () {
            it('calls fetch on the collection', function () {
                deptController.loadDepts();
                expect(mockDeptCollection.fetch.callCount).toEqual(1);
            });
        });

        describe('selectDept', function () {
            it('works with a string', function () {
                deptController.trigger = sinon.stub();

                deptController.selectDept('dept');
                expect(deptController.selectedDept).toEqual(1);
                expect(mockDeptCollection.get.callCount).toEqual(1);
                expect(mockLogger.log.callCount).toEqual(1);
                expect(mockLocation.navigate.callCount).toEqual(1);
                expect(deptController.trigger.callCount).toEqual(1);
            });

            it('works with a number', function () {
                deptController.trigger = sinon.stub();

                deptController.selectDept(2);
                expect(deptController.selectedDept).toEqual(2);
                expect(mockLogger.log.callCount).toEqual(1);
                expect(mockLocation.navigate.callCount).toEqual(1);
                expect(deptController.trigger.callCount).toEqual(1);
            });
        });
    });
});
