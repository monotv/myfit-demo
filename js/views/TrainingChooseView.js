var TrainingChooseView = function(store) {
    var that = this;
    this.initialize = function() {
    	this.el = $('<div id="container" />');
    };

    this.render = function() {    	
        this.el.html(TrainingChooseView.template());
        console.log(store.getItems("plans"))
        this.el.find('.plans-list').html(TrainingChooseView.liTemplate(store.getItems("plans")));
        return this;
    };
 
	this.findByName = function() {
	    store.findByName($('.search-key').val(), function(plans) {
	        $('.plans-list').html(TrainingChooseView.liTemplate(plans));
	    });
	};
 
    this.initialize();
}
TrainingChooseView.template = Handlebars.compile($("#training-choose-tpl").html());
TrainingChooseView.liTemplate = Handlebars.compile($("#training-choose-li-tpl").html());