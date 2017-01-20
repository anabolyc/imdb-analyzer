(function ($) {
    var app = angular.module("default-app", []); 
    app.controller("data-controller", ['$q', '$http', '$scope', function($q, $http, $scope) {

        var self = $scope;
        
        self.pub = {
            loading: false,
            url: window.location.search.split("?").pop(),
            message: "",
            data: []
        };
        
        self.loadRows = 50;

        self.filters = {
            enabled: false, 
            minRating: 7,
            minVotes: 1000
        };
        
        self.isNum = function(num) {
            return num && !isNaN(num.replace(",", ""));
        };

        self.addData = function(n) {
            var i = 0;
            var sent = 0;
            var processed = 0;
            self.pub.data.forEach(function(block) {
                block.urls.forEach(function(item) {
                    if (!item.data)
                        if (i++ < n) {
                            var url = "http://www.omdbapi.com/?i=" + item.id + "&plot=short&r=json"
                            sent++;
                            $http.get(url).then(function(resp) {
                                item.data = resp.data;
                                item.data.imdbVotes = self.isNum(item.data.imdbVotes) ? item.data.imdbVotes.replace(",", "") : "N/A";
                                self.pub.message = "Processed [" + (processed++) + "/" + sent + "] " + url;
                                if (processed == sent)
                                    self.pub.message = "";
                            }, function(error) {
                                item.error = error;
                                console.log(error);
                            });
                        }
                });
            });
        };

        (function() {
            self.pub.loading = true;
            self.pub.data = [];
            
            $http.get("/proxy?url=" + self.pub.url).then(function(resp) { 
                var $body = $(resp.data);
                var $lists = $body.find("ol");
                var $captions = $body.find("ol").prev();
                for (var i = 0; i < $lists.length; i++) {
                    var $list = $($lists[i]);
                    var block = {
                        title: $captions[i].innerText,
                        urls: []
                    };
                    var $a = $list.find("a");
                    for (var j = 0; j < $a.length; j++) {
                        var item = $a[j];
                        var id = item.href.split("/").splice(4)[0];
                        block.urls.push({
                            id: id,
                            url: "http://www.imdb.com/title/" + id + "/",
                            href: item.href,
                            title: item.innerText
                        });
                    }
                    self.pub.data.push(block);
                }
                self.pub.loading = false;
            }, function(error) {
                console.log(error);
                self.pub.loading = false;
                self.pub.message = "Error loading list";
            });
        })();

    }]);
})(jQuery);