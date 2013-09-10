var PlansDetailsView = function(store) {
    var that = this;
    this.initialize = function() {
        this.el = $('<div id="container" />');
        //this.serializeArray();
        this.el.on('click', '.save', function(e){
            var data = $(this).parents('form').serializeArray();
            console.log(data)
            that.addPlan(data, e);
        });
    };

    this.render = function() {
        var that = this;
        var id = window.location.hash.split("/")[1];
        store.findById(id, "plans", function(plan){
        	that.el.html(PlansDetailsView.template({id: id, name: plan.name}));
        	if(plan.exercises){
        		$('.exercises-list').empty();
        		console.log(plan.exercises)
        		that.el.find('.exercises-list').html(PlansDetailsView.addedLiTemplate(plan.exercises));
        	}
        });
        return this;
    };

	this.findByName = function() {
	    store.findByName($('.search-key').val(), function(plans) {
	        $('.plans-list').html(PlansView.liTemplate(plans));
	    });
	};

    this.initialize();
}

PlansDetailsView.template = Handlebars.compile($("#plans-details-tpl").html());
PlansDetailsView.addedLiTemplate = Handlebars.compile($("#plans-add-exercises-added-li-tpl").html());
PlansDetailsView.addLiTemplate = Handlebars.compile($("#plans-add-exercises-li-tpl").html());