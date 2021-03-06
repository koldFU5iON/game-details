import express from "express";
import { steamGame } from "./main.js";
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.listen(
    PORT, 
    () => {console.log(`server running on http://localhost:${PORT}`)
})

app.get('/steam-game/:id',(req,res) => {
    const { id } = req.params
    if(!id) {
        res.status(200).send(`could not read ID : ${id}`)
    } else{
        res.status(200).send(`successfully recieved ${id}`)
        steamGame(id)
    }
})


// todo 
app.get('/nintendo-game/:id', (req, res) => {
    const { id } = req.params
})

/* 
todo 
1. Nintendo
2. Epic
3. Occulus
4. Android
5. Apple iOS
*/