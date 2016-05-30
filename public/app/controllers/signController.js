/**  注册  **/
appControllers.controller("registController",function($scope, $http, postService){
    $scope.userForm = {
    	'enterpriseName': '',
    	'userName': '',
    	'email': '',
    	'password': '',
    	'confirmPsd': ''
    };
    $scope.submit = function(){
	    postService.post('/regist', $scope.userForm, 5000).success(function(res){
			console.log(res);
		}).error(function(res){
			console.log("网络太慢，请求超时");
		});
    };
});
/**  登录  **/
appControllers.controller("loginController",function($scope, postService, getService){
    $scope.userForm = {
    	'userName': '',
    	'password': ''
    };
    $scope.submit = function(){
    	postService.post('/login', $scope.userForm, 5000).success(function(res){
			console.log(res);
		}).error(function(res){
			console.log("网络太慢，请求超时");
		});
    };


    //  getService.get('/getTest/', {id: user_id}, 5000).success(function(res){
	// 	    console.log(res);
	//  }).error(function(res){
	// 	    console.log("网络太慢，请求超时");
	//  });
});