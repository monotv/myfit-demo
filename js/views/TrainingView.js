var TrainingView = function(store) {
    var that = this;
    that.initialize = function() {
        this.el = $('<div id="container"></div>');      
    };

    that.render = function() {
        this.el.html(TrainingView.template()); 
        return this;
    };

    that.initialize();
}
TrainingView.template = Handlebars.compile($("#training-tpl").html());