var ExercisesAddView = function(store) {
    var that = this;
    this.initialize = function() {
        this.el = $('<div id="container" />');
        this.el.on('click', '.save', function(e){
            var data = $(this).parents('form').serializeArray();
            that.addExercise(data, e);
        });        
    };

    this.render = function() {    	
        this.el.html(ExercisesAddView.template());
        return this;
    };

    this.addExercise = function(data, event){
        var exercises = JSON.parse(localStorage.getItem('exercises')) || [];
        if(data[0].value == ''){
            var messageObj = {
                type: 'alert-error',
                message: 'Bitte geben Sie einen Wert ein f&uuml;r: ',                
                item: data[0].value
            }
            $(that.el).trigger('message', messageObj);
            event.preventDefault();
        } else {
            var key = data[0].name;
            var value = data[0].value;
            var item = {};
            item[key] = value;
            exercises.push(item);
            localStorage.setItem('exercises', JSON.stringify(exercises));
            var messageObj = {
                type: 'alert-success',
                message: '&Uuml;bung gespeichert: ',                
                item: data[0].value
            }            
            $(that.el).trigger('message', messageObj);            
        }
    }

    this.initialize();
}
ExercisesAddView.template = Handlebars.compile($("#exercises-add-tpl").html());