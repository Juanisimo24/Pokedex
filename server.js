const express = require('express');
const app = express();
const axios = require('axios');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Set views directory
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data from search

const PORT = process.env.PORT || 3000;
let currentPokemonId = 1; // Empezamos en el Pokémon con ID 1

//endpoint  para obtener el siguiente Pokémon
app.get('/', async (req, res) => {
    var response;
    try{
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
        console.log("res:",response.data.results);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: "Error en los datos de la Pokedex"});
    }
    res.render('index',{Pokedex:response.data.results,next:response.data.next});
});

//endpoint devuelve los siguientes 20 pokemons
app.get('/pokemon/:url2', async (req,res)=>{
    const {url2} = req.params;
    try{
    url =url2;
        response = await axios.get(url);
        console.log("res:",response);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: "Error en los datos de la Pokedex"});
    }
    res.render('index',{Pokedex:response.data.results,next:response.data.next});
});

// Endpoint para buscar un Pokémon por nombre
app.get('/search/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        // Enviar solo la información del Pokémon encontrado
        const pokemon = {
            name: response.data.name,
            image: response.data.sprites.front_default,
            types: response.data.types.map(type => type.type.name),
            experience: response.data.base_experience,
            weight: response.data.weight,
            height: response.data.height,
            moves: response.data.moves.map(move => move.move.name).slice(0, 5), // Mostrar los primeros 5 movimientos
            abilities: response.data.abilities.map(ability => ability.ability.name)
        };
        res.render('index', { pokemon });
    } catch (error) {
        console.error(error);
        res.render('error', { message: `No se encontró el Pokémon con el nombre "${name}".` });
    }
});

// Servidor escuchando en el puerto definido
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
