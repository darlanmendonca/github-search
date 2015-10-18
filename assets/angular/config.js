'use strict';

angular
  .module('github-search')
  .config(config);

function config (cfpLoadingBarProvider, $mdThemingProvider) {
	// matherial design theme
	$mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('blue-grey');
}
