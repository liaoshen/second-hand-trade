angular.module('changeNameController',[])
    .controller('changeNameController',function($rootScope,$scope,$http,$location) {
        $scope.changeNameIsShow = false;

        $scope.$on('showChangeName', function () {
            $scope.changeNameIsShow = true;
        })
    

        $scope.setName = function () {
            if ($scope.name) {
                $http.post('/changeMessage', {name:$scope.name}).success(function (user) {
                    if (user.err) {
                        return $scope.err = user.err;
                    }
                   
                     $scope.err='修改成功!';
                    window.location='/';
                });

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
    