var TrainingStartedView = function(store) {
    var that = this;
    this.initialize = function() {
        this.el = $('<div id="container" />');
        //this.serializeArray();
        this.el.on('click', '.save', function(e){
            var data = $(this).parents('form').serializeArray();
            console.log(data)
            that.addPlan(data, e);
        });
        this.el.on('click', '.start', function(e){
            var counter = that.el.find('.countdown');
            that.initCountdown(counter);
            return false;
        });
    };

    this.render = function() {
        var that = this;
        var id = window.location.hash.split("/")[2];
        var timer = {minutes: 01, seconds: 30};
        store.findById(id, "plans", function(plan){
        	that.el.html(TrainingStartedView.template({id: id, name: plan.name, timer: timer}));
        	if(plan.exercises){
        		$('.exercises-list').empty();
        		console.log(plan.exercises)
        		that.el.find('.exercises-list').html(TrainingStartedView.addedLiTemplate(plan.exercises));
        	}
        });
        return this;
    };
    this.initCountdown = function(elm) {
        var that = this;
        var minutesField = elm.find('.minutes');
        var secondsField = elm.find('.seconds');
        var myCounter = new that.Countdown({  
            seconds: 90,  // number of seconds to count down
            onUpdateStatus: function(sec){
                var minutes = Math.floor(sec / 60);
                var seconds = sec - minutes * 60;
                minutesField.text(minutes < 10 ? "0"+minutes : minutes);
                secondsField.text(seconds < 10 ? "0"+seconds : seconds);
             }, // callback for each second
            onCounterEnd: function(){
                alert('counter ended!');
                navigator.notification.beep(3);
                navigator.notification.vibrate(2000);
            } // final action
        });

        myCounter.start();
    }

    this.Countdown = function(options) {
      var timer,
      instance = this,
      seconds = options.seconds || 10,
      updateStatus = options.onUpdateStatus || function () {},
      counterEnd = options.onCounterEnd || function () {};

      function decrementCounter() {
        updateStatus(seconds);
        if (seconds === 0) {
          counterEnd();
          instance.stop();
        }
        seconds--;
      }

      this.start = function () {
        clearInterval(timer);
        timer = 0;
        seconds = options.seconds;
        timer = setInterval(decrementCounter, 1000);
      };

      this.stop = function () {
        clearInterval(timer);
      };
    }

	this.findByName = function() {
	    store.findByName($('.search-key').val(), function(plans) {
	        $('.plans-list').html(PlansView.liTemplate(plans));
	    });
	};

    this.initialize();
}

TrainingStartedView.template = Handlebars.compile($("#training-started-tpl").html());
TrainingStartedView.addedLiTemplate = Handlebars.compile($("#training-started-exercises-added-li-tpl").html());