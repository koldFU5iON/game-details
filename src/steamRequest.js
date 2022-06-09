import SteamAPI from 'steamapi'
import 'dotenv/config' 
const steam = new SteamAPI(process.env.STEAM_API_KEY);

const gameID = '1335830'

export const findGame = async (gameID) => {
    const game = await steam.getGameDetails(gameID)
    console.log(`Game Name: ${game.name} \nWebsite: ${game.website} \nStudio(s): ${game.developers[0]}`); 
};

findGame(gameID) // test function