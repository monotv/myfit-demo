var LocalStorageStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, name, callback) {
        var items = JSON.parse(window.localStorage.getItem(name));
        var results = items.filter(function(element) {
            var name = element.name;
            return name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, results);
    }

    this.findById = function(id, name, callback) {
        var items = JSON.parse(window.localStorage.getItem(name));
        var item = null;
        var l = items.length;
        for (var i=0; i < l; i++) {
            if (items[i].id === id) {
                item = items[i];
                break;
            }
        }
        callLater(callback, item);
    }

    this.getItems = function(name, callback) {
        return JSON.parse(localStorage.getItem(name));
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

    // mock
    /*
    var plans = [
            {"id": 1, "name": "My 1st plan"},
            {"id": 2, "name": "My 2nd plan"},
            {"id": 3, "name": "My 3rd plan"},
            {"id": 4, "name": "My 4th plan"},
            {"id": 5, "name": "My 5th plan"}
        ];

    var archive = [
            {"id": 1, "name": "My 1st archived thing"},
            {"id": 2, "name": "My 2nd archived thing"},
            {"id": 3, "name": "My 3rd archived thing"},
            {"id": 4, "name": "My 4th archived thing"},
            {"id": 5, "name": "My 5th archived thing"}
        ];

    var exercises = [
            {"id": 1, "name": "My 1st exercise"},
            {"id": 2, "name": "My 2nd exercise"},
            {"id": 3, "name": "My 3rd exercise"},
            {"id": 4, "name": "My 4th exercise"},
            {"id": 5, "name": "My 5th exercise"}
        ];

    window.localStorage.setItem("plans", JSON.stringify(plans));
    window.localStorage.setItem("archive", JSON.stringify(archive));
    window.localStorage.setItem("exercises", JSON.stringify(exercises));
    */
    
    callLater(successCallback);

}