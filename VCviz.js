 //reading in the data
    var counter = 0; // I'm going to regret doing this

     var csv = d3.csv("https://dl.dropboxusercontent.com/s/9ol8vwnqba9qf8e/investments.csv?dl=0", function(data) {
    
     dataset = data;

    x0.domain(data.map(function(dataset) { return dataset.investor_name;})
      );

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start");
    })

    //define the margins
    var margin = {top: 100, right: 100, bottom: 200, left: 100},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
    .domain(function(csv) {return csv.investor_name})
    .rangePoints([0, width]);

    console.log("timeline done")

    var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("top");

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");