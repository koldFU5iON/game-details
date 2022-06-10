import SteamAPI from 'steamapi';
import 'dotenv/config';

const steam = new SteamAPI(process.env.STEAM_API_KEY);

// extract game id from url
const regex = /([0-9]{6,7})/;

export const findGame = async (gameURL) => {

    const gameID = regex.exec(gameURL)
    
    if(gameID) {
        console.log(`From ${gameURL} \nGame ID: ${gameID}`)
        try {
            const game = await steam.getGameDetails(gameID[0])
            console.log(`Game Name: ${game.name} \nWebsite: ${game.website} \nStudio(s): ${game.developers[0]}`); 
            return game;
        } catch(e) {
            console.log(`${e.message}`)
        }
    } else {
        console.log(`Could not find an id from ${gameURL}`)
    }
   
};
