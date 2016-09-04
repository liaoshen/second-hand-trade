angular.module('indexController',[])
    .controller('indexController',function($rootScope,$scope,$http,$location){
       $rootScope.showNow=false;
        $rootScope.showpassNow=false;
        $rootScope.showLogin=false;
        $rootScope.showRegister=false;
   

        $scope.disappear=function(){
            $rootScope.showNow=false;
            $rootScope.showpassNow=false;
            $rootScope.showLogin=false;
            $rootScope.showRegister=false;

        }

        $scope.changeName=function(){
            $rootScope.showNow=true;
            $rootScope.showpassNow=false;

        }
        $scope.changePass=function(){
            $rootScope.showpassNow=true;
            $rootScope.showNow=false;
        }
        $rootScope.logining=function(){
            $rootScope.showLogin=true;
            $rootScope.showRegister=false;
        };
        $scope.registering=function(){
            $rootScope.showRegister=true;
            $rootScope.showLogin=false;
        };


        $scope.loginthis=function(){
         
              switch($rootScope.registera.name){
                  case '登入':
                      $rootScope.showLogin=true;
                      break;
                  case '注销':
                      $location.path('/logout');
                      break;
              }

        };
        $scope.registerthis=function(){
             
            if($rootScope.registera.namea=="注册")
               $rootScope.showRegister=true;
        }
        $scope.setmyName = function () {
          
            if ($scope.myName) {
                $http.post('/changeMessage', {name:$scope.myName}).success(function (user) {
                    if (user.err) {
                        return $scope.err = user.err;
                    }
                    
                    $scope.err='修改成功!';
                    $rootScope.showNow=false;
                    window.location='/';
                });

            } else {
                return $scope.err='用户名不能为空!';
            }

        };

        $scope.setPass = function () {

            if ($scope.pass) {
                $http.post('/changePassword', {pass:$scope.pass}).success(function (user) {
                    if (user.err) {
                        return $scope.err = user.err;
                    }
                  
                    $scope.err = '修改成功!';
                    $rootScope.showpassNow=false;
                    window.location = '/';
                })

            } else {
                return $scope.err='密码不能为空!';
            }

        };

        $scope.mylogin=function(){
           ;
            $http.post('/login',$scope.user).success(function(data){
                if(data.err){
                    return $scope.err=data.err;
                }

                window.location='/';
            });
        }

        $scope.myregister=function(){

                $http.post('/register', $scope.user).success(function (data) {
                    if (data.err) {
                        return $scope.err = data.err;
                    }
                  
                    window.location='/';
                });


        }



    })
