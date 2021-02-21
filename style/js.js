///////// start zone 

let date = new Date();
let time_hour = date.getHours();
let date_full = (date.getDate())+':'+(date.getMonth()+1)+':'+(date.getFullYear())
let mounth = 1
let list = [
   'January',
   'February',
   'March',
   'April',
   'May',
   'June',
   'July',
   'August',
   'September',
   'October',
   'November',
   'December'
]
let date_two = ((list[date.getMonth()]) +' '+date.getDate());

let textarea;
let button = document.getElementById("find");
let check = true;

document.getElementById("weather_for5").style.display = "none";


button.onclick = function(){ 
   textarea = document.getElementById('textarea').value
   true_false()
};

function true_false () {
   if (check == true) {
      document.getElementById("weather").style.display = "grid";
      document.getElementById("weather_for5").style.display = "none";
   }
   else {
      document.getElementById("weather").style.display = "none";
      document.getElementById("weather_for5").style.display = "grid"
   }
   check_block()
}

function check_block () {
      let del = 1;
      for (del; del<=24; del++)
      document.getElementById("div"+del).innerHTML = " "
      weather ()
}


button_5day.onclick = function day5_block () {
   check = false
   document.getElementById("weather").style.display = "none";
   document.getElementById("weather_for5").style.display = "grid"
}
button_today.onclick = function today_block () {
   check = true
   document.getElementById("weather").style.display = "grid";
   document.getElementById("weather_for5").style.display = "none";
}
// // В самом начале  
weather ()
function weather () {
let res_for1_weather;
let request_for1_weather;

if (window.XMLHttpRequest){
   request_for1_weather = new XMLHttpRequest();
   }
   else {
   request_for1_weather = new ActiveXObject("Microsoft.XMLHTTP");
   }
   if (document.getElementById('textarea').value === "") {
   request_for1_weather.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=Zhytomyr&units=metric&appid=45f3b1ceb8f5cecd7c6c1249a00ff18a');
   } else {
      request_for1_weather.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+textarea+'&units=metric&appid=45f3b1ceb8f5cecd7c6c1249a00ff18a');
   }
request_for1_weather.onload = function() {
   if (request_for1_weather.status === 200){
   let otvet = request_for1_weather.response
   res_for1_weather = JSON.parse (otvet);
   console.log (res_for1_weather)
   } else {
      textarea = document.getElementById('textarea').value;
      document.getElementById("textarea_error").innerHTML = textarea;
      document.getElementById("weather").style.display = "none";
      document.getElementById("hour_weather").style.display = "none";
      document.getElementById("weather_for5").style.display = "none";
      document.getElementById("error").style.display = "block"
      document.getElementById("div_for_zone").style.display = "none";
   }

}
request_for1_weather.send()

               forecast_start()
function forecast_start (){

let request_for1_forecast;

textarea = document.getElementById('textarea').value;
document.getElementById("textarea_error").innerHTML = textarea;
document.getElementById("hour_weather").style.display = "grid";
document.getElementById("error").style.display = "none";
document.getElementById("div_for_zone").style.display = "grid";

if (window.XMLHttpRequest){
   request_for1_forecast = new XMLHttpRequest();
}
else {
   request_for1_forecast = new ActiveXObject("Microsoft.XMLHTTP");
} 
   if (document.getElementById('textarea').value === "") {
      request_for1_forecast.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q=Zhytomyr&units=metric&appid=45f3b1ceb8f5cecd7c6c1249a00ff18a');
   } else {
      request_for1_forecast.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?q='+textarea+'&units=metric&appid=45f3b1ceb8f5cecd7c6c1249a00ff18a');
   }
request_for1_forecast.onload = function weather_for1() {
   if (request_for1_forecast.status === 200){
   let answ_for1 = request_for1_forecast.response
   res_for1 = JSON.parse (answ_for1);
   console.log (res_for1)
   
   let lon = res_for1_weather.coord.lon
   let lat = res_for1_weather.coord.lat 

   document.getElementById("city_text").innerHTML = res_for1.city.name;
   document.getElementById("cur_text").innerHTML = res_for1_weather.weather[0].main;
   document.getElementById("cur_temp").innerHTML = Math.round( res_for1_weather.main.temp)+"&degC";
   document.getElementById("cur_data").innerHTML = date_two;
   let sunrise_info = res_for1.city.sunrise;
   let sunrise_cal = new Date(sunrise_info*1000);
   let sunrise_go = (sunrise_cal.getHours())+':'+(sunrise_cal.getMinutes()+1)+' AM'
   document.getElementById("cur_sun_up").innerHTML = sunrise_go;
   let sunset_info = res_for1.city.sunset;
   let sunset_cal = new Date(sunset_info*1000);
   let sunset_go = (sunset_cal.getHours())+':'+(sunset_cal.getMinutes()+1)+' PM'
   document.getElementById("cur_sun_set").innerHTML = sunset_go;
   document.getElementById("cur_feel").innerHTML = res_for1_weather.main.feels_like + "&degC" ;
      if (res_for1_weather.weather[0].main === "Clouds") {
         document.getElementById("cur_img").src="style/img/cloud.png"
      } else if (res_for1_weather.weather[0].main === "Snow") {
         document.getElementById("cur_img").src="style/img/snow.png"
      } else if (res_for1_weather.weather[0].main === "Rain") {
         document.getElementById("cur_img").src="style/img/rain.png"
      }  else if (res_for1_weather.weather[0].main === "Sun") {
         document.getElementById("cur_img").src="style/img/sun.png"
      }
      
/// for one
   document.getElementById("text_5d_0").innerHTML = res_for1_weather.main.temp + '&degC';
   document.getElementById("today_5d").innerHTML = (date_two)
   document.getElementById ("text_weather_5d_0").innerHTML = res_for1_weather.weather[0].main
   if (res_for1_weather.weather[0].main === "Clouds") {
      document.getElementById("img_for5_0").src="style/img/cloud.png"
   } else if (res_for1_weather.weather[0].main === "Snow") {
      document.getElementById("img_for5_0").src="style/img/snow.png"
   } else if (res_for1_weather.weather[0].main === "Rain") {
      document.getElementById("img_for5_0").src="style/img/rain.png"
   }  else if (res_for1_weather.weather[0].main === "Clear") {
      document.getElementById("img_for5_0").src="style/img/sun.png"
   }
   //// for 4
      for (let i = 1; i<5; i++) {
         document.getElementById("tomor_5d_"+i).innerHTML = (list[date.getMonth()]) +' '+(date.getDate()+i)
         }   
let a = 1;
      for (let i = 4; i<36; a++ ){
          if (res_for1.list[i].weather[0].main === "Clouds") {
            document.getElementById("img_for5_"+a).src = "style/img/cloud.png"
         } else if (res_for1.list[i].weather[0].main === "Snow") {
            document.getElementById("img_for5_"+a).src="style/img/snow.png"
         } else if (res_for1.list[i].weather[0].main === "Rain") {
            document.getElementById("img_for5_"+a).src ="style/img/rain.png"
         }  else if (res_for1.list[i].weather[0].main === "Clear") {
            document.getElementById("img_for5_"+a).src="style/img/sun.png"
         }
         document.getElementById("text_5d_"+a).innerHTML = res_for1.list[i].main.temp + '&degC';
         document.getElementById("text_weather_5d_"+a).innerHTML = res_for1.list[i].weather[0].main;
         i = i+8; 
        
      
      }
      table_hour(lon,lat)
      zone (lon,lat)
   }
}
request_for1_forecast.send()
}
function table_hour(lon,lat){

let res_hour;
let request_hour;
if (window.XMLHttpRequest){
   request_hour = new XMLHttpRequest();
   }
   else {
   request_hour = new ActiveXObject("Microsoft.XMLHTTP");
   }
   request_hour.open('GET', `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=45f3b1ceb8f5cecd7c6c1249a00ff18a`);

   request_hour.onload = function() {
   if (request_hour.status === 200){
   let otvet = request_hour.response
   res_hour = JSON.parse (otvet);

   // // // /// // Таблица 
   let column_start = 2;
   let column_end = 3;
   let arr_http = time_hour+1;
   let img_table = 1;
   let givediv = 1;// цифра класса дива

   
   for (column_start, column_end, arr_http, img_table; column_end<=8; column_start++, img_table++, column_end++, arr_http++ ) {
            let row_start = 2;
            let row_end = 3;
            document.getElementById("table_img_"+img_table).src="style/img/sun.png"; 
            if (arr_http>23) {
               arr_http = arr_http-24
            }
            document.getElementById("hour_"+img_table).innerHTML = arr_http+":00";
            
            let pos_1 = res_hour.hourly[arr_http].weather[0].main ;
            let pos_2 = res_hour.hourly[arr_http].temp;
            let pos_3 = res_hour.hourly[arr_http].feels_like;
            let pos_4 = res_hour.hourly[arr_http].wind_speed;
            let count = 1;
            
            if (res_hour.hourly[arr_http].weather[0].main === "Clouds") {
               document.getElementById("table_img_"+img_table).src ="style/img/cloud.png"
            } else if (res_hour.hourly[arr_http].weather[0].main === "Snow") {
               document.getElementById("table_img_"+img_table).src ="style/img/snow.png"
            } else if (res_hour.hourly[arr_http].weather[0].main === "Rain") {
               document.getElementById("table_img_"+img_table).src ="style/img/rain.png"
            }  else if (res_hour.hourly[arr_http].weather[0].main === "Clear") {
               document.getElementById("table_img_"+img_table).src ="style/img/sun.png"
            }

      for (count, row_start, row_end, givediv; row_end<=6; row_start++, row_end++, givediv++, count++) {
            let div = document.createElement("div");
            div.id = "div"+givediv;
            document.getElementById("hour_weather").prepend(div);
               div.style.gridColumnStart = column_start;
               div.style.gridColumnEnd = column_end;
               div.style.gridRowStart = row_start;
               div.style.gridRowEnd = row_end;
               div.style.alignSelf = "center";
               if (count == 1) {
                  div.innerHTML = pos_1;
               } else if (count == 2) {
                  div.innerHTML = pos_2 + "&degC";
               } else if (count== 3) {
                  div.innerHTML = pos_3 + "&degC";
               } else {
                  div.innerHTML = pos_4 + " km/h";
               }
         }
      }

   console.log (res_hour)
   }
}
request_hour.send()
}

/////// Ближ зона
function zone(lon,lat) {
let res_zone;
let request_zone;
if (window.XMLHttpRequest){
   request_zone = new XMLHttpRequest();
   }
   else {
   request_zone = new ActiveXObject("Microsoft.XMLHTTP");
   }
   request_zone.open('GET', `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=5&units=metric&appid=45f3b1ceb8f5cecd7c6c1249a00ff18a`);

   request_zone.onload = function() {
   if (request_zone.status === 200){
   let otvet = request_zone.response
   res_zone = JSON.parse (otvet);
   }
   for (let i = 1; i<5; i++){
      if (res_zone.list[i].weather[0].main === "Clouds") {
         document.getElementById("img_zone"+i).src = "style/img/cloud.png"
      } else if (res_zone.list[i].weather[0].main  === "Snow") {
         document.getElementById("img_zone"+i).src="style/img/snow.png"
      } else if (res_zone.list[i].weather[0].main  === "Rain") {
         document.getElementById("img_zone"+i).src ="style/img/rain.png"
      }  else if (res_zone.list[i].weather[0].main  === "Clear") {
         document.getElementById("img_zone"+i).src="style/img/sun.png"
      }
      document.getElementById("city_zone"+i).innerHTML = res_zone.list[i].name;
      document.getElementById("text_zone"+i).innerHTML = res_zone.list[i].main.temp + "&degC";
   }

   console.log (res_zone)

}
request_zone.send()
}
}
