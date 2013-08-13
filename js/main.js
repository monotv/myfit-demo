var app = {
    initialize: function() {
        var self = this;        
        self.registerEvents();
        self.store = new LocalStorageStore(function() {
            self.route();
        });
    },
    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    registerEvents: function() {
        var self = this;
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function(event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function(event) {
                $(event.target).removeClass('tappable-active');
            });
        }

        $(window).on('hashchange', $.proxy(this.route, this));

        $(document).delegate('a.nav', 'click', function(e){
            //return false;
        });

    },
    route: function() {
        var self = this;        
        var hash = window.location.hash;

        self.urls = {
            plansDetails: /^#plans\/(\d{1,})/,
            plansAdd: /^#plans\/add/,
            plans: /^#plans$/
        };

        if (!hash) {
            $('body').html(new HomeView().render().el);
            return;
        }
        /*var match = hash.match(app.plansURL);
        if (match) {
            this.store.findById(Number(match[1]), function(plan) {
                $('body').html(new PlansView(plan).render().el);
            });
        } else {*/

        if(hash.match('#training')){
            $('body').html(new TrainingView(this.store).render().el);
        } else if(hash.match(self.urls.plans)){
            $('body').html(new PlansView(this.store).render().el);
        } else if(hash.match(self.urls.plansAdd)){
            $('body').html(new PlansAddView(this.store).render().el);
        }  else if(hash.match(self.urls.plansDetails)){
            $('body').html(new PlansDetailsView(this.store).render().el);
        } else if(hash.match('#archive')){
            $('body').html(new ArchiveView(this.store).render().el);
        } else {
            if(!!console){
                console.log('using default route');
            }                
            $('body').html(new HomeView().render().el);                
        }
        return;
    }
};

app.initialize();