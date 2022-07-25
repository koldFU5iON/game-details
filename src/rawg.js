import 'dotenv/config'
import fetch from 'node-fetch'

const rawgURL = "https://api.rawg.io/api/"
const api = `?key=${process.env.RAWG_API_KEY}`

// GET https://api.rawg.io/api/platforms?key=YOUR_API_KEY
// GET https://api.rawg.io/api/games?key=YOUR_API_KEY&dates=2019-09-01,2019-09-30&platforms=18,1,7

const getGame = async (name, type="games") => {
// let xmlHttp = new XMLHttpRequest();

const url = `${rawgURL}${type}${api}&search=${name}&search_exact=true`;

const response = await fetch(url);
const data = await response.json();

console.log(data)
    // get request
//     function httpGetAsync(theUrl, callback)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() { 
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//     }
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
//     xmlHttp.send(null);
// }

}

// test call

getGame("v-rising")