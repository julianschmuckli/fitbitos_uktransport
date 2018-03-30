export function getColors(operator, number){
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