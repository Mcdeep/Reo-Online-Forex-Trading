(function () {
	'use strict';

	angular.module('rapp')
		.factory('WidgetSrv', ['ngDialog', WidgetSrv]);


	function WidgetSrv(ngDialog) {
		return {
			successDialog: function (data) {
				return ngDialog.open({
					template: 'succes.modal.html',
					className: 'ngdialog-theme-default',
					controller: ['data', function (data) {
						this.data = data;
					}],
					controllerAs: 'vm',
					resolve: {
						data: function () {
							return data
						}
					}
				});
			},
			confirmDialog: function (data) {
				return ngDialog.open({
					template: 'confirm.modal.html',
					className: 'ngdialog-theme-default',
					controller: ['data', function (data) {
						this.data = data;
					}],
					controllerAs: 'vm',
					resolve: {
						data: function () {
							return data
						}
					}
				});
			}
		};
	}
})();
