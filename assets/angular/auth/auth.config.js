'use strict';

angular
  .module('github-search')
  .config(configAuth);

function configAuth($authProvider) {
	$authProvider.github({
    clientId: '7ba3653bf81205a7c30a',
	  url: 'api/auth/github',
	  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
	  redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
	  optionalUrlParams: ['scope'],
	  scope: ['user:email'],
	  scopeDelimiter: ' ',
	  type: '2.0',
	  popupOptions: { width: 1020, height: 510 }
	});
}
