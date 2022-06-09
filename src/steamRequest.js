import * as SteamAPI from 'steamapi'

const steam = new SteamAPI('B582E4ADD33A34830D513E91ECB8B30F');
steam.getGameDetails('1335830').then(id => {
    console.log(id); 
});