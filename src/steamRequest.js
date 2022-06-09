import SteamAPI from 'steamapi'
import 'dotenv/config' 
const steam = new SteamAPI(process.env.STEAM_API_KEY);

// const gameID = '1335830' // test game


// extract game id from url
const regex = /([0-9]{7})/;

export const findGame = async (gameURL) => {
    const gameID = regex.exec(gameURL)
    console.log(`From ${gameURL} \nGame ID: ${gameID}`)


    try {
        const game = await steam.getGameDetails(gameID[0])
        console.log(`Game Name: ${game.name} \nWebsite: ${game.website} \nStudio(s): ${game.developers[0]}`); 
        return game;
    } catch(e) {
        console.log(`${e.message}`)
    }
   
};

// findGame(gameID) // test function