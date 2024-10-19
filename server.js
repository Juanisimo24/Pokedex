const express = require('express');
const app = express();
const axios = require('axios');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
app.use(express.static('public'));

var a= `https://pokeapi.co/api/v2/pokemon`;
var resultados=null;
app.engine("ejs",require("ejs").renderFile);
app.set("view engine", "ejs");
app.set("views","./views");

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const PORT = process.env.PORT || 3000;
let currentPokemonId = 1; // Empezamos en el Pokémon con ID 1

//endpoint  para obtener el siguiente Pokémon
app.get('/', async (req, res) => {
   
    try{
        if(resultados===null){
            resultados = await axios.get(a);
        } 
        var pokedex = {
            Pokedex: resultados.data.results,
            next: resultados.data.next,
            prev: resultados.data.previous,
            currentPokemonId: currentPokemonId,
        }
        var images = [];
        for(pokemon of resultados.data.results){
            try{const data = await axios.get(pokemon.url);
                //console.log("props:  ", POKEimage.data);
                var image = data.data.sprites.front_default;
                images.push(image);
            }
                catch{
                    res.status(404).send({ error: "Error en los datos de la Pokedex"});
                }
        }
        res.render("index", {pokedex, images});
    } catch(error){
        console.error(error);
        res.status(500).json({ error: "Error en los datos de la Pokedex"});
    }
});


//endpoint devuelve los siguientes 20 pokemons
app.get('/pokemon/:b', async (req,res)=>{
    const {b} = req.params;
    try{
    a=b;
        resultados = await axios.get(a);
        res.redirect("/");
    } catch{
        res.status(404).send({ error: "Error en los datos de la Pokedex"});
    }
});

var image = null

// endpoint para obtener imagenes
app.get("/pokemon/response/:image",async(req,res)=>{
    const {image} = req.params;
    try{const POKEimage = await axios.get(image);
    //console.log("props:  ", POKEimage.data);
    image = {link:POKEimage.data.sprites.front_default};}
    catch{
        res.status(404).send({ error: "Error en los datos de la Pokedex"});
    }
});

var pokemon = {};

app.get("/searcha", (req, res)=>{
    var name = req.query.name;
    res.redirect("/search/"+name);
});

// Endpoint para buscar un Pokémon por nombre
app.get('/search/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        // Enviar solo la información del Pokémon encontrado
        pokemon = {
            name: response.data.name,
            image: response.data.sprites.front_default,
            types: response.data.types.map(type => type.type.name),
            experience: response.data.base_experience,
            weight: response.data.weight,
            height: response.data.height,
            moves: response.data.moves.map(move => move.move.name).slice(0, 5), // Mostrar los primeros 5 movimientos
            abilities: response.data.abilities.map(ability => ability.ability.name)
        };
        res.redirect("/search");
    } catch (error) {
        console.error(error);
        res.render('error', { message: `No se encontró el Pokémon con el nombre "${name}".` });
    }
});

app.get("/search", (req, res)=>{
    res.render("PokemonCards", {pokemon});
});


// Servidor escuchando en el puerto definido
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
