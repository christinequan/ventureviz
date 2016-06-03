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

/*

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

*/