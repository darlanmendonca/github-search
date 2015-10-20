'use strict';

angular
  .module('github-search')
  .controller('SearchController', SearchController);

function SearchController ($scope, GitHubFactory, $mdToast) {
  $scope.search = function() {
  	GitHubFactory
  		.search($scope.q)
  		.then(function(data) {
  			$scope.repositories = data[0];
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
