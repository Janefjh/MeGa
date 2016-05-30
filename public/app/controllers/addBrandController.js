/**  添加品牌  **/
appControllers.controller("addBrandController", function($scope, postService, uploadService) {
    $scope.brandInfo = {
        "userName": "Guoer",
        "brandName": "",
        "brandLogo": "",
        "brandDetail": "",
        "auditStatus": "0",
        "like": "0",
        "productTag": []
    };

    //所有产品标签列表
    $scope.productTagList = ['美白', '护肤', '防晒', '乳液', '精油'];
   
    $scope.toggleSelection = function(tagName) {
        var idx = $scope.brandInfo.productTag.indexOf(tagName);
        //如果当前项已被选，则从已选数组中删除
        if (idx > -1) {
            $scope.brandInfo.productTag.splice(idx, 1);
        }
        //如果当前项未被选，则插入已选数组尾部
        else {
            $scope.brandInfo.productTag.push(tagName);
        }

        console.log($scope.brandInfo.productTag);
    };

    uploadService.fileUpload("#fileupload", function(data) {
        $scope.brandInfo.brandLogo = data.result.files[0].url;
    });

    $scope.submit = function() {
        console.log($scope.brandInfo);
        postService.post('/createBrand', $scope.brandInfo, 5000).success(function(res) {
            console.log(res);
            if (res.status == 200) {
                noty({
                    text: '新建品牌成功!',
                    layout: 'topRight',
                    type: 'success',
                    timeout: '1000'
                });
                return;
            } else {
                noty({
                    text: '新建品牌失败!',
                    layout: 'topRight',
                    type: 'danger',
                    timeout: '1000'
                });
            }

        }).error(function(res) {
            noty({
                text: '网络太慢，请求超时',
                layout: 'topRight',
                type: 'danger',
                timeout: '1000'
            });
        });
    };
    $scope.clear = function() {
        $scope.brandInfo.brandName = '';
        $scope.brandInfo.brandLogo = '';
        $scope.brandInfo.brandDetail = '';
        $scope.brandInfo.productTag = [];
    };
});