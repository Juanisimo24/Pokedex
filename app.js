import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

var PORT = 8080;
var app = express();
app.use(express.static('public'));
app.listen(PORT, () => {
    console.log(`Server running`);
});

app.get("/", (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const _retfile = path.join(__dirname, 'Pokedex.html');

    res.sendFile(_retfile);
});

app.get("/cards", (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const _retfile = path.join(__dirname, 'PokemonCards.html');

    res.sendFile(_retfile);
});