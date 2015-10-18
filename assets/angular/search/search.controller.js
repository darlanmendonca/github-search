'use strict';

angular
  .module('github-search')
  .controller('SearchController', SearchController);

function SearchController ($scope, GitHubFactory, $auth) {
	$scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };

  if (!$auth.isAuthenticated()) {
	  $scope.authenticate('github');
  }

  $scope.search = function() {
  	GitHubFactory
  		.search($scope.q)
  		.then(function(data) {
  			$scope.repositories = data[0];
  			$scope.users = data[1];
		  	$scope.repositoriesPages = new Array(Math.ceil($scope.repositories.total_count / 8));
		  	$scope.usersPages = new Array(Math.ceil($scope.users.total_count / 8));
		  	$scope.tabSelected = $scope.repositories.total_count > $scope.users.total_count ? 0 : 1;
  		});
  };

  $scope.paginate = function(type, page) {
  	GitHubFactory
  		.paginate(type, $scope.q, page)
  		.then(function(data) {
  			$scope[type] = data;
  		});
  };
}
