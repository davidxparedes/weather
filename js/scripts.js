const app = {};
app.form = document.querySelector('form');
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

  document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  document.querySelector('.temperature').innerHTML = Math.trunc(data.main.temp);
  document.querySelector('.description').innerHTML = data.weather[0].description;
  document.querySelector('.city').innerHTML = data.name;
  document.querySelector('.country').innerHTML = regionNames.of(data.sys.country);
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