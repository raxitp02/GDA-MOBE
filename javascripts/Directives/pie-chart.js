myApp.directive('pieChart', function($http) {
  return {
    restrict: 'AE',
    scope: {
      data: '=',
      pieData: '@'
    },
    template: '<div id="chartPie" class="chart-container3"></div>',
    link: function(scope) {
      scope.$watch('data', function(newVal) {
        var data = newVal;
        var pieData = scope.pieData;
        if (data) {
          var canvas = d3.select('#chartPie')
            .append('svg')
            .attr({
              'width': 330,
              'height': 280
            });

          var colors = ['#377EB8', '#4DAF4A'];

          var colorscale = d3.scale.linear().domain([0, data.length]).range(colors);

          var arc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(130);

          var arcOver = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(100 + 40);

          var pie = d3.layout.pie()
            .value(function(d) {
              return d[pieData];
            });


          var renderarcs = canvas.append('g')
            .attr('transform', 'translate(150,140)')
            .selectAll('.arc')
            .data(pie(data))
            .enter()
          
            .append('g')
            .attr('class', "arc");

          renderarcs.append('path')
            .attr('d', arc)
            .attr('fill', function(d, i) {
              return colorscale(i);
            })
            .on("mouseover", function(d) {
              d3.select(this).transition()
                .duration(1000)
                .attr("d", arcOver);

            })
            .on("mouseout", function(d) {
              d3.select(this).transition()
                .duration(1000)
                .attr("d", arc);
            });

          renderarcs.append('text')

            .attr('transform', function(d) {
              var c = arc.centroid(d);

              return "translate(" + c[0] + "," + c[1] + ")";
            })
            .attr("text-anchor", "end")

            .text(function(d) {
              return d.value;
            });
        }



      }, true);

    }
  };
});