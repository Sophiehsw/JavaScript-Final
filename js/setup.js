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

var CARTOCSS = [
  'Map {',
  '-torque-frame-count: 256;',
  '-torque-animation-duration: 30;',
  '-torque-time-attribute: "date";',
  '-torque-aggregation-function: "CDB_Math_Mode(value)";',
  '-torque-resolution: 4;',
  '-torque-data-aggregation: linear;',
  '}',
  '#layer {',
  'marker-width: 7;',
  'marker-fill: ramp([value], (#855C75, #D9AF6B, #AF6458, #736F4C, #526A83, #625377, #68855C, #9C9C5E, #A06177, #8C785D, #467378, #7C7C7C), (1, 2, 3, 4, 5, 6, 7, 8, 9, 10), "=");',
  'marker-fill-opacity: 1;',
  'marker-line-width: 1;',
  'marker-line-color: #FFFFFF;',
  'marker-line-opacity: 1;',
  'comp-op: lighter;',
  '}',
  '#layer[frame-offset=1] {',
  'marker-width: 9;',
  'marker-fill-opacity: 0.5;',
  '}',
  '#layer[frame-offset=2] {',
  'marker-width: 11;',
  'marker-fill-opacity: 0.25;',
  '}',
].join('\n');


// Create the actual layer to be used
var torqueLayer = new L.TorqueLayer({
  user: 'sophiehsw',
  cartocss: CARTOCSS
});
torqueLayer.addTo(map);

// On timechange, update the HTML which hovers over the upper right of the map
torqueLayer.on('change:time', function(d) {
  $('#time-window').empty();
  $('#time-window')
    .append($('<h1>').text('Date - 2015-12-0'))
    .append($('<div>'));
    console.log(d);
});

// We'll just create some buttons for the first 7 days of cab data

  var button = $('<button>')
    .addClass('btn')
    .addClass('btn-default')
    .text('Play timeline for December ' + num)
    .click(function() {

      torqueLayer.stop();
      torqueLayer.setSQL("SELECT * FROM zipnew");
      torqueLayer.play();
    });
  $('#button-container').append(button);





var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

var showSidebar1 = function() {
  $('#sidebar1').show();
  $('#sidebar2').hide();
  $('#sidebar3').hide();
};

var showSidebar2 = function() {
  $('#sidebar1').hide();
  $('#sidebar2').show();
  $('#sidebar3').hide();
};

var showSidebar3 = function() {
  $('#sidebar1').hide();
  $('#sidebar2').hide();
  $('#sidebar3').show();
};

$(".active").click(showSidebar1);
$(".miniside2").click(showSidebar2);
$(".miniside3").click(showSidebar3);

$(document).ready(function() {
    showSidebar1();
});
