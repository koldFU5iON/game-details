import SteamAPI from 'steamapi'
import 'dotenv/config' 

const gameID = '1335830'


const steam = new SteamAPI(process.env.STEAM_API_KEY);
steam.getGameDetails(gameID).then(game => {
    console.log(`Game Name: ${game.name} \nWebsite: ${game.website} \nStudio(s): ${game.developers[0]}`); 
});