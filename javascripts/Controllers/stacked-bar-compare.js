var margin = {top: 25, right: 45, bottom: 55, left: 55},
        w = 500 - margin.left - margin.right,
        h = 280 - margin.top - margin.bottom;
var padding = 10;

var colors =  [["Apps", "#377EB8"],
         ["Agents_Using_Platform", "#4DAF4A"]];

var dataset = [
   {
      "Launch_TimeFrame":"Jun-13",
      "Channel":"Banca",
      "GSP":"Russia",
      "Program_to_Date":"345672",
      "Quotes":"3377",
      "Apps":"1658",
      "Quote_to_App_Conversion_Rate":"49",
      "Issued_Premium_USD":"22,000",
      "Agents_Using_Platform":"142.95"
   },
   {
      "Launch_TimeFrame":"Jun-13",
      "Channel":"DTC",
      "GSP":"USSD",
      "Program_to_Date":"195861",
      "Quotes":"2498",
      "Apps":"1943",
      "Quote_to_App_Conversion_Rate":"78",
      "Issued_Premium_USD":"21,000",
      "Agents_Using_Platform":"305"
   },
   {
      "Launch_TimeFrame":"Aug-14",
      "Channel":"Agency",
      "GSP":"Columbia",
      "Program_to_Date":"521077",
      "Quotes":"1731.8",
      "Apps":"1330",
      "Quote_to_App_Conversion_Rate":"8",
      "Issued_Premium_USD":"4,000,000",
      "Agents_Using_Platform":"2223"
   },
   {
      "Launch_TimeFrame":"Nov-14",
      "Channel":"Banca",
      "GSP":"Vietnam",
      "Program_to_Date":"72754",
      "Quotes":"1871",
      "Apps":"194",
      "Quote_to_App_Conversion_Rate":"10",
      "Issued_Premium_USD":"0",
      "Agents_Using_Platform":"3058"
   },
   {
      "Launch_TimeFrame":"Oct-14",
      "Channel":"DTC",
      "GSP":"China-ADD",
      "Program_to_Date":"9264",
      "Quotes":"531",
      "Apps":"20",
      "Quote_to_App_Conversion_Rate":"4",
      "Issued_Premium_USD":"5,000",
      "Agents_Using_Platform":""
   },
   {
      "Launch_TimeFrame":"Aug-15",
      "Channel":"Group",
      "GSP":"CAT",
      "Program_to_Date":"507",
      "Quotes":"419",
      "Apps":"88",
      "Quote_to_App_Conversion_Rate":"21",
      "Issued_Premium_USD":"0",
      "Agents_Using_Platform":"4640"
   },
   {
      "Launch_TimeFrame":"May-16",
      "Channel":"Group",
      "GSP":"Banca Gulf",
      "Program_to_Date":"235",
      "Quotes":"14",
      "Apps":"7",
      "Quote_to_App_Conversion_Rate":"50",
      "Issued_Premium_USD":"0",
      "Agents_Using_Platform":"40"
   }
];

var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0, w], 0.001); 
// ternary operator to determine if Agents_Using_Platform or Apps has a larger scale
var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset, function(d) { return (d.Apps > d.Program_to_Date) ? d.Apps : d.Program_to_Date;})]) 
        .range([h, 0]);
var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickFormat(function(d) { return dataset[d].GSP; })
        .orient("bottom");
var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

var commaFormat = d3.format(',');

//SVG element
var svg = d3.select("#searchVolume")
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
    .attr("class","set")
    .attr("transform",function(d,i){
         return "translate(" + xScale(i) + ",0)";
     }) ;

sets.append("rect")
    .attr("class","Apps")
  .attr("width", xScale.rangeBand()/2)
  .attr("y", function(d) {
    return yScale(d.Apps);
  })
    .attr("x", xScale.rangeBand()/2)
    .attr("height", function(d){
        return h - yScale(d.Apps);
    })
  .attr("fill", colors[0][1])
  .on("mouseover", function(d,i) {
    //Get this bar's x/y values, then augment for the tooltip
    var xPosition = parseFloat(xScale(i) + xScale.rangeBand() );
    var yPosition = h / 2;
    //Update Tooltip Position & value
    d3.select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")
      .select("#QuotesVal")
      .text(d.Quotes);
    d3.select("#tooltip")
      .select("#volVal")
      .text(commaFormat(d.Apps));
    d3.select("#tooltip")
      .select("#GSP")
      .style("color", colors[1][1])
      .text(d.GSP);
    d3.select("#tooltip").classed("hidden", false);
  })
  .on("mouseout", function() {
    //Remove the tooltip
    d3.select("#tooltip").classed("hidden", true);
  })
    ;

sets.append("rect")
    .attr("class","Agents_Using_Platform")
  .attr("width", xScale.rangeBand()/2)
  .attr("y", function(d) {
    return yScale(d.Agents_Using_Platform);
  })
    .attr("height", function(d){
        return h - yScale(d.Agents_Using_Platform);
    })
  .attr("fill", colors[1][1])
  .on("mouseover", function(d,i) {
    //Get this bar's x/y values, then augment for the tooltip
    var xPosition = parseFloat(xScale(i) + xScale.rangeBand() );
    var yPosition = h / 2;
    //Update Tooltip Position & value
    d3.select("#tooltip")
      .style("left", xPosition + "px")
      .style("top", yPosition + "px")
      .select("#QuotesVal")
      .text(d.Quotes);
    d3.select("#tooltip")
      .select("#volVal")
      .text(commaFormat(d.Agents_Using_Platform));
    d3.select("#tooltip")
      .select("#GSP")
      .style("color", colors[1][1])
      .text(d.GSP);
    d3.select("#tooltip").classed("hidden", false);
  })
  .on("mouseout", function() {
    //Remove the tooltip
    d3.select("#tooltip").classed("hidden", true);
  })
  ;
  
// Labels
sets.append("text")
  .attr("class", "Apps")
  .attr("width", xScale.rangeBand()/2)
  .attr("y", function(d) {
    return yScale(d.Apps);
    })
    .attr("dy", 0)
    .attr("dx", (xScale.rangeBand()/1.60) )
//  .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif") 
    .attr("font-size", "8px")
    .attr("fill", "black")
  .text(function(d) {
    return commaFormat(d.Apps);
    });   
  
sets.append("text")
  .attr("class", "Agents_Using_Platform")
  .attr("y", function(d) {
    return yScale(d.Agents_Using_Platform);
    })
    .attr("dy",0)
    .attr("dx",(xScale.rangeBand() / 4) - 10)
//  .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif") 
    .attr("font-size", "8px")
    .attr("fill", "red")
  .text(function(d) {
    return commaFormat(d.Agents_Using_Platform);
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
    })
    ;
// yAxis
svg.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(0 ,0)")
  .call(yAxis)
  ;
// xAxis label
svg.append("text") 
  .attr("transform", "translate(" + (w / 2) + " ," + (h + margin.bottom - 1) +")")
  .style("text-anchor", "middle")
  .text("GSP");
//yAxis label
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (h / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("# of Searches");

// Title
svg.append("text")
    .attr("x", (w / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Agents_Using_Platform & Apps Searches");

// add legend   
var legend = svg.append("g")
    .attr("class", "legend")
//    .attr("x", w - 65)
//    .attr("y", 50)
//    .attr("height", 100)
//    .attr("width", 100)
    .attr("transform", "translate(30,10)")
    ;
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

function updateBars()
{ 
    svg.selectAll(".Apps").remove();
  svg.selectAll(".Agents_Using_Platform").transition().duration(500).attr("width", xScale.rangeBand());
}
d3.select("#change").on("click", updateBars);