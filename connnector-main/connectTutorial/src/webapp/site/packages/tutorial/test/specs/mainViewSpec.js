define(['../../src/js/views/mainView', 'jquery'], function(MainView, $) {
    "use strict";

    describe('Main View', function() {
        var mainView;
        var mockDepartmentsView;
        var mockEmployeesView;
        beforeEach(function() {
            mockDepartmentsView = function() {};
            mockDepartmentsView.$element = $('<div>departments!</div>');
            mockDepartmentsView.render = sinon.stub().returns(mockDepartmentsView);

            mockEmployeesView = function() {};
            mockEmployeesView.$element = $('<div>employees!</div>');
            mockEmployeesView.render = sinon.stub().returns(mockEmployeesView);

            mainView = new MainView();
            mainView.departmentsView = mockDepartmentsView;
            mainView.employeesView = mockEmployeesView;
        });

        describe('render', function() {
            it('should render a template into its $element', function() {
                mainView.render();
                expect(mainView.$element.attr('id')).toBe('employees-main-view');
            });

            it('should render contents of departmentsView and employeesView', function() {
                mainView.render();
                expect(mainView.$('#departments-view').text()).toBe(mockDepartmentsView.$element.text());
                expect(mainView.$('#employees-view').text()).toBe(mockEmployeesView.$element.text());
            });

            it('should return itself', function() {
                var returns = mainView.render();
                expect(returns).toBe(mainView);
            });
        });

        it('should call render() on employeesView when showDepartment() is called', function() {
            mainView.showDepartment(1234);
            expect(mockEmployeesView.render.calledWith(1234)).toBeTruthy();
        });
    });
});