(function () {	
	var module = angular.module('listModule');

	module.controller('RowController', RowController);

	function RowController($scope) {
		var vm = this;
        vm.showEdit = !false;

	}
})();