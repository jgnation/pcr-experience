define(['core', 'underscore', 'template!../../content/deptView', 'controls'], function (Core, _, DeptViewTemplate, Controls) {
    'use strict';

    return Core.View.extend({
        initialize: function() {
            _.bindAll(this);
        },
        render: function (dept) {
            DeptViewTemplate.renderToView(this);
            if(!dept) return this;

            function dateFormatter(cellValue) {
                return Core.Dates.format(new Date(cellValue), { date: "long" });
            }

            function numberFormatter(cellValue) {
                return Core.Numbers.format(cellValue);
            }

            var columns = [
                { name: Core.Strings.translate('example.users.information.name'), propertyName: 'name' },
                { name: Core.Strings.translate('example.users.information.id'), propertyName: 'id' },
                { name: Core.Strings.translate('example.users.information.started'), propertyName: 'started', createCellContent: dateFormatter },
                { name: Core.Strings.translate('example.users.information.hours'), propertyName: 'hours', createCellContent: numberFormatter },
            ];

            var rows = [];
            _.each(dept.get('employees'), function(employee) {
                rows.push({
                    'id': employee.id,
                    'name': employee.name,
                    'started': employee.started,
                    'hours': employee.hours
                });
            });

            var grid = new Controls.Grid(this.$('#deptList'), columns, rows);
            grid.onLoaded(function () {
                for (var i = 0; i < columns.length; i++) {
                    grid.resizeColumnToFit(i);
                }
            });

            return this;
        }
    });
});
