import Airtable from 'airtable'
import 'dotenv/config' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// import express from 'express'

const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('appl2a4TBuQImJIiu');

// let recordID = 'recxZLSGzpE43yvdq' // test record
const tableID = 'tblMXiuJrT9lvXo6U';
const table = base(tableID);

// find (recordId:string): Promise<Record<FieldSet>>
// export const findRecord = async (recordID) => {
//     table.find(recordID, (err, record) => {
//         if (!err) {
//             console.log(`Found record: ${record.get('Project Name')}`);
//             return record.get('Store page');
//         } else {
//             return `${err.message} : ${err.error}`;
//         }
//     })
// } 

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
                    console.log(`${record.get('Project Name')} was updated successfully`)
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
