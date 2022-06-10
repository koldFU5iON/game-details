import express from "express";
import { steamGame } from "./main.js";

const app = express();
const PORT = 8080;

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