const express = require("express");
const game = require("./static/Map")
const app = express();
const port = 8000;

let Game = new game.Map(500, 500)
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        let base = new game.Base(new game.Position(i * 50, j * 50), Math.floor(Math.random() * 10))
        Game.addBase(base)
    }
}

Game.addPath(new game.Path(new game.Position(0, 0), new game.Position(50, 50), 10))
Game.addPath(new game.Path(new game.Position(450, 200), new game.Position(50, 400), 10))


app.use('/', express.static("src/static"))

app.get('/api', (req, res) => {
    res.send("API ENDPOINT")
})

app.get('/game', (req, res) => {
    res.send(JSON.stringify(Game.toObj()))
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})