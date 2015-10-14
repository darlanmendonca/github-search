'use strict';

angular
  .module('github-search')
  .controller('SearchController', SearchController);

function SearchController ($scope, $http) {
  $scope.search = function() {
  	var options = {
		  method: 'GET',
		  url: 'https://api.github.com/search/repositories',
		  params: {q: $scope.q}
		};

  	$http(options)
			.then(function(response) {
				$scope.results = response.data.items;
			});
  };
}
