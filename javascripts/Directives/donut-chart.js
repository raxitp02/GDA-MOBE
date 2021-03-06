myApp.directive('donutChart', function($http, $timeout) {
  return {
    restrict: 'AE',
    scope: {
      data: '=',
      xdata: '@',
      ydata: '@'
    },
    template: '<div id="chart" class="chart-container2 svg-container"></div>',
    link: function(scope) {

      scope.$watch('data', function(newVal) {
        if (newVal) {
          var dataset = newVal;
          var xData = scope.xdata;
          var ydata = scope.ydata;
          var pie = d3.layout.pie()
            .value(function(d) {
              return d[ydata];
            })
            .sort(null)
            .padAngle(.03);

          var w = 400,
            h = 400;

          var outerRadius = w / 2;
          var innerRadius = 140;

          var color = d3.scale.category10();

          var arc = d3.svg.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

          var svg = d3.select("#chart")
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 440 600")
            .classed("svg-content", true).append('g')
            .attr({
              transform: 'translate(' + w / 2 + ',' + h / 2 + ')',
              class: 'shadow'
            });
          var path = svg.selectAll('path')
            .data(pie(dataset))
            .enter()
            .append('path')
            .attr({
              d: arc,
              fill: function(d, i) {
                return color(d.data[xData]);
              }
            });

          path.transition()
            .duration(1000)
            .attrTween('d', function(d) {
              var interpolate = d3.interpolate({
                startAngle: 0,
                endAngle: 0
              }, d);
              return function(t) {
                return arc(interpolate(t));

              };
            });

          var restOfTheData = function() {
            var text = svg.selectAll('text')
              .data(pie(dataset))
              .enter()
              .append("text")
              .transition()
              .duration(200)
              .attr("transform", function(d) {
                return "translate(" + arc.centroid(d) + ")";
              })

              .attr("dy", "0.09em")
              .attr("text-anchor", "middle")
              .text(function(d) {
                return d.data[ydata] + "%";
              })
              .style({
                fill: '#000000',
                'font-size': '14px',
                'font-weight': 8000,
              });

            var legendRectSize = 20;
            var legendSpacing = 10;
            var legendHeight = legendRectSize + legendSpacing;


            var legend = svg.selectAll('.legend')
              .data(color.domain())
              .enter()
              .append('g')
              .attr({
                class: 'legend',
                transform: function(d, i) {
                  //Just a calculation for x & y position
                  return 'translate(-50,' + ((i * legendHeight) - 100) + ')';
                }
              });
            legend.append('rect')
              .attr({
                width: legendRectSize,
                height: legendRectSize,
                rx: 40,
                ry: 20
              })
              .style({
                fill: color,
                stroke: color
              });

            legend.append('text')
              .attr({
                x: 30,
                y: 15
              })
              .text(function(d) {
                return d;
              }).style({
                fill: '#803c00',
                'font-size': '15px'
              });
          };
         
            setTimeout(restOfTheData, 1000);
        };
      }, true);
    }
  };
});