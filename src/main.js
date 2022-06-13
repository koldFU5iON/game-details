import { findRecord, updateRecord } from './airtable_api.js';
import { findGame } from './steam_api.js';
import { convert } from 'html-to-markdown';


const data = {} // data record to input necessary fields for updates
// get record
export const steamGame = async (recordID) => {
    let record = await findRecord(recordID)

    // collect information on record ahead of steam request
    if(record) {

        data.Platform = record.get('Platform') // adding in existing Platforms's
        data.Genre = record.get('Genre') // adding in existing Genre's

        checkMulitSelect(data.Platform, 'Windows PC')

        // load store page URL
        data['Store page'] = record.get('Store page')
        
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

const checkMulitSelect = (field, value) => {
    // check an array in airtable for an existing field.
    if(!field) {
        field = value;
    } else if (!field.includes(value)) {
        field.push(value);
    } else {
        console.log(`${value} already exists in field.`);
    }
    // return field;
}

const updateAirtable = (gameData, recordID) => {
    let genres = 
    // console.log(gameData.genre)
    data['Project Name'] = gameData.name
    data['Expected Release'] = gameData.release_date.date
    data['Website'] = gameData.website
    data['Studio Name'] = gameData.developers.join(',')
    let aboutMarkdown = convert(gameData.detailed_description)
    data['About'] = aboutMarkdown
    // for(let genre in gameData.genres){
    //     genres.push(genre.description)
    //     console.log(genre)
    // }
    // console.log(genres)
    // data['Genre'] = genres

    updateRecord(recordID, data) // update base with new data
}

// steamGame('recSXjkClU0xYAfea')
