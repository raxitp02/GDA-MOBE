myApp.directive('barChart', function($http) {
  return {
    restrict: 'AE',
    scope: {
      data: '=',
      xdata: '@',
      ydata: '@'
    },
    template: '<div id="samplebar" class="chart-container2"></div>',
    link: function(scope) {
      scope.$watch('data', function(newVal) {
        var data = newVal;
        var xData = scope.xdata;
        var yData = scope.ydata;
        if (data) {
          var margin = {
              top: 40,
              right: 20,
              bottom: 30,
              left: 40
            },
            width = 330 - margin.left - margin.right,
            height = 280 - margin.top - margin.bottom;

          var formatPercent = d3.format(".0");

          var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

          var y = d3.scale.linear()
            .range([height, 0]);

          var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

          var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);

          var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0.5])
            .html(function(d) {
              return "<strong></strong> <span style='color:red'>" + d[yData] + "</span>";
            })

          if (data) {
            var svg = d3.select("#samplebar").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          }

          svg.call(tip);

          x.domain(data.map(function(d) {
            return d[xData];
          }));
          y.domain([0, d3.max(data, function(d) {
            return d[yData];
          })]);

          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

          svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("dy", ".5em")
            .style("text-anchor", "end")
          //.text("Agents_Using_Platform");

          svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
              return x(d[xData]);
            })
            .attr("width", x.rangeBand())
            .attr("y", function(d) {
              return y(d[yData]);
            })
            .attr("height", function(d) {
              return height - y(d[yData]);
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)

          function type(d) {
            d[yData] = +d[yData];
            return d;
          }
        }
      }, true);

    }
  };
});