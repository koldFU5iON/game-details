import { findRecord, updateRecord } from './airtable_api.js';
import { findGame } from './steam_api.js';
import { record_id } from './tests.js';

const data = {} // data record to input necessary fields for updates
const recordID = record_id // recieve record ID from webhook

// get record
let game = await findRecord(recordID)

// collect information on record ahead of steam request
if(game) {
    data.Platform = game.get('Platform') // adding in existing Genre's (avoids deletion)
    if(!data.Platform) {
        data['Platform'] = ['Windows PC']
    } else if (!data.Platform.includes('Windows PC')) {
        data.Platform.push('Windows PC')
        
    } else {
        console.log('"Windows PC" already exists in platform field')
    }

    // load store page URL
    data['Store page'] = game.get('Store page')
    
} else {
    console.log(`Did not find the record with ID: ${recordID}`)
}

// find steam data
const gameData = await findGame(data['Store page'])
// load data
let genres = []
data['Project Name'] = gameData.name
data['Expected Release'] = gameData.release_date.date
data['Website'] = gameData.website
data['Studio Name'] = gameData.developers.join(',')
data['About'] = gameData.detailed_description
// for(let genre in gameData.genres){
//     genres.push(genre.description)
// }
// data['Genre'] = genres

updateRecord(recordID, data) // update base with new data
