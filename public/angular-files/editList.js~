(function() {
    var module=angular.module('listModule');
    
   function listController($scope, $http){
       var vm =this;
       $scope.peoples="";
       vm.firstName ="";
       vm.lastName="";
       vm.email="";

        vm.addPeople = function (f, l, e) {    
            if(f.length < 3 || l.length < 3 || e.indexOf('@') == -1 || e.indexOf('.') == -1){
                alert('False data.');
                return;
            }
            $http.post("http://localhost:1337/peoples", 
            {'firstName': f, 'lastName': l, 'email': e})
            .then(function (data){
                        console.log('OK');
                        vm.peoples = data.data;
                        $scope.load($http);
                    }, function (err) {
                        console.log(err);
                    });
                    vm.firstName ="";
                    vm.lastName="";
                    vm.email="";
        };
        $scope.load = function($http){
            $http.get('http://localhost:1337/peoples').then(function (data){
                        console.log('OK');
                        $scope.peoples = data.data;
                    }, function (err) {
                        console.log(err);
                    });
        };   
         $scope.load($http);
    };
    
    
    
    module.directive('editList', function ($window){
        return {
            restrict: 'E',
            scope: {
                peoples: "="
            },
            templateUrl: 'angular-files/templates/list.html',
            link: function(scope, element, attrs) {
                console.log(scope.peoples);
                console.log(typeof(scope.peoples));
            },
            controller: listController, 
            controllerAs: 'list',
            $routeConfig: [
                {
			        path: '/list',
			        component: 'editList',
			        name: 'editList'
		        }, 
                {
			        path: '/**',
			        redirectTo: ["editList", ""]
		        }],
        };   
    });
})();