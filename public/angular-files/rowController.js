(function () {	
	var module = angular.module('listModule');

	module.controller('RowController', RowController);

	function RowController($scope, $http) {
		var vm = this;
        vm.showEdit = false;
		vm.name = "";
		vm.lastName = "";
		vm.email = "";
		
		vm.edit= function (name, lastName, email) {			
			if(arguments == 0){
				m.showEdit = !vm.showEdit;
				return;
			}
			vm.name = name;
			vm.lastName = lastName;
			vm.email = email;
			vm.showEdit = !vm.showEdit;
			$scope.load($http);
		}
		
		
		vm.save=function (id) {	
			if(vm.name.length < 3 || vm.lastName.length < 3 || vm.email.indexOf('@') == -1 || vm.email.indexOf('.') == -1){
                alert('False data.');
			
                return;
            }
			
			
			
			
			console.log({'id':id, 'firstName': vm.name, 'lastName': vm.lastName, 'email': vm.email});
			$http.put('/peoples', {'id':id, 'firstName': vm.name, 'lastName': vm.lastName, 'email': vm.email})
			.then(function (data){
				console.log('OK', data);
				$scope.peoples = data.data;
			}, function (err) {
				console.log(err);
			});
			$scope.load($http);
			vm.showEdit = !vm.showEdit;
		}

		vm.delete=function(id) {
			console.log('hello');
			$http({
				method: 'DELETE',
				url: '/peoples',
				data: {
					id: id
				},
				headers: {
					'Content-type': 'application/json;charset=utf-8'
				}
			}).then(function (data){
				console.log('OK', data);
				$scope.peoples = data.data;
			}, function (err) {
				console.log(err);
			});
			$scope.load($http);
			
		}

	}
})();