var ExercisesView = function(store) {
    var that = this;
    this.initialize = function() {
    	this.el = $('<div id="container" />');
    };

    this.render = function() {    	
        this.el.html(ExercisesView.template());
        this.el.find('.exercises-list').html(ExercisesView.liTemplate(store.getItems("exercises")));
        return this;
    };
 
	this.findByName = function() {
	    store.findByName($('.search-key').val(), function(plans) {
	        $('.exercises-list').html(PlansView.liTemplate(plans));
	    });
	};
 
    this.initialize();
}
ExercisesView.template = Handlebars.compile($("#exercises-tpl").html());
ExercisesView.liTemplate = Handlebars.compile($("#exercises-li-tpl").html());