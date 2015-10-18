'use strict';

angular
  .module('github-search')
  .config(configMaterial);

function configMaterial ($mdThemingProvider) {
	// matherial design theme
	$mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('blue-grey');
}
