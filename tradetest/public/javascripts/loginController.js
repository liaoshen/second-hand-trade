/**
 * Created by lyx on 2016/7/26.
 */
angular.module('loginController',[])
    .controller('loginController',function($scope,$rootScope,$http,$location){

        $scope.user={
            name:'',
            pass:''
        };

        $scope.login=function(){
            $http.post('/login',$scope.user).success(function(data){
                if(data.err){
                    return $scope.err=data.err;
                }
                window.location='/';
            });
        }

        
    })

