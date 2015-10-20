"use strict";function config(){}function routes($locationProvider,$urlRouterProvider,$stateProvider){$locationProvider.html5Mode(!0),$urlRouterProvider.otherwise("/404"),$stateProvider.state("search",{url:"/",templateUrl:"templates/search.html",controller:"SearchController"})}function RunBlock(){}function GitHubFactory(GitHubService,$q){var githubSearch=function(type,query,page){var d=$q.defer();page=page?page:1;var resolve=function(res){d.resolve(res)},reject=function(res){d.reject(res)};return GitHubService[type].get({q:query,page:page,per_page:8},resolve,reject),d.promise};return{search:function(query){return $q.all([githubSearch("repositories",query),githubSearch("users",query)])},paginate:function(type,query,page){return githubSearch(type,query,page)}}}function GitHubService($resource){return{repositories:$resource("https://api.github.com/search/repositories"),users:$resource("https://api.github.com/search/users")}}function configAuth($authProvider){$authProvider.github({clientId:"7ba3653bf81205a7c30a",url:"api/auth/github",authorizationEndpoint:"https://github.com/login/oauth/authorize",redirectUri:window.location.origin||window.location.protocol+"//"+window.location.host,optionalUrlParams:["scope"],scope:["user:email"],scopeDelimiter:" ",type:"2.0",popupOptions:{width:1020,height:510}})}function LoginController($scope,$auth){$scope.logged=$auth.isAuthenticated(),$scope.toogleLogin=function(){$scope.logged?($auth.logout(),$scope.logged=!1):$auth.authenticate("github").then(function(){$scope.logged=!0})}}function configLoadingBar(cfpLoadingBarProvider){cfpLoadingBarProvider.includeSpinner=!1}function configMaterial($mdThemingProvider){$mdThemingProvider.theme("default").primaryPalette("blue").accentPalette("blue-grey")}function paginationDirective(GitHubFactory){return{restrict:"EA",templateUrl:"/templates/pagination.template.html",require:"ngModel",replace:!0,scope:{data:"=ngModel"},link:function(scope,element,attributes){var maxItensForPage=8,type=attributes.ngModel;scope.$watch("data",function(value,old){value&&value!==old&&(scope.pages=new Array(Math.ceil(scope.data.total_count/maxItensForPage)),scope.paginate=function(page){GitHubFactory.paginate(type,scope.$parent.q,page).then(function(data){scope.$parent[type]=data})})})}}}function SearchController($scope,GitHubFactory,$mdToast){$scope.search=function(){GitHubFactory.search($scope.q).then(function(data){$scope.repositories=data[0],$scope.users=data[1]})["catch"](function(err){403===err.status?$mdToast.showSimple("Heyy rapaz, calma awe, o Github não libera tantas requests subsequentes, rs."):$mdToast.showSimple("Unexpected error: "+err.statusText)})}}angular.module("github-search",["ngAnimate","ngResource","ngSanitize","ngTouch","ui.router","angular-loading-bar","ngMaterial","satellizer"]),angular.module("github-search").config(config),angular.module("github-search").config(routes),routes.$inject=["$locationProvider","$urlRouterProvider","$stateProvider"],angular.module("github-search").run(RunBlock),angular.module("github-search").factory("GitHubFactory",GitHubFactory),GitHubFactory.$inject=["GitHubService","$q"],angular.module("github-search").service("GitHubService",GitHubService),GitHubService.$inject=["$resource"],angular.module("github-search").config(configAuth),configAuth.$inject=["$authProvider"],angular.module("github-search").controller("LoginController",LoginController),LoginController.$inject=["$scope","$auth"],angular.module("github-search").config(configLoadingBar),configLoadingBar.$inject=["cfpLoadingBarProvider"],angular.module("github-search").config(configMaterial),configMaterial.$inject=["$mdThemingProvider"],angular.module("github-search").directive("pagination",paginationDirective),paginationDirective.$inject=["GitHubFactory"],angular.module("github-search").controller("SearchController",SearchController),SearchController.$inject=["$scope","GitHubFactory","$mdToast"];
//# sourceMappingURL=app.js.map
