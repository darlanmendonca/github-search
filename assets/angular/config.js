'use strict';

angular
  .module('github-search')
  .config(config);

function config (cfpLoadingBarProvider) {
	// disable spinner from angular-loading-bar
	cfpLoadingBarProvider.includeSpinner = false;
}
