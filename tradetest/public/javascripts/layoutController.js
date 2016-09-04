/**
 * Created by lyx on 2016/7/29.
 */
angular.module('layoutController',[])
    .controller('layoutController', function($scope,$rootScope,$http,$location,$state,$timeout){
        $scope.title='';


        $(document).ready(function() {
            $("#slidebox_2").mSlidebox({
                autoPlayTime: 1000,
                animSpeed: 1000,
                easeType: "easeInOutQuint",
                controlsPosition: {
                    buttonsPosition: "inside",
                    thumbsPosition: "inside"
                },
                pauseOnHover: true,
                numberedThumbnails: false
            })
        });


        $http.get('/getLoginUser').success(function(user){
        $rootScope.ID=$scope.id;

      
        $rootScope.publishername=user.name;
        $scope.resetLogin(user);

    });
        
           var task=setInterval(function(){
                $('#animate').animate({left:"700px"},2000)
                    .animate({left:"0px"},0);

            },2000);


        $http.get('/getItems').success(function (categorys) {
            $('#animate').stop();
            clearTimeout(task);
            $scope.title='最新发布';
           
            $rootScope.categorys = categorys
        });

        

        $scope.recent=function() {
            var task=setInterval(function(){
                $('#animate').animate({left:"700px"},2000)
                    .animate({left:"0px"},0);

            },2000);
            $http.get('/getItems').success(function (categorys) {
                $('#animate').stop();
                clearTimeout(task);
                $scope.title='最新发布';
              
                $rootScope.categorys = categorys
            });
        };

        $scope.digital=function() {
            var task=setInterval(function(){
                $('#animate').animate({left:"700px"},2000)
                    .animate({left:"0px"},0);

            },2000);
            $scope.title='闲置数码';
            $http.get('/category/digital').success(function (categorys) {
                clearTimeout(task);
              
                $rootScope.categorys = categorys
            });
        };
        $scope.ride=function() {
            var task=setInterval(function(){
                $('#animate').animate({left:"700px"},2000)
                    .animate({left:"0px"},0);

            },2000);
            $scope.title='校园代步';
            $http.get('/category/ride').success(function (categorys) {
                $('#animate').stop();
                clearTimeout(task);
              
                $rootScope.categorys = categorys
            });
        };
        $scope.book=function() {
            var task=setInterval(function(){
                $('#animate').animate({left:"700px"},2000)
                    .animate({left:"0px"},0);

            },2000);
            $scope.title='图书教材';
            $http.get('/category/book').success(function (categorys) {
                $('#animate').stop();
                clearTimeout(task);
               
                $rootScope.categorys = categorys
            });
        };
        $scope.commodity=function() {
            var task=setInterval(function(){
                $('#animate').animate({left:"700px"},2000)
                    .animate({left:"0px"},0);

            },2000);
            $scope.title='电器日用';
            $http.get('/category/commodity').success(function (categorys) {
                $('#animate').stop();
                clearTimeout(task);
               
                $rootScope.categorys = categorys
            });
        };
        $scope.makeup=function() {
            var task=setInterval(function(){
                $('#animate').animate({left:"700px"},2000)
                    .animate({left:"0px"},0);

            },2000);
            $scope.title='美妆衣物';
            $http.get('/category/makeup').success(function (categorys) {
                $('#animate').stop();
                clearTimeout(task);
              
                $rootScope.categorys = categorys
            });
        };
        $scope.smallthing=function() {
            var task=setInterval(function(){
                $('#animate').animate({left:"700px"},2000)
                    .animate({left:"0px"},0);

            },2000);
            $scope.title='其它';
            $http.get('/category/smallthing').success(function (categorys) {
                $('#animate').stop();
                clearTimeout(task);
               
                $rootScope.categorys = categorys
            });
        };
        $scope.sport=function() {
            var task=setInterval(function(){
                $('#animate').animate({left:"700px"},2000)
                    .animate({left:"0px"},0);

            },2000);
            $scope.title='运动棋牌';
            $http.get('/category/sport').success(function (categorys) {
                $('#animate').stop();
                clearTimeout(task);
              
                $rootScope.categorys = categorys
            });
        };

        $scope.isLogin=false;

            $rootScope.myset=false;


        if($rootScope.publishername){
            $scope.isLogin=true;
            $rootScope.myset=true;
        };


        $scope.myshop=function(){
            if($rootScope.publishername){
                $location.path('/myItems')
            }else{
               
                $rootScope.showLogin=true;

            }
        }
        
       $scope.upload=function(){
           if($rootScope.publishername){
               $location.path('/post') 
           }else{
            
               $rootScope.showLogin=true;
           }
       }

        $scope.password=function(){
            
        }
        $scope.nick=function(){
            $http.post().success(function (categorys) {
              
                $rootScope.categorys = categorys
            });  
        }
        
    $scope.resetLogin=function(user){
        if(user.name) {
            
            $rootScope.registera = {
                url: 'logout',
                name: '注销',
                urla:'',
                namea:'欢迎您:'+user.name
            };

        }else{
            $rootScope.registera={
                url:'login',
                name:'登入',
                urla:'register',
                namea:'注册'
            };

        }
    }
        $state.go('parent.start');

})
   
   
   