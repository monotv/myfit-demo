var MemoryStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var plans = this.plans.filter(function(element) {
            var name = element.name;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, plans);
    }

    this.findById = function(id, callback) {
        var plans = this.plans;
        var plan = null;
        var l = plans.length;
        for (var i=0; i < l; i++) {
            if (plans[i].id === id) {
                employee = plans[i];
                break;
            }
        }
        callLater(callback, employee);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    this.plans = [
            {"id": 1, "name": "My 1st plan"},
            {"id": 2, "name": "My 2nd plan"},
            {"id": 3, "name": "My 3rd plan"},
            {"id": 4, "name": "My 4th plan"},
            {"id": 5, "name": "My 5th plan"}
        ];

    this.archive = [
            {"id": 1, "name": "My 1st archived thing"},
            {"id": 2, "name": "My 2nd archived thing"},
            {"id": 3, "name": "My 3rd archived thing"},
            {"id": 4, "name": "My 4th archived thing"},
            {"id": 5, "name": "My 5th archived thing"}
        ];

    callLater(successCallback);

}