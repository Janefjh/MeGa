/**  品牌列表  **/
appControllers.controller("brandController", function($scope, postService, deleteService, uploadService) {
    $scope.brandList = [];
    $scope.edittingBrand = ''; //选择修改的品牌
    $scope.editedBrandName = '';//修改的品牌原来的名称

    $scope.productTagList = ['美白', '护肤', '防晒', '乳液', '精油']; //所有产品标签列表
    $scope.toggleSelection = function(tagName) {
        var idx = $scope.edittingBrand.productTag.indexOf(tagName);
        if (idx > -1) {
            $scope.edittingBrand.productTag.splice(idx, 1);
        } else {
            $scope.edittingBrand.productTag.push(tagName);
        }
        console.log($scope.edittingBrand.productTag);
    };

    //按用户名加载品牌列表
    postService.post('/getBrandList', {
        "userName": "Guoer"
    }, 5000).success(function(res) {
        console.log(res);
        if (res.status == 200) {
            $scope.brandList = res.data;
            return;
        } else {
            noty({
                text: '品牌列表加载失败',
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


    /**
     * [编辑品牌信息]
     * @param  {Object} brandItem [当前编辑的品牌信息]
     */
    $scope.edit = function(brandItem) {
        $scope.edittingBrand = brandItem;
        $scope.editedBrandName = angular.copy(brandItem.brandName);
    };
    uploadService.fileUpload("#fileupload", function(data) {
        $scope.edittingBrand.brandLogo = data.result.files[0].url;
    });

    $scope.submit = function() {
        var submitInfo = {
            "brandName": $scope.editedBrandName,
            "brandDoc": $scope.edittingBrand
        };

        console.log(submitInfo);
        postService.post('/updateBrand', submitInfo, 5000).success(function(res) {
            console.log(res);
            if (res.status == 200) {
                noty({
                    text: '修改品牌成功!',
                    layout: 'topRight',
                    type: 'success',
                    timeout: '1000'
                });
                return;
            } else {
                noty({
                    text: '修改品牌失败!',
                    layout: 'topRight',
                    type: 'danger',
                    timeout: '1000'
                });
                return;
            }

        }).error(function(res) {
            noty({
                text: '网络太慢，请求超时!',
                layout: 'topRight',
                type: 'danger',
                timeout: '1000'
            });
        });
    };

    /**
     * [删除品牌]
     * @param  {String} brand_name  [待删除品牌名称]
     * @param  {[type]} brand_index [删除品牌在品牌列表中的位置]
     */
    $scope.delete = function(brand_name, brand_index) {
        deleteService.notyConfirm(brand_name, function() {
            console.log(brand_name);
            postService.post('/deleteBrand', {
                'brandName': brand_name
            }, 5000).success(function(res) {
                if (res.status == 200) {
                    noty({
                        text: '删除品牌成功!',
                        layout: 'topRight',
                        type: 'success',
                        timeout: '1000'
                    });

                    $scope.brandList.splice(brand_index, 1);
                } else {
                    noty({
                        text: '删除品牌失败',
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
        });
    };
});