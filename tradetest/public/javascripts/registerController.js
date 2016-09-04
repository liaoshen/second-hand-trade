/**
 * Created by lyx on 2016/7/26.
 */
angular.module('registerController',[])
    .controller('registerController',function($scope,$rootScope,$http,$location){

        $scope.user={
            name:'',
            pass:''
        };
        $scope.createClick = function () {
            $http.post('/register', $scope.user).success(function (data) {
                if (data.err) {
                    return $scope.err = data.err;
                }
             
                window.location='/';
            });
        };

       
    })
