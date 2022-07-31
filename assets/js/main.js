// Changement global de la langue momentjs
moment.locale('fr');

// Animation avec utilisation de timeline GSAP
let tl = gsap.timeline({repeat: 2, repeatDelay: 1});
tl.fromTo(".cloud", {x: 500}, {x: 100});
tl.fromTo(".cloud", {scaleX:0.5, scaleY:0.5}, {scaleX:1, scaleY:1, duration:2});
tl.fromTo(".explanation", {y: 100, autoAlpha: 0}, {y: 10, autoAlpha: 1, duration: 2});
tl.fromTo(".fa-share", {y: 10, autoAlpha: 0}, {y: 0, autoAlpha: 1, duration: 2});

// Récupération des éléments du DOM
const input = document.querySelector('.input-text');
const inputSend = document.querySelector('.btn-absolute');
const errorMsg = document.querySelector('.error-message');
const celcius = document.querySelector('.celcius');
const description = document.querySelector('.description');

// Récupération de la date du jour + intégration dans le DOM
const date = moment().format('dddd DD MMMM');
const dateField = document.getElementById('date');
dateField.textContent = date;

//Stockage de la clée API
let apiKey = "15cdb3b6d112afb5d24ccedff1409ddb";



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
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=fr&appid=${apiKey}`)
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


