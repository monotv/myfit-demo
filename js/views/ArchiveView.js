var ArchiveView = function(store) {
    var that = this;
    this.initialize = function() {
    	this.el = $('<div id="container" />'); 
    };

    this.render = function() {    	
        this.el.html(ArchiveView.template());
        $('.archive-list').html(ArchiveView.liTemplate(store.archive));
        return this;
    };
 
	this.findByName = function() {
	    store.findByName($('.search-key').val(), function(archiveItem) {
	        $('.archive-list').html(ArchiveView.liTemplate(archiveItem));
	    });
	};
 
    this.initialize();
}
ArchiveView.template = Handlebars.compile($("#archive-tpl").html());
ArchiveView.liTemplate = Handlebars.compile($("#archive-li-tpl").html());