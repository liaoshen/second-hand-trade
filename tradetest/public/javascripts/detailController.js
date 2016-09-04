/**
 * Created by lyx on 2016/8/10.
 */

angular.module('detailController',[])
    .controller('detailController',function($http,$scope,$rootScope,$stateParams){
        $scope.id = $stateParams.id;
         
        $scope.isSold=false;
        $scope.noWrapSlides = false;

        var url='/item/'+ $scope.id;

        

        if($rootScope.publishername){
            $scope.sellmsg=false;
            $scope.selltel=true;
        }else{  $scope.sellmsg=true;
            $scope.selltel=false;}


        $scope.sold=function(){
            var sold='已出售';

            $http.post('/changeTrade', {sold:sold,_id:$scope.id}).success(function () {

            });
        }



        $http.get(url).success(function (item) {



            $scope.item = item;

          

            if($rootScope.publishername==item.publishername){
                $scope.isSold=true;
            }

            $scope.imgs=item.imgPaths;
             for(var i=0;i<$scope.imgs.length;i++){

                 var html="<li style='background:url("  + ")'><img style='width:450px ;height:400px;padding: 0px;margin: 0px' src="+$scope.imgs[i]+"></li>"
                 $('#mytrade').append(html)
             }

            $(document).ready(function(){
              
                $("#slidebox_5").mSlidebox({
                    autoPlayTime:5000,
                    animSpeed:1000,
                    easeType:"easeInOutQuint",
                    controlsPosition:{
                        buttonsPosition:"inside",
                        thumbsPosition:"inside"
                    },
                    pauseOnHover:true,
                    numberedThumbnails:false

                })

            });

        })
    })