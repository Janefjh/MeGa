var appServers = angular.module("appServers", []);

/** 通用post查询 **/
appServers.factory('postService', function($http) {
    var _sendRequest = function(url, data, timeout) {
        return $http({
            method: 'post',
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json;charset=utf8'
            },
            timeout: timeout
        });
    };
    return {
        post: function(url, data, timeout) {
            return _sendRequest(url, data, timeout);
        }
    };
});
/** 通用get查询 **/
appServers.factory('getService', function($http) {
    var _sendRequest = function(url, data, timeout) {
        return $http({
            method: 'get',
            url: url,
            params: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencode'
            },
            timeout: timeout
        });
    };
    return {
        get: function(url, data, timeout) {
            return _sendRequest(url, data, timeout);
        }
    };
});

/** 通用delete确认 **/
appServers.factory('deleteService', function() {
    return {
        notyConfirm: function(deleteItem, yesCallback) {
            noty({
                text: '确定要删除?',
                layout: 'topRight',
                buttons: [{
                    addClass: 'btn btn-success btn-clean',
                    text: '是',
                    onClick: function($noty) {
                        $noty.close();
                        yesCallback(deleteItem);
                    }
                }, {
                    addClass: 'btn btn-default btn-clean',
                    text: '否',
                    onClick: function($noty) {
                        $noty.close();
                    }
                }]
            });
        }
    };
});

/** 通用文件上传 **/
appServers.factory('uploadService', function() {
    return {
        fileUpload: function(selector, callback){
            $(selector).fileupload({
                dataType: 'json',
                done: function (e, data) {
                    callback(data);
                }
            });
        }
    };
});