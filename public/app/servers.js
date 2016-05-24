var appServers = angular.module("appServers",[]);

/** 通用post查询 **/
appServers.factory('postService',['$http',
    function($http){
        var doRequest = function(data,url){
            return $http({
                method:'post',
                url:url,
                data : $.param(data)
            });
        };
        return {
            List: function(data,url) {
                return doRequest(data,url);
            }
        };
    }
]);
/** 通用get查询 **/
appServers.factory('getService',['$http',
    function($http){
        var doRequest = function(data,url){
            return $http({
                method:'get',
                url:url,
                params : data
            });
        };
        return {
            List: function(data,url) {
                return doRequest(data,url);
            }
        };
    }
]);
/**(不带参数)通用get服务**/
appServers.factory('getNoParam', ['$http',
    function($http) {
        var getFunc = function(URL){
            return $http({
                method:'get',
                url:URL
            });
        };
        return {
            List: function(URL) {
                return getFunc(URL);
            }
        };
    }
]);