var date1 = new Date('1997.05.14').getTime() / 1000;
var date2 = new Date('2015.12.15').getTime() / 1000;
var max_val = 10000000;
var min_val = 100000000;

// for dates
$(function() {
    $( "#slider-range" ).slider({
      animate:true,
      range: true,
      min: new Date('1997.05.14').getTime() / 1000,
      max: new Date('2015.12.15').getTime() / 1000,
      step: 86400,
      values: [date1, date2],
      stop: function( event, ui ) {
        $( "#amount" ).val( (new Date(ui.values[ 0 ] *1000).toDateString() ) + " -- " + (new Date(ui.values[ 1 ] *1000)).toDateString() );
        date1 = $( "#slider-range" ).slider( "values", 0 ) * 1000;
        date2 = $( "#slider-range" ).slider( "values", 1 ) * 1000;

        var scale = d3.scale.linear()
            .domain([min_val, max_val])
            .range([0, MAX_BAR_HEIGHT]);

        var yScale = d3.scale.linear()
            .domain([d3.max(data, function(d) { return parseInt(d['raised_amount_usd']); }),0])
            .range([5,MAX_BAR_HEIGHT]);

         var xScale = d3.time.scale()
            .domain([date1, date2])    // values between for month of january
            .range([5, 805]);   // map these the the chart width = total width minus padding at both sides
        
        // yayay for more bad coding 
        d3.selectAll("svg > *").remove();

        svg.selectAll("rect")
            .data(data)
            .enter()

            .append("rect")
            .filter(function(d) { 
              return ((d.raised_amount_usd > raised_range[0]) && (d.raised_amount_usd < raised_range[1]))     
            })
            .attr("width", function() {
                return w / data.length;
            })
            .attr("height", function(d) {
                return scale(d.raised_amount_usd) + "px";
            })
            .attr("x", function(d,i) {
              var curDate = new Date(d.funded_at).getTime();
              return xScale(curDate) + "px";
            })

            .attr("y", function(d) {
                return h - scale(d.raised_amount_usd);
            })

            .attr("fill", function(d) {
              var fund_date = new Date(d.funded_at).getTime();
              if ((fund_date > date1) && (fund_date < date2)) {

                     if (d.funding_round_type == "seed") {
                        return "#edf8b1";
                    } else if (d.funding_round_type == "venture") {
                        if (d.funding_round_code == "A") {
                            return "#c7e9b4";
                        } else if (d.funding_round_code == "B") {
                            return "#7fcdbb";
                        } else if (d.funding_round_code == "C") {
                            return "#41b6c4";
                        } else if (d.fnding_round_code == "D") {
                            return "#1d91c0";
                        } else if (d.funding_round_code == "E") {
                            return "#225ea8";
                        } else if (d.funding_round_code == "F") {
                            return "#253494";
                        } else {
                            return "#081d58";
                        }
                    } else {                                            // angel
                        return "#ffffd9";
                    }
              }
                  else { 
                    return "#ffffff";}
            })
            .on('mouseover', function(d) {
                colorOver.call(this,d);
                tip.show(d);
            })
            .on('mouseout', function(d) {
                colorOut.call(this,d);
                tip.hide(d);
            });

            var xAxis = d3.svg.axis()
                .orient("bottom")
                .scale(xScale);

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("right");

            svg.append("g")
                .attr("transform", "translate(805,0)")
                .attr("class", "yaxis")
                .call(yAxis);

            svg.append("g")
                .attr("transform", "translate(0,500)")
                .attr("class", "xaxis")
                .call(xAxis);

      }
    });
    $( "#amount" ).val( (new Date($( "#slider-range" ).slider( "values", 0 )*1000).toDateString()) +
      " - " + (new Date($( "#slider-range" ).slider( "values", 1 )*1000)).toDateString());
});

// for moneyz
$(function() {
    $( "#amt-range" ).slider({
      animate: true,
      range: true,
      min: 0,
      max: 150000000,
      step: 5000000,
      values: [ 10000000, 100000000 ],
      stop: function( event, ui ) {
        $( "#raised" ).val( ui.values[ 0 ] + " - " + + ui.values[ 1 ] );
        raised_range[0] = $("#amt-range").slider( "values", 0);
        raised_range[1] = $("#amt-range").slider( "values", 1);

        date1 = $( "#slider-range" ).slider( "values", 0 ) * 1000;
        date2 = $( "#slider-range" ).slider( "values", 1 ) * 1000;

        min_val = raised_range[0];
        max_val = raised_range[1];


        var scale = d3.scale.linear()
            .domain([min_val, max_val])
            .range([0, MAX_BAR_HEIGHT]);

        var xScale = d3.time.scale()
            .domain([date1, date2])    // values between for month of january
            .range([5, 805]);


        var yScale = d3.scale.linear()
            .domain([max_val, min_val])
            .range([5,MAX_BAR_HEIGHT]);

        // doing some bad coding here
        d3.selectAll("svg > *").remove();

       

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .filter(function(d) { 
              if ((d.raised_amount_usd > raised_range[0]) && (d.raised_amount_usd < raised_range[1])) {
                return d;
              }
            })
            .attr("width", function() {
                return w / data.length;
            })
            .attr("height", function(d) {
                return scale(d.raised_amount_usd) + "px";
            })
            .attr("x", function(d,i) {
              var curDate = new Date(d.funded_at).getTime();
              return xScale(curDate) + "px";
            })
            .attr("y", function(d) {
                return h - scale(d.raised_amount_usd);
            })

            .attr("fill", function(d) {
              if ((d.raised_amount_usd > raised_range[0]) && (d.raised_amount_usd < raised_range[1])) {
                     if (d.funding_round_type == "seed") {
                        return "#edf8b1";
                    } else if (d.funding_round_type == "venture") {
                        if (d.funding_round_code == "A") {
                            return "#c7e9b4";
                        } else if (d.funding_round_code == "B") {
                            return "#7fcdbb";
                        } else if (d.funding_round_code == "C") {
                            return "#41b6c4";
                        } else if (d.fnding_round_code == "D") {
                            return "#1d91c0";
                        } else if (d.funding_round_code == "E") {
                            return "#225ea8";
                        } else if (d.funding_round_code == "F") {
                            return "#253494";
                        } else {
                            return "#081d58";
                        }
                    } else {                                            // angel
                        return "#ffffd9";
                    }
              }
                  else { 
                    return "#ffffff";}
            })
            .on('mouseover', function(d) {
                colorOver.call(this,d);
                tip.show(d);
            })
            .on('mouseout', function(d) {
                colorOut.call(this,d);
                tip.hide(d);
            });

             svg.append("rect")
              .attr("width", 100)
              .attr("height",800)
              .attr("fill","#ffffff")
              .attr("x",805)
              .attr("y",0);

            // define the y axis
            var xAxis = d3.svg.axis()
                .orient("bottom")
                .scale(xScale);

            var yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("right");

            svg.append("g")
                .attr("transform", "translate(805,0)")
                .attr("class", "yaxis")
                .transition()
                .duration(500)
                .ease("linear")
                .call(yAxis);

            svg.append("g")
                .attr("transform", "translate(0,500)")
                .attr("class", "xaxis")
                .call(xAxis);
      }
    });
    $( "#raised" ).val($( "#amt-range" ).slider( "values", 0 ) +
              "-" + $( "#amt-range" ).slider( "values", 1 ));
});
