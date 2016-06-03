
$(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: new Date('1997.05.14').getTime() / 1000,
      max: new Date('2015.12.15').getTime() / 1000,
      step: 86400,
      values: [ new Date('2011.01.01').getTime() / 1000, new Date('2013.02.01').getTime() / 1000 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( (new Date(ui.values[ 0 ] *1000).toDateString() ) + " - " + (new Date(ui.values[ 1 ] *1000)).toDateString() );
        
      }
    });
    $( "#amount" ).val( (new Date($( "#slider-range" ).slider( "values", 0 )*1000).toDateString()) +
      " - " + (new Date($( "#slider-range" ).slider( "values", 1 )*1000)).toDateString());
});

$(function() {
    $( "#amt-range" ).slider({
      range: true,
      min: 0,
      max: 150000000,
      step: 5000000,
      values: [ 10000000, 100000000 ],
      slide: function( event, ui ) {
        $( "#raised" ).val( ui.values[ 0 ] + " - " + + ui.values[ 1 ] );
        raised_range[0] = $("#amt-range").slider( "values", 0);
        raised_range[1] = $("#amt-range").slider( "values", 1);

        scale = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return parseInt(d['raised_amount_usd']); })])
            .range([0, MAX_BAR_HEIGHT]);
        
        // doing some bad coding here
        d3.selectAll("svg > *").remove();
        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("width", function() {
                return w / data.length;
            })
            .attr("height", function(d) {
                return scale(d.raised_amount_usd) + "px";
            })
            .attr("x", function(d, i) {
                return i * ((w / data.length) + 1);
            })
            .attr("y", function(d) {
                return h - scale(d.raised_amount_usd);
            })

            .attr("fill", function(d) {
              if ((d.raised_amount_usd > raised_range[0]) && (d.raised_amount_usd < raised_range[1])) {
                //console.log(d.raised_amount_usd)
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
      }
    });
    $( "#raised" ).val($( "#amt-range" ).slider( "values", 0 ) +
              "-" + $( "#amt-range" ).slider( "values", 1 ));
});
