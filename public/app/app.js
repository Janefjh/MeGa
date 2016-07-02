var appControllers = angular.module("appControllers",[]);

var myApp = angular.module("myApp",[
    "appServers",//注入服务
    "appControllers"//控制器注入
]);

var baseURL = 'http://localhost:3000';