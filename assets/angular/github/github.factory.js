'use strict';

angular
  .module('github-search')
  .factory('GitHubFactory', GitHubFactory);

function GitHubFactory (GitHubService, $q) {
	var githubSearch = function(type, query, page) {
	  var d = $q.defer();
	  page = page ? page : 1;
   	var result = GitHubService[type].get({ q: query, page: page, 'per_page': 8}, function() {
    	d.resolve(result);
  	});
		return d.promise;
	};


	return {
		search: function(query) {
			return $q.all([
				githubSearch('repositories', query),
				githubSearch('users', query)
			]);
		},
		paginate: function(type, query, page) {
			return githubSearch(type, query, page);
		}
	};
}
