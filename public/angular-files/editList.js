(function() {
    var module=angular.module('listModule');
    
   function listController($scope, $http){
       var vm =this;
       vm.peoples="";
       load($http);
        
        vm.firstName ="";
        vm.lastName ="";
        vm.email="";
        console.log('Hello');















        vm.addPeople = function (f, l, e) {    
            $http.post("http://localhost:1337/peoples", 
            {'firstName': f, 'lastName': l, 'email': e})
            .then(function (data){
                        console.log('OK', data);
                        vm.peoples = data.data;
                    }, function (err) {
                        console.log(err);
                    });
        };

        function load($http){
            $http.get('http://localhost:1337/peoples').then(function (data){
                        console.log('OK', data);
                        vm.peoples = data.data;
                    }, function (err) {
                        console.log(err);
                    });
        };   
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
        };   
    });
})();