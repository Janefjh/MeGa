var appControllers = angular.module("appControllers",[]);

var myApp = angular.module("myApp",[
    "appServers",//服务注入
    "appControllers"//控制器注入
]);