define(['core', 'template!../../content/departmentsView', '../models/departmentCollection', 'controls'],
        function(Core, DepartmentsViewTemplate, DepartmentCollection, Controls) {
    "use strict";

    return Core.View.extend({
        initialize: function(options) {
            this.departmentCollection = new DepartmentCollection();
            this.session = options.session || Core.App.session;
            this.location = options.location || Core.Location;

            if (this.session.isActive()) {
                this.loadData();
            } else {
                this.session.on('begin', function() {
                    this.loadData();
                }.bind(this));
            }
        },

        loadData: function() {
            this.departmentCollection.fetch({
                success: this.render.bind(this),
                error: function() {
                    alert('An error occurred loading departments.');
                }
            });
        },

        render: function() {
            DepartmentsViewTemplate.renderToView(this);

            if (this.departmentCollection.length > 0) {
                var listItems = [];
                this.departmentCollection.models.forEach(function(departmentModel) {
                    listItems.push({
                        name: departmentModel.get('name'),
                        model: departmentModel
                    });
                });

                this.departmentList = new Controls.List(this.$('#departments-list')[0], listItems, {useMultiSelection: false});
                this.departmentList.on('change:selection', function() {
                    var selectedItem = this.departmentList.getSelected();
                    if (selectedItem.length > 0) {
                        this.location.navigate('employees/department/' + selectedItem[0].sourceItem.model.id, {trigger: true});
                    }
                }.bind(this));
            }

            return this;
        }
    });
});