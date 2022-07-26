import fetch from "node-fetch";

//temporary needs to be called from main.js
const api = process.env.RAWG_API_KEY;

export class RAWG {
  constructor(apiKey) {
    this.API_key = apiKey;
  }

  _rawgURL = "https://api.rawg.io/api/";
  static results = {};

  getGameInfo = async (name, type = "games") => {
    const url = `${this._rawgURL}${type}?key=${this.API_key}&search=${name}&search_exact=true`;
    const response = await fetch(url);

    this.results = await response.json();
  };

  get searchResults() {
    return this.results;
  }
}

// test call
const game = new RAWG(api);
await game.getGameInfo("v-rising")
game.searchResults;
