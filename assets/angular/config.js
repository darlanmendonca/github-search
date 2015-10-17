'use strict';

angular
  .module('github-search')
  .config(config);

function config (cfpLoadingBarProvider, $mdThemingProvider) {
	// disable spinner from angular-loading-bar
	cfpLoadingBarProvider.includeSpinner = false;

	$mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('blue-grey');
}
