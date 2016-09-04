
angular.module('app', ['ngRoute'])
.controller('loginController',function($rootScope,$scope,$http,$location){


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

    $scope.register=function(){
        $location.path('/register')
    }

})
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
    .controller('layoutController',function($scope,$rootScope,$http){
        $http.get('/getLoginUser').success(function(user){
          
            $scope.resetLogin(user);
        });

        $scope.resetLogin=function(user){
            if(user.name) {
                $scope.signup = {
                    url: '',
                    name:'welcome:'+user.name
                };
                $scope.registera = {
                    url: 'logout',
                    name: '注销baba12',
                    urla:'',
                    namea:'welcome'+user.name
                };

            }else{
                $scope.registera={
                    url:'login',
                    name:'登入',
                    urla:'register',
                    namea:'注册'
                };

            }
        }

    })
    .controller('logoutController',function($scope,$rootScope,$http,$location){

        $http.get('/logout').success(function () {
            $scope.$parent.resetLogin({});
            $location.path("/");

        });

    })
 .config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'views/c.html',
            controller:'layoutController'
        })
        .when('/login',{
            templateUrl:'views/login.html',
            controller:'loginController'
        })
        .when('/register',{
            templateUrl:'views/register.html',
            controller:'registerController'
        })
        .when('/logout',{
            templateUrl:'views/c.html',
            controller:'logoutController'
        })
        .otherwise({
            redirectTo:'/'
        });
}])