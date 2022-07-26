import { steamGame } from "./main.js";
import "dotenv/config";
import { RAWG } from "./rawg.js";
// export const record_id = 'recf1tL6IhQhDVAbU'

// steamGame('recSXjkClU0xYAfea')

// ============ testing RAWG API =============== //
const game = new RAWG(process.env.RAWG_API_KEY);

await game.getGameInfo("v-rising");

console.log(game.searchResults);
