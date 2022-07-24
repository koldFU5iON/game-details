import { findRecord, updateRecord } from "./airtable_api.js";
import { findGame } from "./steam_api.js";
import { convert } from "html-to-markdown";

const data = {}; // data record to input necessary fields for updates
// get record
export const steamGame = async (recordID) => {
  let record = await findRecord(recordID);

  // collect information on record ahead of steam request
  if (record) {
    data.Platform = record.get("Platform"); // adding in existing Platforms's
    data.Genre = record.get("Genre"); // adding in existing Genre's
    checkMulitSelect("Platform", "Windows PC");

    // load store page URL
    data["Store page"] = record.get("Store page");
  } else {
    console.log(`Did not find the record with ID: ${recordID}`);
  }

  // find steam data
  const steamData = await findGame(data["Store page"]);

  // update
  if (steamData) {
    updateAirtable(steamData, recordID);
  } else {
    console.log(`No store page url was found`);
  }
};

const checkMulitSelect = (field, value) => {
  if (!data[field]) {
    data[field] = [value];
    console.log(`No items currently in field, added : ${value}`);
  } else if (!data[field].includes(value)) {
    data[field].push(value);
  } else {
    console.log(`${value} already exists in field.`);
  }
};

const updateAirtable = (steamGame, recordID) => {
  data["Project Name"] = steamGame.name;
  data["Expected Release"] = steamGame.release_date.date;
  data["Website"] = steamGame.website;
  data["Studio Name"] = steamGame.developers.join(",");
  data["About"] = convert(steamGame.about_the_game);

  // multi-select fields
  for (let genre of steamGame.genres) {
    checkMulitSelect("Genre", genre.description);
  }

  // screenshots
  data["Artwork"] = steamGame.screenshots.map((images) => ({
    url: images.path_full,
  }));

  updateRecord(recordID, data); // update base with new data
};
