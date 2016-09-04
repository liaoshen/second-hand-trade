/**
 * Created by lyx on 2016/7/26.
 */
angular.module('logoutController',[])
    .controller('logoutController',function($scope,$rootScope,$http,$location){
    
    $http.get('/logout').success(function () {
        $location.path('/');
     ;

    });
})
