/**  注册  **/
appControllers.controller("registController",function($scope, $http, postService){
    $scope.userForm = {
    	'userName': '',
    	'email': '',
    	'password': '',
    	'confirmPsd': ''
    };
    $scope.errMsg = '';

    $scope.submit = function(){
	    postService.post('/regist', $scope.userForm, 5000).success(function(res){
			console.log(res);
            if(typeof res.status != 'undefined'&&res.status == '200'){
                document.cookie = res.cookie;
                location.href = baseURL + '/';
            }else{
                $scope.errMsg = res.message;
            }
		}).error(function(res){
			alert("当前网络太差，请稍后重试");
		});
    };
});
/**  登录  **/
appControllers.controller("loginController",function($scope, postService, getService){
    $scope.userForm = {
    	'userName': '',
    	'password': ''
    };
    $scope.errMsg = '';
    $scope.submit = function(){
    	postService.post('/login', $scope.userForm, 5000).success(function(res){
			console.log(res);
            if(typeof res.status != 'undefined'&&res.status == '200'){
                document.cookie = res.cookie;
                location.href = baseURL + '/';
            }else{
                $scope.errMsg = res.message;
            }
		}).error(function(res){
			alert("当前网络太差，请稍后重试");
		});
    };
});