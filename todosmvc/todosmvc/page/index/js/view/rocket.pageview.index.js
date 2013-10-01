(function($){

rocket.pageview.index = rocket.pageview.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#index_page'

    // Our template for the line of statistics at the bottom of the app.
    ,statsTemplate: _.template($('#stats-template').html())

    // Delegated events for creating new items, and clearing completed ones.
    ,events: {
      "keypress #new-todo":  "createOnEnter",
      "click #clear-completed": "clearCompleted",
      "click #toggle-all": "toggleAllComplete"
    }

    ,init: function(options){
        var me = this;

        me.input = me.$("#new-todo");
        me.allCheckbox = me.$("#toggle-all")[0];

        me.footer = me.$('footer');
        me.main = $('#main');

        me.collection = new rocket.collection.todolist(
            []
            ,{
                model: rocket.model.todo
            }
        );

        console.log(me.collection.model);

        me.hideLoading(-1);
    }

    ,registerEvents: function(){
        var me = this,
            ec = me.ec,
            keydownLocking = false;

        me.listenTo(me.collection, 'add', me.addOne);
        me.listenTo(me.collection, 'reset', me.addAll);
        me.listenTo(me.collection, 'all', me.render);
    }

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    ,render: function() {
        var me = this,
            todos = me.collection,
            done = todos.done().length,
            remaining = todos.remaining().length;

        if (me.collection.length) {
            me.main.show();
            me.footer.show();
            me.footer.html(
                me.statsTemplate({
                    done: done
                    ,remaining: remaining
                })
            );
        } else {
            me.main.hide();
            me.footer.hide();
        }

        me.allCheckbox.checked = !remaining;
    }

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    ,addOne: function(todo) {
        var me = this,
            view = new rocket.subview.todo({model: todo}, me);

        me.$("#todo-list").append(view.render().el);
    }

    // Add all items in the **Todos** collection at once.
    ,addAll: function() {
        var me = this;

        me.collection.each(me.addOne, me);
    }

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    ,createOnEnter: function(e) {
        var me = this,
            todos = me.collection;

        if (e.keyCode != 13) return;
        if (!me.input.val()) return;

        console.log(todos);

        todos.create({title: me.input.val()});
        me.input.val('');
    }

    // Clear all done todo items, destroying their models.
    ,clearCompleted: function() {
        _.invoke(this.collection.done(), 'destroy');
        return false;
    }

    ,toggleAllComplete: function () {
        var done = this.allCheckbox.checked;

        this.collection.each(function (todo) { 
            todo.save({'done': done}); 
        });
    }

});

})(Zepto);

