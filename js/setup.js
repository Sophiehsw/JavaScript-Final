//Set up basemap
var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


// Everything on miniSidebar1: "Price to Rent"
// Import Carto CSS
var CARTOCSS = [
  'Map {',
  '-torque-frame-count: 128;',
  '-torque-animation-duration: 30;',
  '-torque-time-attribute: "date";',
  '-torque-aggregation-function: "CDB_Math_Mode(pricetorent)";',
  '-torque-resolution: 4;',
  '-torque-data-aggregation: linear;',
  '}',
  '#zipnew {',
  'marker-width: 7;',
  'marker-fill-opacity: 1;',
  'marker-line-width: 1;',
  'marker-line-color: #FFF;',
  'marker-line-opacity: 1;',
  'comp-op: lighter;',
  '}',
  '#zipnew[frame-offset=1] {',
  'marker-width: 9;',
  'marker-fill-opacity: 0.5;',
  '}',
  '#zipnew[frame-offset=2] {',
  'marker-width: 11;',
  'marker-fill-opacity: 0.25;',
  '}',
  '#zipnew[value>=5] {',
   'marker-fill: #800026;',
  '}',
  '#zipnew[value>=7] {',
   'marker-fill: #BD0026;',
  '}',
  '#zipnew[value>=8] {',
   'marker-fill: #E31A1C;',
  '}',
  '#zipnew[value>=10] {',
   'marker-fill: #FC4E2A;',
  '}',
  '#zipnew[value>=13] {',
   'marker-fill: #FD8D3C;',
  '}',
  '#zipnew[value>=15] {',
   'marker-fill: #FEB24C;',
  '}',
  '#zipnew[value>=25] {',
   'marker-fill: #FED976;',
  '}',
].join('\n');
// Create the actual layer to be used
var torqueLayer = new L.TorqueLayer({
  user: 'sophiehsw',
  tale:'zipnew',
  cartocss: CARTOCSS,
  sql_query:"SELECT * FROM zipnew;"
});
torqueLayer.addTo(map);
// On timechange, update the HTML which hovers over the upper right of the map
torqueLayer.on('change:time', function(d) {
  var time = $('<h3>').text('Date - ' + moment(d.time).format('LL'));
  $('div#time-window div').empty();
  $('#time-window div').append(time);
    console.log(d);
});
// pageOne: click to show or stop animation
  var pageOne = function() {
    $( "#Animation" ).click(function() {
      torqueLayer.stop();
      torqueLayer.setSQL("SELECT * FROM zipnew");
      torqueLayer.play();
      $('#time-window').empty();
      $('#time-window')
      .append($('<h1>').text('Price to Rent Ratio in'))
      .append($('<div>'));
      $('#legend').show();
    });
    $( "#Stop" ).click(function() {
        torqueLayer.stop();
      });
    };
// Final set up on "Price to Rent"
var showSidebar1 = function(event) {
  $('#sidebar1').show();
  $('#sidebar2').hide();
  $('#sidebar3').hide();
  removeData();
  removeAllData();
  torqueLayer.addTo(map);
  pageOne();
  $('#time-window').show();
  $('#intro').show();
  $('#results').hide();
};


// Everything on miniSidebar: "By Category"
//Import data
var dataset1 = "https://raw.githubusercontent.com/Sophiehsw/JavaScript-Final/master/zipPolyFinal.geojson";
var featureGroup1
var featureGroup2
var featureGroup3
var featureGroup4
var featureGroup5
var featureGroup6
//checkBox1
function getColor1(d) {
    return d == "less than 10" ? '#e09fac' :
           '#edede3';
}
function myStyle1(feature) {
    return {
        fillColor: getColor1(feature.properties.PrcR17C),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
var myFilter1 = function(feature) {
  if(feature.properties.PrcR17C == "less than 10"){return true;}
;}
// adding layers
$('#checkBox1').on('change', function() {
  var isChecked = $(this).is(':checked');
  if (isChecked) {
  $.ajax(dataset1).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup1 = L.geoJson(parsedData, {
      style: myStyle1,
      filter: myFilter1
    }).addTo(map);
  });
  } else {
    map.removeLayer(featureGroup1);
  }
})
//checkBox2
function getColor2(d) {
    return d == "more than 33000" ? '#af9cce' :
           '#edede3';
}
function myStyle2(feature) {
    return {
        fillColor: getColor2(feature.properties.popC),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
var myFilter2 = function(feature) {
  if(feature.properties.popC == "more than 33000"){return true;}
;}
// adding layers
$('#checkBox2').on('change', function() {
  var isChecked = $(this).is(':checked');
  if (isChecked) {
  $.ajax(dataset1).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup2 = L.geoJson(parsedData, {
      style: myStyle2,
      filter: myFilter2
    }).addTo(map);
  });
  } else {
    map.removeLayer(featureGroup2);
  }
})
//checkBox3
function getColor3(d) {
    return d == "positive" ? '#b0bee8' :
           '#edede3';
}
function myStyle3(feature) {
    return {
        fillColor: getColor3(feature.properties.ppchngC),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
var myFilter3 = function(feature) {
  if(feature.properties.ppchngC == "positive"){return true;}
;}
// adding layers
$('#checkBox3').on('change', function() {
  var isChecked = $(this).is(':checked');
  if (isChecked) {
  $.ajax(dataset1).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup3 = L.geoJson(parsedData, {
      style: myStyle3,
      filter: myFilter3
    }).addTo(map);
  });
  } else {
    map.removeLayer(featureGroup3);
  }
})
//checkBox4
function getColor4(d) {
    return d == "less than 35" ? '#a2d8d4' :
           '#edede3';
}
function myStyle4(feature) {
    return {
        fillColor: getColor4(feature.properties.medageC),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
var myFilter4 = function(feature) {
  if(feature.properties.medageC == "less than 35"){return true;}
;}
// adding layers
$('#checkBox4').on('change', function() {
  var isChecked = $(this).is(':checked');
  if (isChecked) {
  $.ajax(dataset1).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup4 = L.geoJson(parsedData, {
      style: myStyle4,
      filter: myFilter4
    }).addTo(map);
  });
  } else {
    map.removeLayer(featureGroup4);
  }
})
//checkBox5
function getColor5(d) {
    return d == "less than 154000" ? '#aaba93' :
           '#edede3';
}
function myStyle5(feature) {
    return {
        fillColor: getColor5(feature.properties.medprcC),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
var myFilter5 = function(feature) {
  if(feature.properties.medprcC == "less than 154000"){return true;}
;}
// adding layers
$('#checkBox5').on('change', function() {
  var isChecked = $(this).is(':checked');
  if (isChecked) {
  $.ajax(dataset1).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup5 = L.geoJson(parsedData, {
      style: myStyle5,
      filter: myFilter5
    }).addTo(map);
  });
  } else {
    map.removeLayer(featureGroup5);
  }
})
//checkBox6
function getColor6(d) {
    return d == "less than 0.5" ? '#e5c4b0' :
           '#edede3';
}
function myStyle6(feature) {
    return {
        fillColor: getColor6(feature.properties.crimeC),
        weight: 2,
        opacity: 0.5,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
var myFilter6 = function(feature) {
  if(feature.properties.crimeC == "less than 0.5"){return true;}
;}
// adding layers
$('#checkBox6').on('change', function() {
  var isChecked = $(this).is(':checked');
  if (isChecked) {
  $.ajax(dataset1).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup6 = L.geoJson(parsedData, {
      style: myStyle6,
      filter: myFilter6
    }).addTo(map);
  });
  } else {
    map.removeLayer(featureGroup6);
  }
})

// Final set up on "by Category"
var showSidebar2 = function(event) {
  $('#sidebar1').hide();
  $('#sidebar2').show();
  $('#sidebar3').hide();
  map.removeLayer(torqueLayer);
  torqueLayer.stop();
  $('#time-window').hide();
  $('#Carto-popup').hide();
  $('#legend').hide();
  removeData();
  uncheck();
  $('#intro').show();
  $('#results').hide();
};

// Everything on miniSidebar3: "Check Area"
//Import data
var dataset2 = "https://raw.githubusercontent.com/Sophiehsw/JavaScript-Final/master/zipnewsmall.geojson";

// pageOne: click to show information about each data point
var pageThree = function(layer) {
  layer.on('click', function (event) {
    document.getElementsByClassName('PrictR17')[0].innerHTML = layer.feature.properties.PrctRn17;
    document.getElementsByClassName('Zipcode')[0].innerHTML = layer.feature.properties.zipcode
    document.getElementsByClassName('pop')[0].innerHTML = layer.feature.properties.pop
    document.getElementsByClassName('popchng')[0].innerHTML = layer.feature.properties.popchng
    document.getElementsByClassName('medpric')[0].innerHTML = layer.feature.properties.medpric
    document.getElementsByClassName('crime')[0].innerHTML = layer.feature.properties.crime
    console.log(layer.feature);
    $('#intro').hide();
    $('#results').show();
  });
};

// Final set up on "Check Area"
var showSidebar3 = function(event) {
  $('#sidebar1').hide();
  $('#sidebar2').hide();
  $('#sidebar3').show();
  map.removeLayer(torqueLayer);
  torqueLayer.stop();
  $('#time-window').hide();
  $('#legend').hide();
  $.ajax(dataset2).done(function(data) {
    var parsedData2 = JSON.parse(data);
    featureGroup = L.geoJson(parsedData2, {
      //style: myStyle,
      //filter: myFilter
    }).addTo(map);
    featureGroup.eachLayer(pageThree);
  });
  removeAllData();
};

//Enter to content
var content = function() {
  $('#slide1').hide();
  $('#slide2').show();
  $('#sidebar1').show();
  $('#sidebar2').hide();
  $('#sidebar3').hide();
  $('#legend').hide();
  showSidebar1();
}

//Activate each page by cover page button and minisidebar buttons
$(".active").click(showSidebar1);
$(".miniside2").click(showSidebar2);
$(".miniside3").click(showSidebar3);
$("#start").click(content);

//Cover page
$(document).ready(function() {
  $('#slide1').show();
  $('#slide2').hide();
});

//Remove layer for each each page
  var removeData = function(){
    if (typeof featureGroup !== 'undefined') {
      map.removeLayer(featureGroup);
    }
  };
  var removeData1 = function(){
    if (typeof featureGroup1 !== 'undefined' ){
      map.removeLayer(featureGroup1);
    }
  };
  var removeData2 = function(){
    if (typeof featureGroup2 !== 'undefined' ){
      map.removeLayer(featureGroup2);
    }
  };
  var removeData3 = function(){
    if (typeof featureGroup3 !== 'undefined' ){
      map.removeLayer(featureGroup3);
    }
  };
  var removeData4 = function(){
    if (typeof featureGroup4 !== 'undefined' ){
      map.removeLayer(featureGroup4);
    }
  };
  var removeData5 = function(){
    if (typeof featureGroup5 !== 'undefined' ){
      map.removeLayer(featureGroup5);
    }
  };
  var removeData6 = function(){
    if (typeof featureGroup6 !== 'undefined' ){
      map.removeLayer(featureGroup6);
    }
  };
  var removeAllData = function(){
    removeData1();
    removeData2();
    removeData3();
    removeData4();
    removeData5();
    removeData6();
  };

//Uncheck
var uncheck = function(){
  document.getElementById("checkBox1").checked = false;
  document.getElementById("checkBox2").checked = false;
  document.getElementById("checkBox3").checked = false;
  document.getElementById("checkBox4").checked = false;
  document.getElementById("checkBox5").checked = false;
  document.getElementById("checkBox6").checked = false;
}
