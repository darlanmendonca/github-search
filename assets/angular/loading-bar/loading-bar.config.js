'use strict';

angular
  .module('github-search')
  .config(configLoadingBar);

function configLoadingBar (cfpLoadingBarProvider) {
	// disable spinner from angular-loading-bar
	cfpLoadingBarProvider.includeSpinner = false;
}
