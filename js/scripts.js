const app = {};
app.form = document.querySelector('form');
app.icon = document.querySelector('.icon');
app.temperature = document.querySelector('.temperature');
app.description = document.querySelector('.description');
app.city = document.querySelector('.city');
app.country = document.querySelector('.country');
app.errorMsg = document.querySelector('.error-msg');

app.getWeather = async (city, country) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=7b6fa16cbc0b568bf695198f7168501d`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((data) => {
    app.displayData(data);
  })
  .catch((error) => {
    app.displayError();
    console.log(error);
  });
}

app.displayData = (data) => {
  let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});

  app.icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  app.temperature.innerHTML = Math.trunc(data.main.temp);
  app.description.innerHTML = data.weather[0].description;
  app.city.innerHTML = data.name;
  app.country.innerHTML = regionNames.of(data.sys.country);
}

app.displayError = () => {
  app.errorMsg.style.opacity = "1";
}

app.init = () => {
  app.getWeather('Toronto', 'CA');

  app.form.addEventListener('submit', (e) => {
    e.preventDefault();

    app.errorMsg.style.opacity = 0;

    let locationInputValue = document.querySelector('#location').value.split(',');

    app.getWeather.apply(this, locationInputValue);
    app.form.reset();
  });
};

(function(){
  app.init();
})();

