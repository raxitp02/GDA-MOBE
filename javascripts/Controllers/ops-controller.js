myApp.controller('opsController', ['$scope', '$http', 'opsMetricsService', function($scope, $http, opsMetricsService) {
  var self = this;
  opsMetricsService.getOpsMetrics.then(function(data) {
    self.gotData2 = data;
  });
  opsMetricsService.getOpsMetricsInfo.then(function(data) {
    self.gotData3 = data;
  });
}]);
