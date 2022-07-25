moment.locale('fr');

// Animation avec la librairie GSAP
gsap.fromTo(".cloud", {x: 500}, {x: 100, duration: 5});
gsap.fromTo(".cloud", {scaleX:0.5, scaleY:0.5}, {scaleX:1, scaleY:1, duration:2});

gsap.fromTo(".explanation", {y: 100, autoAlpha: 0}, {y: 10, autoAlpha: 1, duration: 2});


// Stockage de la clée API et de l'URL de connexion à l'API
let apiKey = "15cdb3b6d112afb5d24ccedff1409ddb";
let baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=paris&lang=fr&appid=${apiKey}`;

const date = moment().format('dddd DD MMMM');

const dateField = document.getElementById('date');

dateField.textContent = date;


