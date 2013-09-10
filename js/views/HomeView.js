var HomeView = function(store) {
    var that = this;
    this.initialize = function() {
        this.el = $('<div id="container" />');
    };

    this.render = function() {
        this.el.html(HomeView.template()); 
        return this;        
    };

    this.initialize();
}
HomeView.template = Handlebars.compile($("#home-tpl").html());