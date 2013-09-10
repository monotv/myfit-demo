var TrainingView = function(store) {
    var that = this;
    this.initialize = function() {
        this.el = $('<div id="container" />');    
    };

    this.render = function() {
        this.el.html(TrainingView.template()); 
        return this;
    };

    this.initialize();
}
TrainingView.template = Handlebars.compile($("#training-tpl").html());