var cityform = document.querySelector('#city-form');


cityform.addEventListener('submit', (event)=> {
    event.preventDefault();
    let uviIndex = document.querySelector('.uvi-index');
    let currentTemp = document.querySelector('.currenttempdegree');
    let locationTimezone = document.querySelector('.cityname');
    let city = document.querySelector('#cityname').value;
    let currentHum = document.querySelector('.currenthumidity');
    let currentWind = document.querySelector('.wind');
    let currentday = document.querySelector('.currentday');
    let currentIcon = document.querySelector('.currentpic');
    
    
    let date1 = document.querySelector('.date1');
    let date2 = document.querySelector('.date2');
    let date3 = document.querySelector('.date3');
    let date4 = document.querySelector('.date4');
    let date5 = document.querySelector('.date5');
    

    
    

    
    
//hide 5 day forecast until onclick of submit

    document.querySelector("#weatherbox").style.display = "block";

   
//API URL  current weather
           const currentApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=c962694451f88c2f69a40aac9d384464&units=imperial';

           
           
           fetch(currentApi)
        
           .then(response =>{

           
            
              return response.json();

                    
              
           })

           
           .then(data =>{

            //name of city
            locationTimezone.textContent = data.name;
        //API for lon and lat / five day weather
               const apiOneCall = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +data.coord.lat + '&lon=' + data.coord.lon +'&appid=c962694451f88c2f69a40aac9d384464&units=imperial';
               
           fetch(apiOneCall)
           .then(response =>{


              return response.json();
           })

           .then(oneCallData =>{

            //Start of Loop
            for (var index = 1; index < 6; index++)
{
  let tempDegreeLoop = document.querySelector('.temp-degree' + index);
  let humLoop = document.querySelector('.humidity'+ index);
  let iconLoop = document.querySelector('.icon'+ index);
 
 //five day forecast info
  tempDegreeLoop.textContent = Math.round(oneCallData.daily[index].temp.day) + "F°"
  humLoop.textContent = 'Humidity:' + oneCallData.daily[index].humidity + '%'
//five day forecast info
   let weatherPic1 = oneCallData.daily[index].weather[0].icon;
    iconLoop.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic1 + "@2x.png");

  
 
  
  
}


           
//end of loop
               
               const{temp, humidity, uvi, wind_speed} = oneCallData.current;
               
            
           
            
             let weatherPic = oneCallData.current.weather[0].icon;
             currentIcon.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");

        
             
             
    
    
               
               //Set DOM Elements from API
               //current DOM Elements from API 
               currentTemp.textContent = 'Temperature:' + Math.round(temp) + "F°";
               currentHum.textContent = 'Humidity:' + humidity + '%';
               currentWind.textContent = 'Wind speed:' + wind_speed + 'MPH'; 
               uviIndex.textContent = "UV Index:" + uvi;
               //locationTimezone.textContent = oneCallData.name
               
               
        

               //current day + Next 5 days
            
               currentday.textContent = moment().format('LL'); 
               date1.textContent = moment().add(1,'days').format('LL'); 
               date2.textContent = moment().add(2,'days').format('LL'); 
               date3.textContent = moment().add(3,'days').format('LL'); 
               date4.textContent = moment().add(4,'days').format('LL'); 
               date5.textContent = moment().add(5,'days').format('LL'); 
               
    
               
           });

           });
        });

    

        //event listner keyup use cityname