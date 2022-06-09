import { findRecord, updateRecord } from './airtableRequest.js'

const data = {} // data record to input necessary fields for updates

const recordID = 'recVGaP4TAlHh7W6y' // recieve record ID from webhook

// get record
let game = await findRecord(recordID)

if(game) {
    
    data.Platform = game.get('Platform') // adding in existing Genre's (avoids deletion)
    !data.Platform.includes('Windows PC') ? data.Platform.push('Windows PC') : console.log('Windows PC already exists in Platform')  // adding 'Windows PC' since content is coming from Steam
    
    
} else {
    console.log(`Did not find the record with ID: ${recordID}`)
}

updateRecord(recordID, data) // update base with new data
