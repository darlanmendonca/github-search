'use strict';

angular
  .module('github-search')
  .controller('SearchController', SearchController);

function SearchController ($scope, GitHubFactory, $auth, $mdToast) {
	$scope.logged = $auth.isAuthenticated();

	$scope.loginLogout = function() {
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

  $scope.search = function() {
  	GitHubFactory
  		.search($scope.q)
  		.then(function(data) {
  			$scope.repositories = data[0];
  			console.log($scope.repositories.items[0]);
  			$scope.users = data[1];
  		})
  		.catch(function(err) {
  			if (err.status === 403) {
  				$mdToast.showSimple('Heyy rapaz, calma awe, o Github não libera tantas requests subsequentes, rs.');
  			} else {
  				$mdToast.showSimple('Unexpected error: '+err.statusText);
  			}
  		});
  };
}
