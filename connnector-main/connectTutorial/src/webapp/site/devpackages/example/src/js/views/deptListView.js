define(['underscore', 'core', 'template!../../content/deptListView'], function (_, Core, DeptListViewTemplate) {
    'use strict';

    return Core.View.extend({
        selectedDept: null,
        domEvents: {
            'click a': 'onDeptClicked'
        },
        initialize: function (options) {
            _.bindAll(this);
            this.collection = options.collection;
            this.listenTo(this.collection, 'sync', this.render);
        },
        onDeptClicked: function(e) {
            e.preventDefault();
            var deptId = this.$(e.currentTarget).data('deptid');
            this.selectDept(this.collection.get(deptId));
        },
        selectDept: function (dept) {
            if(dept === this.selectedDept) return;

            this.selectedDept = dept;
            this.highlightSelectedView();

            this.trigger('change:selectedDept', dept);
        },
        highlightSelectedView: function() {
            this.$('.selected').removeClass('selected');
            if (this.selectedDept) {
                this.$('[data-deptid=' + this.selectedDept.id + ']').addClass('selected');
            }
        },
        render: function () {
            DeptListViewTemplate.renderToView(this, this.collection.toJSON());
            this.highlightSelectedView();
            return this;
        }
    });
});
