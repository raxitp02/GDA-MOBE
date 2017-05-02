var myApp = angular.module('d3App', ['ui.router']);
myApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/business')
  var businessState = {
    name: 'business',
    url: '/business',
    controller: 'businessController',
    controllerAs: 'bc',
    templateUrl: 'html/business.html'
  }

  var opsState = {
    name: 'ops',
    url: '/ops',
    controller: 'opsController',
    controllerAs: 'oc',
    templateUrl: 'html/ops.html'
  }
  $stateProvider.state(businessState);
  $stateProvider.state(opsState);
});

