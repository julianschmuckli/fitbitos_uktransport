var app_id = "aa4ed2d2";
var app_key = "4cde0701d34b9ca263383c2d3f2cc97a";

export function getURLStationNames(lat, lon){
  return "https://transportapi.com/v3/uk/train/stations/near.json?app_id="+app_id+"&app_key="+app_key+"&lat="+ lat +"&lon="+ lon;
}

export function getURLStationDetails(id){
  return "https://transportapi.com/v3/uk/train/station/"+id+"/live.json?app_id="+app_id+"&app_key="+app_key;
}

export function getURLSearchStation(value){
  return "https://transportapi.com/v3/uk/places.json?query="+value+"&type=train_station&app_id="+app_id+"&app_key="+app_key;
}