define([
    'core',
    './views/mainView',
    './deptController'
],
    function (Core, MainView, DeptController) {
        'use strict';

        return Core.Module.extend({
            controller: null,
            mainView: null,

            path: 'example', //Todo: Make sure this is correct, all of your routes will be prefixed with this value

            icon: {
                className: 'icon-FPO_circle_filled',
                text: Core.Strings.translate('example.title')
            },

            routes: {
                '': function () {
                    Core.Location.navigate(this.path + '/depts', { replace: true });
                },
                'depts': 'loadDepts',
                'depts/:id': 'loadDept'
            },

            connected: function () {
                this.controller = this.controller || new DeptController();
                this.mainView = new MainView({controller: this.controller});
                this.$element.html(this.mainView.render().$element);
            },

            loadDepts: function() {
                //Add code here for the /exampleModule/depts URL route
            },
            loadDept: function(deptId) {
                this.controller.selectDept(deptId);
            }
        });
    }
);
