// Changement global de la langue pour l'utilisation francaise de momentjs
moment.locale('fr');

// Récupération des éléments du DOM
const input = document.querySelector('.input-text');
const inputSend = document.querySelector('.btn-absolute');
const errorMsg = document.querySelector('.error-message');

// Récupération de la date du jour + ajout dans le DOM
const date = moment().format('dddd DD MMMM');
const dateField = document.getElementById('date');
dateField.textContent = date;

//Stockage de la clée API
let apiKey = "15cdb3b6d112afb5d24ccedff1409ddb";


// Cette fonction me permet de bloquer le comportement par défaut de l'input submit lors du clique
inputSend.addEventListener('click', (e) => {
    e.preventDefault();
    // Lancement de la fonction d'appel api + passage en parametre de la valeur de l'input
    weatherBalloon(input.value);
});

// Cette fonction contient une animation.
// Elle est appellée dans le cas ou un message d'erreur est nécessaire
const errFunc = () => gsap.fromTo(".error-message", {y: 10, display: 'block', autoAlpha: 0}, {y: 0, autoAlpha: 1, duration: 2});



const weatherBalloon = ( cityName ) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(function(resp) { return resp.json() }) // convertion en donnée
    .then(function(data) {
      if(data.message == 'Nothing to geocode') { 
            errorMsg.innerHTML = '<p>Merci de saisir le nom d\'une ville avant de soumettre</p>';
            errFunc();
      } else if(data.message == 'city not found') {
            errorMsg.innerHTML = '<p>Cette ville est introuvable</p>';
            errFunc();
      }
    })
    .catch(function(error) {
      errorMsg.innerHTML = error;
      errFunc();
    });
  }


// Animation avec la librairie GSAP
gsap.fromTo(".cloud", {x: 500}, {x: 100, duration: 5});
gsap.fromTo(".cloud", {scaleX:0.5, scaleY:0.5}, {scaleX:1, scaleY:1, duration:2});
gsap.fromTo(".explanation", {y: 100, autoAlpha: 0}, {y: 10, autoAlpha: 1, duration: 2});
gsap.fromTo(".fa-share", {y: 10, autoAlpha: 0}, {y: 0, autoAlpha: 1, duration: 2});


