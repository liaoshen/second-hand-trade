/**
 * Created by lyx on 2016/8/9.
 */
angular.module('changePasswordController',[])
    .controller('changePasswordController',function($rootScope,$scope,$http,$location) {
     
        
        $scope.setPass = function () {
            if ($scope.pass) {
                $http.post('/changePassword', {pass:$scope.pass}).success(function (user) {
                    if (user.err) {
                        return $scope.err = user.err;
                    }
                  
                    $scope.err = '修改成功!';
                    window.location = '/';
                })

            } else {
                return $scope.err='用户名不能为空!';
            }

        };

        $scope.changeChangeNameShow = function ($event) {
            if ($event.target.id == "change-show") {
                $scope.changeNameIsShow = !$scope.changeNameIsShow;
            }
        }
    })
    