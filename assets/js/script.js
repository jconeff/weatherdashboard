var cityform = document.querySelector('#city-form');


cityform.addEventListener('submit', (event)=> {
    event.preventDefault();
    let uviIndex = document.querySelector('.uvi-index');
    let tempDegree = document.querySelector('.temp-degree0');
    let hum = document.querySelector('.humidity0');
    let currentTemp = document.querySelector('.currenttempdegree');
    let locationTimezone = document.querySelector('.location-timezone');
    let city = document.querySelector('#cityname').value;
    let currentHum = document.querySelector('.currenthumidity');
    let currentWind = document.querySelector('.wind');
    let currentday = document.querySelector('.currentday');
    

    


    
    
//hide 5 day forecast until onclick of submit

    document.querySelector("#weatherbox").style.display = "block";

   
//API URL  current weather
           const currentApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c962694451f88c2f69a40aac9d384464&units=imperial';
           fetch(currentApi)
           .then(response =>{
              return response.json();
           })

           .then(data =>{
//API for lon and lat / five day weather
               const apiOneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +data.coord.lat + '&lon=' + data.coord.lon +'&appid=c962694451f88c2f69a40aac9d384464&units=imperial';
           fetch(apiOneCall)
           .then(response =>{
              return response.json();
           })

           .then(oneCallData =>{

            //loop for tempdegree
            for (var index = 1; index < 6; index++)
{
  let tempDegreeLoop = document.querySelector('.temp-degree' + index);
  let humLoop = document.querySelector('.humidity'+ index);
  
  
 
  tempDegreeLoop.textContent = Math.round(oneCallData.daily[index].temp.day) + "F°"
  humLoop.textContent = 'humidity:' + oneCallData.daily[index].humidity + '%'
 
  
  
}
           
//end of loop
               
               const{temp, humidity, uvi, wind_speed} = oneCallData.current;
              
               
               //Set DOM Elements from API
               //current DOM Elements from API 
               currentTemp.textContent = 'Temperature:' + Math.round(temp) + "F°";
               currentHum.textContent = 'Humidity:' +humidity + '%';
               currentWind.textContent = 'Wind speed:' + wind_speed + 'MPH'; 

               //current day
               currentday.textContent = moment().subtract(10, 'days').calendar(); 
               console.log(oneCallData);

               //Five day DOM Elements from API
               hum.textContent = "humidity:" + humidity; 
               uviIndex.textContent = "UV Index:" + uvi;
               

              


           });

           });
        });

    

        //event listner keyup use cityname