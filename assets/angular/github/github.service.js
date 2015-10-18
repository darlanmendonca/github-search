'use strict';

angular
  .module('github-search')
  .service('GitHubService', GitHubService);

function GitHubService ($resource) {
	return {
		repositories: $resource('https://api.github.com/search/repositories'),
		users: $resource('https://api.github.com/search/users')
	};
}
