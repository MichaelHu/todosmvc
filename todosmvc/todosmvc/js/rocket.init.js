(function($) {

$.extend(rocket, {
    init: function() {
        // loading object
        rocket.$globalLoading = $('#wrapper .global-loading');
        rocket.$pageLoading = $('#wrapper .page-loading');

        new rocket.router.todosmvc();
        Backbone.history.start();
    }

});

})(Zepto);    


