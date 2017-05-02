myApp.factory("businessMetricsService", ['$http', function($http) {
  return {
    getBusinessMetrics: (function(response) {
      return $http.get('json/businessMetrics.json')
        .then(function(response) {
          return response.data;
        });
    })(),
    getBusinessMetricsInfo: (function(response) {
      return $http.get('json/businessMetrics_info.json')
        .then(function(response) {
          return response.data;
        });
    })()
  };
  return businessMetricsService;
}]);
