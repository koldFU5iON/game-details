import Airtable from 'airtable';
import 'dotenv/config';

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appl2a4TBuQImJIiu');

// let recordID = 'recxZLSGzpE43yvdq' // test record
const tableID = 'tblMXiuJrT9lvXo6U';
const table = base(tableID);

export const findRecord = async (recordID) => {
    try {
        return await table.find(recordID)
    } catch(err) {
        console.log(`${err.message} : ${err.error}`)
    }
} 

// update record with ID
export const updateRecord = async (recordID, data) => {
            table.update(recordID, data, (err, record) => {
                if(!err) {
                    console.log(`${record['fields']['name']} was updated successfully`) //.get('Project Name')
                } else {
                    console.error(`${err.message} : ${err.error}`);
                }
            })
        }

// {
//     "id": "rectL3Mp4Dg6MX2y8",
//     "fields": {
//       "MWU Owner *": [
//         "recb5jCkqKsbMbSSZ"
//       ],
// }

export const updateRecords = async (records) => {
    table.update(records)
}