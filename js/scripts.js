const app = {};

app.getWeather = async (city, country) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=7b6fa16cbc0b568bf695198f7168501d`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    app.displayData(data);
  })
  .catch(() => {
    console.log('error');
  });
}

app.displayData = (data) => {
  document.querySelector('.location').innerHTML = data.name;
  document.querySelector('.description').innerHTML = data.weather[0].description;
  document.querySelector('.temperature').innerHTML = Math.trunc(data.main.temp);
  document.querySelector('.icon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
}

app.init = () => {
  app.getWeather('Toronto', 'CA' );
};

(function(){
  app.init();
})();