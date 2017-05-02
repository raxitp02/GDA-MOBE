myApp.controller('businessController', ['$scope', '$http', 'businessMetricsService', function($scope, $http, businessMetricsService) {
  var self = this;
  businessMetricsService.getBusinessMetrics.then(function(data) {
    self.gotData = data;
  });
  businessMetricsService.getBusinessMetricsInfo.then(function(data) {
    self.gotData1 = data;
  });
}]);
