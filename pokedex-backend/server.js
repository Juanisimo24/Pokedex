const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint para obtener un Pokémon por su ID o nombre
app.get('/pokemon/:idOrName', async (req, res) => {
    const { idOrName } = req.params;
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
        const pokemonData = response.data;
        res.json({
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            type: pokemonData.types.map(typeInfo => typeInfo.type.name).join(', '),
            experience: pokemonData.base_experience,
            weight: pokemonData.weight,
            height: pokemonData.height,
            moves: pokemonData.moves.map(moveInfo => moveInfo.move.name),
            abilities: pokemonData.abilities.map(abilityInfo => abilityInfo.ability.name),
        });
    } catch (error) {
        res.status(404).json({ error: 'Pokemon not found' });
    }
});

// Servidor escuchando en el puerto definido
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
