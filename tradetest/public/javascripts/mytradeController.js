angular.module('mytradeController',[])
    .controller('mytradeController',function($scope,$rootScope,$http){
      

        $http.post('/myItems',{publishername:$rootScope.publishername}).success(function (items) {
           $scope.items=items;
          

        });


        
    })
