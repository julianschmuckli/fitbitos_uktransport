import document from "document";
import * as messaging from "messaging";
import { vibration } from "haptics";
import { geolocation } from "geolocation";

console.log("App Started");

var message_received = false;
var displayInMinutes = false;

var index = 1;
var GPSoptions = {
  enableHighAccuracy: true,
  maximumAge: 60000
};

let name = document.getElementById("name");
let stationboard = document.getElementById("stationboard");
let scrollview = document.getElementById('scrollview');

let time_one__background_number = document.getElementById("time_one-background_number");
let time_one__number = document.getElementById("time_one-number");
let time_one__destination = document.getElementById("time_one-destination");
let time_one__platform = document.getElementById("time_one-platform");
let time_one__time = document.getElementById("time_one-time");

let time_two__background_number = document.getElementById("time_two-background_number");
let time_two__number = document.getElementById("time_two-number");
let time_two__destination = document.getElementById("time_two-destination");
let time_two__platform = document.getElementById("time_two-platform");
let time_two__time = document.getElementById("time_two-time");

let time_three__background_number = document.getElementById("time_three-background_number");
let time_three__number = document.getElementById("time_three-number");
let time_three__destination = document.getElementById("time_three-destination");
let time_three__platform = document.getElementById("time_three-platform");
let time_three__time = document.getElementById("time_three-time");

let time_four__background_number = document.getElementById("time_four-background_number");
let time_four__number = document.getElementById("time_four-number");
let time_four__destination = document.getElementById("time_four-destination");
let time_four__platform = document.getElementById("time_four-platform");
let time_four__time = document.getElementById("time_four-time");

name.text = "Loading...";
scrollview.height = 150;

messaging.peerSocket.onopen = function() {
  console.log("Started");
  getStations();
}

messaging.peerSocket.onerror = function(err) {
  // Handle any errors
  stationboard.text = "Error. Please try again."
  console.log("Connection error: " + err.code + " - " + err.message);
}

function getStations() {
  name.text = "Please wait...";
  stationboard.text = "Retrieving station timetable near you.\n\nPlease have patience.";
  scrollview.height = 150;
}

var data;
messaging.peerSocket.onmessage = function(evt) {
  if (evt.data!=undefined) {
    message_received = true;
    if(evt.data.error){
      if(evt.data.message=="no_location"){
        name.text = "No location";
        stationboard.text = "At the moment, we got no GPS signal from your smartphone.";
        scrollview.height = 150;
      }
    }else{
      data = evt.data;

      var data_name = (evt.data.name).split(", ")[1]+", "+(evt.data.name).split(", ")[0];
      if(data_name.indexOf("undefined") !== -1){
        data_name = evt.data.name;
      }
      name.text = data_name;
      
      if(evt.data.to[0]==undefined){
        stationboard.style.display = "inline";
        stationboard.text = "No departures at the moment from this station.";
      }else{

        stationboard.style.display = "none";

        var data_result="";
        for(var i = 0;i<evt.data.to.length;i++){
          if(i==0){
            time_one__background_number.style.display = "inline";
            time_one__number.style.display = "inline";
            time_one__destination.style.display = "inline";
            time_one__platform.style.display = "inline";
            time_one__time.style.display = "inline";
          }
          if(i==1){
            time_two__background_number.style.display = "inline";
            time_two__number.style.display = "inline";
            time_two__destination.style.display = "inline";
            time_two__platform.style.display = "inline";
            time_two__time.style.display = "inline";
          }
          if(i==2){
            time_three__background_number.style.display = "inline";
            time_three__number.style.display = "inline";
            time_three__destination.style.display = "inline";
            time_three__platform.style.display = "inline";
            time_three__time.style.display = "inline";
          }
          if(i==3){
            time_four__background_number.style.display = "inline";
            time_four__number.style.display = "inline";
            time_four__destination.style.display = "inline";
            time_four__platform.style.display = "inline";
            time_four__time.style.display = "inline";
          }
        }

        /* Time 1 */
        var colors = getColors(evt.data.operators[0], evt.data.number[0]);

        time_one__number.style.fill = colors.line_color_font;
        time_one__background_number.style.fill = colors.line_color;

        time_one__number.text = evt.data.number[0];

        time_one__destination.text = evt.data.to[0];
        time_one__time.text = evt.data.departures[0]
        if(evt.data.platforms[0]==null){
          time_one__platform.text = evt.data.categories[0];
        }else{
          time_one__platform.text = "Pl. " + evt.data.platforms[0];
        }

        /* Time 2 */

        var colors = getColors(evt.data.operators[1], evt.data.number[1]);

        time_two__number.style.fill = colors.line_color_font;
        time_two__background_number.style.fill = colors.line_color;

        time_two__number.text = evt.data.number[1];

        time_two__destination.text = evt.data.to[1];
        time_two__time.text = evt.data.departures[1];
        if(evt.data.platforms[1]==null){
          time_two__platform.text = evt.data.categories[1];
        }else{
          time_two__platform.text = "Pl. " + evt.data.platforms[1];
        }

        /* Time 3 */

        var colors = getColors(evt.data.operators[2], evt.data.number[2]);

        time_three__number.style.fill = colors.line_color_font;
        time_three__background_number.style.fill = colors.line_color;

        time_three__number.text = evt.data.number[2];

        time_three__destination.text = evt.data.to[2];
        time_three__time.text = evt.data.departures[2]
        if(evt.data.platforms[2]==null){
          time_three__platform.text = evt.data.categories[2];
        }else{
          time_three__platform.text = "Pl. " + evt.data.platforms[2];
        }

        /* Time 4 */

        var colors = getColors(evt.data.operators[3], evt.data.number[3]);

        time_four__number.style.fill = colors.line_color_font;
        time_four__background_number.style.fill = colors.line_color;

        time_four__number.text = evt.data.number[3];

        time_four__destination.text = evt.data.to[3];
        time_four__time.text = evt.data.departures[3];
        if(evt.data.platforms[3]==null){
          time_four__platform.text = evt.data.categories[3];
        }else{
          time_four__platform.text = "Pl. " + evt.data.platforms[3];
        }

        scrollview.height = 400;
        vibration.start("confirmation-max");
      }

      //Change station
      document.onkeypress = function(e) {
        if(e.key=="down"){
          if(index<=8){
            name.text = "Next station...";

            index++;
            messaging.peerSocket.send({key:"changeStationDown"});
          }
        }else if(e.key=="up"){
          if(index>1){
            name.text = "Previous station...";

            index--;
            messaging.peerSocket.send({key:"changeStationUp"});
          }
        }
      }
    }
  }
}

setTimeout(function(){
  if(!message_received){
    name.text = "No connection";
    stationboard.text = "It seems that there's no connection to your phone. Please try again.";
    scrollview.height = 150;
    vibration.start("nudge-max");
  }
}, 10000);

function getColors(operator, number){
  var colors;
  switch(operator){
    default:
      console.log("----------");
      console.log("Unknown operator: "+operator);
      console.log("----------");
      colors = {line_color:"#fff",line_color_font:"#000"};
      break;
  }
  return colors;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}