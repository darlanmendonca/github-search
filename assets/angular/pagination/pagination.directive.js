'use strict';

angular
  .module('github-search')
  .directive('pagination', paginationDirective);

function paginationDirective(GitHubFactory) {
	return {
		restrict: 'EA',
		templateUrl: '/templates/pagination.template.html',
		require: 'ngModel',
		replace: true,
    scope: {
      data: '=ngModel'
    },
    link: function(scope, element, attributes) {
    	var maxItensForPage = 8;

    	scope.$watch('data', function(value, old) {
    		if (value && value !== old){
		    	scope.pages = new Array(Math.ceil(scope.data.total_count / maxItensForPage));
    		}
    	});

    	var type = attributes.ngModel;

    	scope.paginate = function(page) {
		  	GitHubFactory
		  		.paginate(type, scope.$parent.q, page)
		  		.then(function(data) {
		  			scope.$parent[type] = data;
		  		});
		  };
		}
	};
}
