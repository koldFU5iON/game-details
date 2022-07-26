import fetch from "node-fetch";

//temporary needs to be called from main.js
const api = process.env.RAWG_API_KEY;

export class RAWG {
  constructor(apiKey) {
    this.API_key = apiKey;
  }

  _rawgURL = "https://api.rawg.io/api/";
  static results = {};

  _search = async (name, type = "games") => {
    const url = `${this._rawgURL}${type}?key=${this.API_key}&search=${name}&search_exact=true`;
    const response = await fetch(url);

    this.results = await response.json();
  };

  _slug(name) {
    return name.replace(" ", "-").trim().toLowerCase();
  }

  // === QUERIES === ///
  game = async (name) => {
    await this._search(this._slug(name), "games");
  };

  platform = async (platform) => {
    await this._search(platform, "platforms");
  }

  get searchResults() {
    return this.results;
  }
}
