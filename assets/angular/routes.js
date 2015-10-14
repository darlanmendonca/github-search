'use strict';

angular
  .module('github-search')
  .config(routes);

function routes($locationProvider, $urlRouterProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/404');

  $stateProvider
    .state('search', {
      url: '/',
      templateUrl: 'templates/search.html',
      controller: 'SearchController'
    });
}
