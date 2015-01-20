var app = angular.module('ui-routes', ['ui.router'])


.config(["$urlRouterProvider", "$stateProvider","$locationProvider",   function ($urlRouterProvider, $stateProvider,$locationProvider){
  $urlRouterProvider.otherwise('/');
    
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('/landing', {
      url: '/',
      templateUrl : 'templates/landing.html',
      controller  : 'landingController as landing',
    })
    .state('/defense', {
      url: '/defense',
      templateUrl : 'templates/defense.html',
      controller  : 'defenseController as defense',
      
    })
    .state('/injury', {
      url: '/injury',
      templateUrl : 'templates/injury.html',
      controller  : 'injuryController as injury',
      
    })
    .state('/traffic', {
      url: '/traffic',
      templateUrl : 'templates/traffic.html',
      controller  : 'trafficController as traffic',
      
    });
    

}]);