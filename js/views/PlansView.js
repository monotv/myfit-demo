var PlansView = function(store) {
    var that = this;
    that.initialize = function() {
    	that.el = $('#container');        
    };

    that.render = function() {    	
        this.el.html(PlansView.template());
        $('.plans-list').html(PlansView.liTemplate(store.plans));
        return this;
    };
 
	this.findByName = function() {
	    store.findByName($('.search-key').val(), function(plans) {
	        $('.plans-list').html(PlansView.liTemplate(plans));
	    });
	};
 
    that.initialize();
}
PlansView.template = Handlebars.compile($("#plans-tpl").html());
PlansView.liTemplate = Handlebars.compile($("#plans-li-tpl").html());