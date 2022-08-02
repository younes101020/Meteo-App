// Changement global de la langue momentjs
moment.locale('fr');

// Animation avec utilisation de timeline GSAP
let tl = gsap.timeline({duration:1});
tl.to(".cloud", {x: 100});
tl.fromTo(".cloud", {scaleX:0.5, scaleY:0.5}, {scaleX:1, scaleY:1});
tl.fromTo(".explanation", {y: 100, autoAlpha: 0}, {y: 10, autoAlpha: 1});
tl.fromTo(".fa-street-view", {y: 10, autoAlpha: 0}, {y: 0, autoAlpha: 1});
tl.fromTo(".fa-share", {y: 10, autoAlpha: 0}, {y: 0, autoAlpha: 1});

// Récupération des éléments du DOM
const input = document.querySelector('.input-text');
const inputSend = document.querySelector('.btn-absolute');
const errorMsg = document.querySelector('.error-message');
const celcius = document.querySelector('.celcius');
const description = document.querySelector('.description');
const getuserLocation = document.querySelector('.fa-street-view');

// Récupération de la date du jour + intégration dans le DOM
const date = moment().format('dddd DD MMMM');
const dateField = document.getElementById('date');
dateField.textContent = date;

//Stockage des clées API
let owmapiKey = "15cdb3b6d112afb5d24ccedff1409ddb";
let geoapiKey = "AIzaSyAJu_s1CyPYI990lEIHpP1T5C3X64TEjjY";



inputSend.addEventListener('click', (e) => {
    // Cette fonction me permet de bloquer le comportement par défaut (rafraichissement de la page) de l'input submit lors du clique 
    e.preventDefault();
    // Lancement de la fonction d'appel api + passage en parametre de la valeur de l'input
    weatherBalloon(input.value);
});

// Cette fonction créer une animation spécifique au message d'erreur
const errFunc = () => gsap.fromTo(".error-message", {y: 10, display: 'block', autoAlpha: 0}, {y: 0, autoAlpha: 1, duration: 2});


// Cette fonction sert à appeler l'api, en fonction du paramétre donnée lors de l'appel (la ville) elle renverra les donnée météo de cette dernière
const weatherBalloon = ( cityName ) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=fr&appid=${owmapiKey}`)
    .then(function(resp) { return resp.json() }) // convertion en donnée json
    .then(function(data) {
      if(data.message == 'Nothing to geocode') { 
            errorMsg.innerHTML = '<p>Merci de saisir le nom d\'une ville avant de soumettre</p>';
            errFunc();
      } else if(data.message == 'city not found') {
            errorMsg.innerHTML = '<p>Cette ville est introuvable</p>';
            errFunc();
      } else {
          errorMsg.innerHTML = '';
        gsap.to(".cloud", {y: -200, autoAlpha: 0, duration: 3});
        gsap.to(".explanation", {autoAlpha: 0});
        gsap.to(".form-horizontal", {y: -280});
        gsap.fromTo(".card", {autoAlpha: 0, y: 100}, {y: 60, autoAlpha: 1});
        // Intégration de l'icone d'indication météo
        celcius.innerHTML = Math.round(data.main.temp) + '°' + ` <img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png' alt="icone meteo">`;
        // Intégration de la description météo
        description.textContent = data.weather[0].description;
      }
    })
    .catch(function(error) {
      // Dans le cas d'une application nodejs j'aurais envoyée le message d'erreur vers ma boite mail grace au module sendmailer
      errorMsg.innerHTML = `<p>${error}</p>`;
      errFunc();
    });
  }

  // Cette fonction retourne le nom de la ville de l'utilisateur automatiquement grâce à l'ape geocode de google
  // ce nom sera donné en paramétre à la fonction weatherballoon
  getuserLocation.addEventListener('click', () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        fetch( "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ position.coords.latitude + "," + position.coords.longitude +`&sensor=false&key=${geoapiKey}`)
        .then(function(resp) { return resp.json() })
        .then(function(data) { 
          let usercityName = data.results[0].formatted_address.split(' ')[1].slice(0, -1);
          input.value = '';
          input.placeholder = usercityName;
          weatherBalloon(usercityName)
        }) 

      });
    } else {
      errorMsg.innerHTML = `<p>La géolocalisation est soit désactiver soit non supporter par votre navigateur</p>`;
      errFunc();
    }
  })

