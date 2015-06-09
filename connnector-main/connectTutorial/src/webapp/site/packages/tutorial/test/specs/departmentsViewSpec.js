define(['../../src/js/views/departmentsView', 'core'], function(DepartmentsView, Core) {
    "use strict";

    describe('Departments View', function() {
        var departmentsView;
        var mockDepartmentCollection;
        var mockLocation;
        var mockSession;
        beforeEach(function() {
            mockDepartmentCollection = {
                length: 1,
                models: [{
                    get: sinon.stub().returns('data')
                }],
                fetch: function(options) {
                    options.success()
                }
            };
            mockLocation = {
                navigate: sinon.spy()
            };
            mockSession = {
                isActive: sinon.stub().returns(false)
            };
            Core.Events.enableFor(mockSession);

            departmentsView = new DepartmentsView({
                location: mockLocation,
                session: mockSession
            });
            departmentsView.departmentCollection = mockDepartmentCollection;
        });

        describe('initialize', function() {
            beforeEach(function() {
                sinon.stub(departmentsView, 'loadData');
            });

            it('should call loadData upon session activation', function() {
                mockSession.trigger('begin');
                expect(departmentsView.loadData.calledOnce).toBeTruthy();
            });

            it('should call loadData if session is already active', function() {
                mockSession.isActive = function() { return true; };
                departmentsView.initialize({
                    location: mockLocation,
                    session: mockSession
                });
                expect(departmentsView.loadData.calledOnce).toBeTruthy();
            });
        });

        describe('render', function() {
            it('should render a template into its $element', function() {
                departmentsView.render();
                expect(departmentsView.$('#departments-list').length).toBe(1);
            });

            it('should call location.navigate upon change:selection event', function() {
                departmentsView.render();
                sinon.stub(departmentsView.departmentList, 'getSelected', function() {
                    return [{
                        sourceItem: {
                            model: {
                                id: 9876
                            }
                        }
                    }];
                });
                departmentsView.departmentList.trigger('change:selection');
                expect(mockLocation.navigate.calledWith('employees/department/9876')).toBeTruthy();
            });
        });
    });
});