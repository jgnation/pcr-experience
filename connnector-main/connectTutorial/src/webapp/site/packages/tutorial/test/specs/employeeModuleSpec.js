define(['../../src/js/employeeModule', 'jquery'], function(EmployeeModule, $) {
    "use strict";

    describe('Employee Module', function() {
        var employeeModule;
        var mockMainView;
        beforeEach(function() {
            mockMainView = {
                showDepartment: sinon.spy(),
                $element: $('<div>mock</div>'),
                render: sinon.stub().returns(mockMainView)
            };

            employeeModule = new EmployeeModule();
            employeeModule.mainView = mockMainView;
        });

        it('has path, icon, and routes properties', function() {
            expect(employeeModule.path).toBe('employees');
            expect(employeeModule.icon).toBeDefined();
            expect(employeeModule.routes).toBeDefined();
        });

        it('should call mainView.showDepartment(null) when home is called', function() {
            employeeModule.home();
            expect(mockMainView.showDepartment.calledWith(null)).toBeTruthy();
        });

        it('should call mainView.showDepartment(id) when showDepartment is called', function() {
            employeeModule.showDepartment(1234);
            expect(mockMainView.showDepartment.calledWith(1234)).toBeTruthy();
        });
    });
});