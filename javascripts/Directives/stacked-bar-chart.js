myApp.directive('stackedBarChart', function($http, $timeout) {
  return {
    restrict: 'AE',
    scope: {
      data: '=',
      xdata: '@',
      ydata: '@',
      barData1: '@',
      barData2: '@'
    },
    template: '<div id="barChart" class="chart-container1"></div>',
    link: function(scope) {

      scope.$watch('data', function(newVal) {
        if (newVal) {
          var dataset = newVal;
          var xData = scope.xdata;
          var yData = scope.ydata;
          var barData1 = scope.barData1;
          var barData2 = scope.barData2;

          var margin = {
              top: 25,
              right: 55,
              bottom: 45,
              left: 45
            },
            w = 370 - margin.left - margin.right,
            h = 280 - margin.top - margin.bottom;
          var padding = 10;

          var colors = [
            [barData1, "blue"],
            [barData2, "lightblue"]
          ];

          
          var xScale = d3.scale.ordinal()
            .domain(d3.range(dataset.length))
            .rangeRoundBands([0, w], 0.05);
          // ternary operator to determine if global or local has a larger scale
          var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) {
              return (d[yData] > d[barData2]) ? d[yData] : d[barData2];
            })])
            .range([h, 0]);
          var xAxis = d3.svg.axis()
            .scale(xScale)
            .tickFormat(function(d) {
              return dataset[d][xData];
            })
            .orient("bottom");
          var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient("left")
            .ticks(5);

          var commaFormat = d3.format(',');

          //SVG element
          var svg = d3.select("#barChart")
            .append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          // Graph Bars
          var sets = svg.selectAll(".set")
            .data(dataset)
            .enter()
            .append("g")
            .attr("class", "set")
            .attr("transform", function(d, i) {
              return "translate(" + xScale(i) + ",0)";
            });

          sets.append("rect")
            .attr("class", "Apps")
            .attr("width", xScale.rangeBand() / 2)
            .attr("y", function(d) {
              return yScale(d[barData1]);
            })
            .attr("x", xScale.rangeBand() / 2)
            .attr("height", function(d) {
              return h - yScale(d[barData1]);
            })
            .attr("fill", colors[0][1]);

          sets.append("rect")
            .attr("class", "Quotes")
            .attr("width", xScale.rangeBand() / 2)
            .attr("y", function(d) {
              return yScale(d[barData2]);
            })
            .attr("height", function(d) {
              return h - yScale(d[barData2]);
            })
            .attr("fill", colors[1][1]);

          // xAxis
          svg.append("g") // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (h) + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".2em")
            .attr("transform", function(d) {
              return "rotate(-25)";
            });
          // yAxis
          svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(0 ,0)")
            .call(yAxis);
          // xAxis label
          svg.append("text")
            .attr("transform", "translate(" + (w / 2) + " ," + (h + margin.bottom - 5) + ")")
            .style("text-anchor", "middle")
            .text(barData1 +" / " +barData2)
          //yAxis label
          svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (h / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle");

        };
      }, true);
    }
  };
});