myApp.factory("opsMetricsService", ['$http', function($http) {
  return {
    getOpsMetrics: (function(response) {
      return $http.get('json/opsMetrics.json')
        .then(function(response) {
          return response.data;
        });
    })(),
    getOpsMetricsInfo: (function(response) {
      return $http.get('json/opsMetrics_info.json')
        .then(function(response) {
          return response.data;
        });
    })()
  };
  return opsMetricsService;
}]);

