async function next(url){
    console.log(url);
    try{
        await fetch(`/pokemon/${encodeURIComponent(url)}`);
    } catch(error){
        console.error('Error al leer la pokedex', error);
    }

}