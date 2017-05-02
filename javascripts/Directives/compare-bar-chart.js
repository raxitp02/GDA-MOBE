myApp.directive('compareBarChart', function($http) {
  return {
    restrict: 'AE',
    scope: {
      data: '=',
      xdata: '@',
      ydata: '@',
      barData1: '@',
      barData2: '@'
    },
    template: '<div id="compare-bar" class="chart-container2"></div>',
    link: function(scope) {
      scope.$watch('data', function(newVal) {
        var dataset = newVal;
        var barData1 = scope.barData1;
        var barData2 = scope.barData2;
        var xData = scope.xdata;
        var yData = scope.ydata;
        if (dataset) {
          var margin = {
              top: 25,
              right: 45,
              bottom: 55,
              left: 55
            },
            w = 500 - margin.left - margin.right,
            h = 280 - margin.top - margin.bottom;
          var padding = 10;

          var colors = [
            [barData1, "#377EB8"],
            [barData2, "#4DAF4A"]
          ];

          var xScale = d3.scale.ordinal()
            .domain(d3.range(dataset.length))
            .rangeRoundBands([0, w], 0.001);
          // ternary operator to determine if Agents_Using_Platform or Apps has a larger scale
          var yScale = d3.scale.linear()
            .domain([0, d3.max(dataset, function(d) {
              return (d[barData1] > d[yData]) ? d[barData1] : d[yData];
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
          var svg = d3.select("#compare-bar")
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
            .attr("fill", colors[0][1])
            .on("mouseover", function(d, i) {
              //Get this bar's x/y values, then augment for the tooltip
              var xPosition = parseFloat(xScale(i) + xScale.rangeBand());
              var yPosition = h / 2;
              //Update Tooltip Position & value
              d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#QuotesVal")
                .text(d.Quotes);
              d3.select("#tooltip")
                .select("#volVal")
                .text(commaFormat(d[barData1]));
              d3.select("#tooltip")
                .select("#GSP")
                .style("color", colors[1][1])
                .text(d[xData]);
              d3.select("#tooltip").classed("hidden", false);
            })
            .on("mouseout", function() {
              //Remove the tooltip
              d3.select("#tooltip").classed("hidden", true);
            });

          sets.append("rect")
            .attr("class", "Agents_Using_Platform")
            .attr("width", xScale.rangeBand() / 2)
            .attr("y", function(d) {
              return yScale(d[barData2]);
            })
            .attr("height", function(d) {
              return h - yScale(d[barData2]);
            })
            .attr("fill", colors[1][1])
            .on("mouseover", function(d, i) {
              //Get this bar's x/y values, then augment for the tooltip
              var xPosition = parseFloat(xScale(i) + xScale.rangeBand());
              var yPosition = h / 2;
              //Update Tooltip Position & value
              d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#QuotesVal")
                .text(d.Quotes);
              d3.select("#tooltip")
                .select("#volVal")
                .text(commaFormat(d[barData2]));
              d3.select("#tooltip")
                .select("#GSP")
                .style("color", colors[1][1])
                .text(d[xData]);
              d3.select("#tooltip").classed("hidden", false);
            })
            .on("mouseout", function() {
              //Remove the tooltip
              d3.select("#tooltip").classed("hidden", true);
            });

          // Labels
          sets.append("text")
            .attr("class", "Apps")
            .attr("width", xScale.rangeBand() / 2)
            .attr("y", function(d) {
              return yScale(d[barData1]);
            })
            .attr("dy", 0)
            .attr("dx", (xScale.rangeBand() / 2))
            //  .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black")
            .text(function(d) {
              return commaFormat(d[barData1]);
            });

          sets.append("text")
            .attr("class", "Agents_Using_Platform")
            .attr("y", function(d) {
              return yScale(d[barData2]);
            })
            .attr("dy", 0)
            .attr("dx", (xScale.rangeBand() / 4) - 0)
            //  .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .style("text-anchor", "middle")
            .attr("fill", "red")
            .text(function(d) {
              return commaFormat(d[barData2]);
            });

          // xAxis
          svg.append("g") // Add the X Axis
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (h) + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
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
            .attr("transform", "translate(" + (w / 2) + " ," + (h + margin.bottom - 1) + ")")
            .style("text-anchor", "middle")
            .text("GSP");
          //yAxis label
          svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (h / 2))
            .attr("dy", "2em")
            .style("text-anchor", "middle")


          // Title
          svg.append("text")
            .attr("x", (w / 2))
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(barData1 +" / " +barData2)

          // add legend   
          var legend = svg.append("g")
            .attr("class", "legend")
            .style("text-decoration", "underline")
            //    .attr("x", w - 65)
            //    .attr("y", 50)
            //    .attr("height", 100)
            //    .attr("width", 100)
            .attr("transform", "translate(-55,10)");
          var legendRect = legend.selectAll('rect').data(colors);

          legendRect.enter()
            .append("rect")
            .attr("x", w - 65)
            //  .attr("y", 0)                   // use this to flip horizontal
            .attr("width", 10)
            .attr("height", 10)
            .attr("y", function(d, i) {
              return i * 20;
            })
            //  .attr("x", function(d, i){return w - 65 - i * 70}) // use this to flip horizontal
            .style("fill", function(d) {
              return d[1];
            });

          var legendText = legend.selectAll('text').data(colors);

          legendText.enter()
            .append("text")
            .attr("x", w - 52)
            .attr("y", function(d, i) {
              return i * 20 + 9;
            })
            .text(function(d) {
              return d[0];
            });

          function updateBars() {
            svg.selectAll(".Apps").remove();
            svg.selectAll(".Agents_Using_Platform").transition().duration(500).attr("width", xScale.rangeBand());
          }
          d3.select("#change").on("click", updateBars);
        }
      }, true);

    }
  };
});