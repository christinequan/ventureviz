const MAX_BAR_HEIGHT = 500;
var data;
var h = MAX_BAR_HEIGHT;
var w = 800;
var investor_string = "Investor."
var svg = d3.select("body").append("svg")
        .attr('class', 'svg')
        .attr("width", w)
        .attr("height", h);

function initialize() {
	
    // Add an svg element to the DOM
    // var svg = d3.select("body").append("svg")
    


    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            var company = d.company_name;
            var response = "<h3>" + company + "</h3>";
            response += d.funding_round_type + " " + d.funding_round_code + " " + d.raised_amount_usd + "<br>";
            response += "<h4>Investors</h4>";
            for (var i = 1; i < 27; i++) {
                var property = String(investor_string + i);
                if (d[property] === "NA") break;
                console.log(d[property]);
                response += d[property] + "<br>";
            }
            console.log(company);
            console.log(d);

            return response;
        });

    svg.call(tip);

    var biotechURL = "https://dl.dropboxusercontent.com/s/y0ahauamgtshh13/biotechnology_usa.csv?dl=0"
    var cleantechURL = "https://dl.dropboxusercontent.com/s/5imaxqfwh5fb7so/cleantechnology_usa.csv?dl=0"
    var curatedwebURL = "https://dl.dropboxusercontent.com/s/1gih7rk2bsyey6a/curatedweb_usa.csv?dl=0"
    var enterpriseURL = "https://dl.dropboxusercontent.com/s/znutk7ft6uimuec/e-commerce_usa.csv?dl=0"
    var ecommerceURL = "https://dl.dropboxusercontent.com/s/nnecx5mxyug3mrz/enterprisesoftware_usa.csv?dl=0"
    var hardwareURL = "https://dl.dropboxusercontent.com/s/miu5se5mbdarld2/hardwareandsoftware_usa.csv?dl=0"
    var healthURL = "https://dl.dropboxusercontent.com/s/0ji157ozgkvdjrf/healthcare_usa.csv?dl=0"
    var mobileURL = "https://dl.dropboxusercontent.com/s/k16eh23dve8qdys/mobile_usa.csv?dl=0"
    var securityURL =   "https://dl.dropboxusercontent.com/s/aqfzq94aei9smwv/security_usa.csv?dl=0"
    var semiconductorsURL = "https://dl.dropboxusercontent.com/s/xgxzsfz0ht20r4x/semiconductors_usa.csv?dl=0"
    var softwareURL = "https://dl.dropboxusercontent.com/s/3pvyvhrtf128z4y/software_usa.csv?dl=0"


    /* Preload all of the industry data into objects */
    var biotechData, cleantechData, curatedwebData, enterpriseData, ecommerceData, hardwareData, healthData, mobileData, securityData, semiconductorsData, softwareData;

    function loadData() {
        queue()
        .defer(d3.csv, biotechURL)
        .defer(d3.csv, cleantechURL)
        .defer(d3.csv, curatedwebURL)
        .defer(d3.csv, enterpriseURL)
        .defer(d3.csv, ecommerceURL)
        .defer(d3.csv, hardwareURL)
        .defer(d3.csv, healthURL)
        .defer(d3.csv, mobileURL)
        .defer(d3.csv, securityURL)
        .defer(d3.csv, semiconductorsURL)
        .defer(d3.csv, softwareURL)
        .await(visualizeData);
    }

    loadData();


    function visualizeData(error, biotechData_L, cleantechData_L, curatedwebData_L, enterpriseData_L, ecommerceData_L, hardwareData_L, healthData_L, mobileData_L, securityData_L, semiconductorsData_L, softwareData_L) {
        if (error) throw error;
        biotechData = biotechData_L;
        cleantechData = cleantechData_L;
        curatedwebData = curatedwebData_L;
        enterpriseData = enterpriseData_L;
        ecommerceData = ecommerceData_L;
        hardwareData = hardwareData_L;
        healthData = healthData_L;
        mobileData = mobileData_L;
        securityData = securityData_L;
        semiconductorsData = semiconductorsData_L;
        softwareData = softwareData_L;

        console.log(biotechData);
    }
    // Changes colors

    function colorOver(d){
        d3.select(this).style('fill','grey');
    }

    function colorOut(d) {
        var rect = d3.select(this);
        rect.style("fill", function(d) {
            return d.color;
        });
    }

    // Changes the view to the correct industry
    function loadView(clicked_id) {
        console.log(clicked_id);
        var data;
        switch(clicked_id) {
            case 'biotech': data = biotechData; break;
            case 'cleantech': data = cleantechData; break;
            case 'enterprise': data = enterpriseData; break;
            case 'ecommerce': data = ecommerceData; break;
            case 'gaming': data = gamingData; break;
            case 'hardware': data = hardwareData; break;
            case 'health': data = healthData; break;
            case 'mobile': data = mobileData; break;
            case 'security': data = securityData; break;
            case 'semiconductors': data = semiconductorsData; break;
            case 'software': data = softwareData; break;
        }

        var scale = d3.scale.linear()
            .domain([0, d3.max(data, function(d) { return parseInt(d['raised_amount_usd']); })])
            .range([0, MAX_BAR_HEIGHT]);

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
                    console.log(d.funding_round_type)
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
}