'use strict';

angular
	.module('github-search')
	.controller('LoginController', LoginController);

function LoginController ($scope, $auth) {
	$scope.logged = $auth.isAuthenticated();

	$scope.toogleLogin = function() {
		if (!$scope.logged) {
			$auth
				.authenticate('github')
				.then(function() {
					$scope.logged = true;
				});
		} else {
			$auth.logout();
			$scope.logged = false;
		}
	};
}
