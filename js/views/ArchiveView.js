var ArchiveView = function(store) {
    var that = this;
    that.initialize = function() {
    	that.el = $('#container');        
    };

    that.render = function() {    	
        this.el.html(ArchiveView.template());
        $('.archive-list').html(ArchiveView.liTemplate(store.archive));
        return this;
    };
 
	this.findByName = function() {
	    store.findByName($('.search-key').val(), function(archiveItem) {
	        $('.archive-list').html(ArchiveView.liTemplate(archiveItem));
	    });
	};
 
    that.initialize();
}
ArchiveView.template = Handlebars.compile($("#archive-tpl").html());
ArchiveView.liTemplate = Handlebars.compile($("#archive-li-tpl").html());