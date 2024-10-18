const express = require('express');
const app = express();
const axios = require('axios');
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

let currentPokemonId = 1; // Empezamos en el Pokémon con ID 1

app.set('view engine', 'ejs');

// Definir la carpeta donde estarán las vistas
app.set('views','./views');

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
app.get('/pokemon/:url', async (req,res)=>{
    const {url} = req.params;
    var response;
    try{
        response = await axios.get(url);
        console.log("res:",response);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: "Error en los datos de la Pokedex"});
    }
    res.render('index',{Pokedex:response.data.results,next:response.data.next});
});

// Servidor escuchando en el puerto definido
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
