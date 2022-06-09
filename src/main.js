import { findRecord, updateRecord } from './airtableRequest.js'
import { findGame } from './steamRequest.js'

const data = {} // data record to input necessary fields for updates

const recordID = 'recVGaP4TAlHh7W6y' // recieve record ID from webhook

// get record
let game = await findRecord(recordID)

// collect information on record ahead of steam request
if(game) {
    
    data.Platform = game.get('Platform') // adding in existing Genre's (avoids deletion)
    !data.Platform.includes('Windows PC') ? data.Platform.push('Windows PC') : console.log('Windows PC already exists in Platform')  // adding 'Windows PC' since content is coming from Steam
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
