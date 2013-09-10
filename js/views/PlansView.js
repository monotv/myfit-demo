var PlansView = function(store) {
    var that = this;
    this.initialize = function() {
    	this.el = $('<div id="container" />');
    };

    this.render = function() {    	
        this.el.html(PlansView.template());
        console.log(store.getItems("plans"))
        this.el.find('.plans-list').html(PlansView.liTemplate(store.getItems("plans")));
        return this;
    };
 
	this.findByName = function() {
	    store.findByName($('.search-key').val(), function(plans) {
	        $('.plans-list').html(PlansView.liTemplate(plans));
	    });
	};
 
    this.initialize();
}
PlansView.template = Handlebars.compile($("#plans-tpl").html());
PlansView.liTemplate = Handlebars.compile($("#plans-li-tpl").html());