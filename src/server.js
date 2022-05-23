const express = require("express");
const game = require("./static/Map")
const app = express();
const port = 8000;

let Game = new game.Map(500, 500)
Game.addPath(new game.Path(new game.Position(0, 0), new game.Position(50, 50), 10))


app.use('/', express.static("src/static"))

app.get('/api', (req, res) => {
    res.send("API ENDPOINT")
})

app.get('/game', (req, res) => {
    bases = []
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            bases.push({ x: i * 50, y: j * 50, count: Math.round(Math.random() * 10) })
        }
    }
    paths = []
    
    subs = []


    // res.send(JSON.stringify({"bases":bases, "paths": Game.paths}))
    res.send(JSON.stringify(Game.toObj()))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})