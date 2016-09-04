
angular.module('postController',[])
    .controller('postController',function($scope,$rootScope,$http,$location) {
        $scope.publishIsShow = false;
        $scope.item = {};
        $scope.item.imgPaths = [];

        $scope.item.publishername = $rootScope.publishername;


        $scope.publish = function () {
            if ($scope.item.publishername) {
                $scope.item.sold = '出售中';

                if (!($scope.item.name && $scope.item.detail && $scope.item.category)) {
                    $scope.err = '好像有重要信息缺失哦？';
                    return;
                };
                if (!($scope.item.location)) {
                    $scope.err = '似乎忘记填交易地点了哦？';
                    
                    return;
                };
                if (!/^0$|^[1-9][0-9]{0,5}$|^[1-9][0-9]{0,5}\.[0-9]{1,2}$|^0\.[0-9]{1,2}$/.test($scope.item.price)) {
                    $scope.err = '商品价格不正确';
                    return;
                };
                if (!($scope.item.tel || $scope.item.weixin || $scope.item.qq)) {
                    $scope.err = '手机、微信、QQ至少填写一个';
                    return;
                };



            $http.post('/post', $scope.item).success(function () {
                $scope.err = '商品发布成功！';
                $location.path('/');

            });
            }

        }
        $scope.upload = function () {
            if ($scope.item.publishername) {
                var fd = new FormData();
                var file = $('#picture')[0].files[0];
               if($('#picture').val()==''){
                   $scope.err = '上传的图片不能为空！';
                   return;
               };
                fd.append('file', file);
                $http.post('/upload', fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).success(function (data) {
                    if (data.err) {
                        return $scope.err = data.err;
                    }
                    $scope.item.imgPaths.push(data.imgUrl)

                    var html = "<img style='margin:10px;'  src='" + data.imgUrl + "'>"
                    $('#showPic').append(html);
                });
                $('#picture').val('');
            } else {

            }


        }
            
        })



   
