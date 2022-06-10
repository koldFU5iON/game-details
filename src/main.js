import { findRecord, updateRecord } from './airtable_api.js';
import { findGame } from './steam_api.js';

const data = {} // data record to input necessary fields for updates
// get record
export const steamGame = async (recordID) => {
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
    const steamData = await findGame(data['Store page'])
    // update
    if(steamData) {
        updateAirtable(steamData, recordID)
    } else {
        console.log(`No store page url was found`)
    }
    
}

const updateAirtable = (gameData, recordID) => {
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
}

// steamGame('recSXjkClU0xYAfea')
