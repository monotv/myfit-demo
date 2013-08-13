var HomeView = function(store) {
    var that = this;
    that.initialize = function() {
        this.el = $('<div id="container"></div>');      
    };

    that.render = function() {
        this.el.html(HomeView.template()); 
        return this;        
    };

    that.initialize();
}
HomeView.template = Handlebars.compile($("#home-tpl").html());