var PlansAddView = function(store) {
    var that = this;
    this.initialize = function() {
        this.el = $('<div id="container" />');
        //this.serializeArray();
        this.el.on('click', '.save', function(e){
            var data = $(this).parents('form').serializeArray();
            var elms = $('.plans-add-exercises-list').find('div');
            data['exercises'] = that.getExercises(elms);
            that.addPlan(data, e);
        });
        this.el.on('click', '.add', function(e){
            if($('.plans-add-exercises').size() == 0){
                $('.plans-add-exercises-list').after(PlansAddView.addLiTemplate());
                $('.plans-add-exercises').stop().fadeIn();
            }
            e.preventDefault();
            return false;
        });
        this.el.on('click', '.plans-add-save-exercise', function(e){
            //plans.push($(this).parents('form').serializeArray());
            //localStorage.setItem('plans', JSON.stringify(plans));
            //var plans = JSON.parse(localStorage.getItem('plans'));
            var data = $(this).parents('.plans-add-exercises-form').serializeArray();

            var dataObj = {};

            for (var i=0; i<data.length; i++) {
                dataObj[data[i].name] = data[i].value;
            }

            dataObj['strJson'] = JSON.stringify(dataObj);

            $('.plans-add-exercises-list').append(PlansAddView.addedLiTemplate(dataObj));
            $('.plans-add-exercises').stop().fadeOut(function(){
                $(this).remove();
            });
            e.preventDefault();
            return false;
        });

        this.el.on('click', '.plans-add-delete-exercise', function(e){
            $(this).parents('li').remove();
            e.preventDefault();
            return false;
        });

        this.el.on('click', '.plans-add-cancel-exercise', function(e){
            $('.plans-add-exercises').stop().fadeOut(function(){
                $(this).remove();
            });
            e.preventDefault();
            return false;
        });
    };

    this.render = function() {
        this.el.html(PlansAddView.template());
        return this;
    };
 
    this.addPlan = function(data, event){
        var plans = JSON.parse(localStorage.getItem('plans')) || [];
        if(data[0].value == ''){
            var messageObj = {
                type: 'alert-error',
                message: 'Bitte geben Sie einen Wert ein f&uuml;r: ',                
                item: data[0].name
            }
            $(that.el).trigger('message', messageObj);
            event.preventDefault();
        } else {
            var id = this.generateUuid();
            var key = data[0].name;
            var value = data[0].value;
            var item = {};
            item['id'] = id;
            item['exercises'] = data['exercises'];
            item[key] = value;
            plans.push(item);
            localStorage.setItem('plans', JSON.stringify(plans));
            var messageObj = {
                type: 'alert-success',
                message: 'Plan gespeichert: ',                
                item: data[0].value
            }            
            $(that.el).trigger('message', messageObj);            
        }
    }

    this.getExercises = function(elms){
        var exercises = [];
        //console.log("each", elms)
        $(elms).each(function(){
            exercises.push($(this).data('exercise'));
        });
        return exercises;
    }

    this.generateUuid = function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0,v=c=='x'?r:r&0x3|0x8;return v.toString(16);});
    }

	this.findByName = function() {
	    store.findByName($('.search-key').val(), function(plans) {
	        $('.plans-list').html(PlansView.liTemplate(plans));
	    });
	};
 
    this.initialize();
}

PlansAddView.template = Handlebars.compile($("#plans-add-tpl").html());
PlansAddView.addedLiTemplate = Handlebars.compile($("#plans-add-exercises-added-li-tpl").html());
PlansAddView.addLiTemplate = Handlebars.compile($("#plans-add-exercises-li-tpl").html());