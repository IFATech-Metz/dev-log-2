/*
var xhr = new XMLHttpRequest();

// Forme générale du lien :
// http://api.openweathermap.org/data/2.5/weather?q=Metz&3c084bd74c2f77f02d6d6c30c2018bf0

var base_url = "http://api.openweathermap.org/data/2.5/weather";
var city = "Metz";
var units = "metric";
var appid = "3c084bd74c2f77f02d6d6c30c2018bf0";

function get_url() {
    return base_url + "?"
        + "q=" + city + "&"
        + "units=" + units + "&"
        + "appid=" + appid;
        
}

function init_page() {
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("url").innerHTML = get_url();

            var response = JSON.parse(this.responseText);
            var temperature = response.main.temp;
            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";

            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("icon").src = src;
        }
    };
    
    xhr.open("GET", get_url(), true);
    xhr.send();
}

function get_temperature() {
    city = document.getElementById("ville").value;
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("url").innerHTML = get_url();

            if(document.getElementById("url_visibility").checked) {
                document.getElementById("url").style.display = "block";
            }
            else {
                document.getElementById("url").style.display = "none";
            }

            var response = JSON.parse(this.responseText);
            var temperature = response.main.temp;

            var icon = response.weather[0].icon;
            var src = "http://openweathermap.org/img/w/" + icon + ".png";
            
            document.getElementById("meteo").innerHTML = temperature;
            document.getElementById("icon").src = src;

        }
    };
    
    xhr.open("GET", get_url(), true);
    xhr.send();
}

*/

const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

async function main(withIP = true) {
   /* let ville;
    if (withIP) {

    
    const ip = await fetch('https://api.ipify.org?format=json') 
        .then(resultat => resultat.json())
        .then(json => json.ip);



    ville = await fetch('http://api.ipstack.com/' + ip + '?access_key=c0fa19618b5392d9c6e9fbfafae0ea9e')
        .then(resultat => resultat.json())
        .then(json => json.city);

    } else 
    ville = document.querySelector('#ville').textContent;*/
    let ville;
    ville = "Monaco"

    const meteo = await fetch('http://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=4873b4305c0e97ae99f6c53a1a348ac3&lang=fr&units=metric')
                .then(resultat => resultat.json())
                .then(json => json)

    const prevision = await fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + ville + '&appid=4873b4305c0e97ae99f6c53a1a348ac3&lang=fr&units=metric')
                .then(resultat => resultat.json())
                .then(json => json)
                console.log(meteo);
 displayWeatherInfos (meteo)
 displayForcastInfo (prevision)

 
}  
//previsions
function displayForcastInfo (data) {
    const tempun = data.list[7].main.temp;// temperature j+1
    const condun = data.list[7].weather[0].main;// icon j +1
  //  const desun = data.list[7].weather[0].description;// description j+1

    const tempdeux = data.list[15].main.temp;// temperature j+2
    const conddeux = data.list[15].weather[0].main;// icon j+2
  //  const desdeux = data.list[15].weather[0].description;// description j+2

    const temptrois = data.list[23].main.temp;// temperature j+3
    const condtrois = data.list[23].weather[0].main;// icon j+3
   // const destrois = data.list[23].weather[0].description;// descrition j+4

    const tempquatre = data.list[31].main.temp;//temperature j+4
    const condquatre = data.list[31].weather[0].main;// icon j+4
   // const desquatre = data.list[31].weather[0].description;// description j+4

    

    const tempcinq = data.list[39].main.temp;//temperature j+5
    const condcinq = data.list[39].weather[0].main;// icon j+5
  //  const descinq = data.list[39].weather[0].description;// descrition j+5

    document.querySelector('#tempun').textContent = Math.round(tempun*10)/10; // Math.round(temperature*10)/10 arrondi un chiffre derriere la virgule
    document.querySelector('#condun').className = weatherIcons[condun];
   // document.querySelector("#desun").textContent = capitalize(desun);

    document.querySelector('#tempdeux').textContent = Math.round(tempdeux*10)/10;
    document.querySelector('#conddeux').className = weatherIcons[conddeux];
    //document.querySelector("#desdeux").textContent = capitalize(desdeux);

    document.querySelector('#temptrois').textContent = Math.round(temptrois*10)/10;
    document.querySelector('#condtrois').className = weatherIcons[condtrois];
   // document.querySelector("#destrois").textContent = capitalize(destrois);

    document.querySelector('#tempquatre').textContent = Math.round(tempquatre*10)/10;
    document.querySelector('#condquatre').className = weatherIcons[condquatre];
    //document.querySelector("#desquatre").textContent = capitalize(desquatre);

    document.querySelector('#tempcinq').textContent = Math.round(tempcinq*10)/10;
    document.querySelector('#condcinq').className = weatherIcons[condcinq];
    //document.querySelector("#descinq").textContent = capitalize(descinq);
   

}
function displayWeatherInfos (data) {
    const name = data.name;
    const temperature = data.main.temp;//temperature
    const conditions = data.weather[0].main;//icon
    const description = data.weather[0].description;//description
    const humidite = data.main.humidity;//taux d'humidité
    const vitVent = data.wind.speed;//vitesse du vent
    const pression = data.main.pressure;//pression
    const longitude = data.coord.lon;//longitude
    const latitude = data.coord.lat;//latitude
    const update = data.lastupdate;





    document.querySelector('#ville').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature*10)/10; 
    document.querySelector("#conditions").textContent = capitalize(description);
    document.querySelector('i.wi').className = weatherIcons[conditions];
    document.querySelector('#txhumide').textContent = humidite;
    document.querySelector('#vitesse').textContent = vitVent;
    document.querySelector('#pression').textContent = pression;
    document.querySelector('#longitude').textContent= longitude;
    document.querySelector('#latitude').textContent = latitude;

    document.body.className = conditions.toLowerCase();

    const ville = document.querySelector('#ville');

    ville.addEventListener('click', () => {
        ville.contentEditable = true;
    });

    ville.addEventListener('keydown', (e) => {
        if(e.keyCode === 13) {  // 13 parce que le code de "entré" est 13
            e.preventDefault();
            ville.contentEditable = false;
            main(false);
        }
    })

}


main();