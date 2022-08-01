import Airtable from "airtable";
import "dotenv/config";
const env = process.env;

const base = new Airtable({ apiKey: env.AIRTABLE_API_KEY }).base(
  env.AIRTABLE_BASE_ID
);

const table = base("tblMXiuJrT9lvXo6U");

export const findRecord = async (recordID) => {
  try {
    return await table.find(recordID);
  } catch (err) {
    console.log(`${err.message} : ${err.error}`);
  }
};

// update record with ID
export const updateRecord = async (recordID, data) => {
  table.update(recordID, data, { typecast: true }, (err, record) => {
    if (!err) {
      console.log(`Record was updated successfully : ${record.getId()}`); //.get('Project Name')
    } else {
      console.error(`${err.message} : ${err.error}`);
    }
  });
};

export const createField = async (recordID, data, field) => {
  table.update(recordID, "Genre");
};

// {
//     "id": "rectL3Mp4Dg6MX2y8",
//     "fields": {
//       "MWU Owner *": [
//         "recb5jCkqKsbMbSSZ"
//       ],
// }

export const updateRecords = async (records) => {
  table.update(records);
};
