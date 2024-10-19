async function recargar(a){
    try{
        await fetch(`/pokemon/${encodeURIComponent(a)}`);
        window.location.reload();
    } catch(error){
        console.error('Error al leer la pokedex', error);
    }

};

async function getI(name){
    console.log("name :",name);
    const url="https://pokeapi.co/api/v2/pokemon-form/"+name+"/";
    try{
        var  response = await fetch(`/pokemon/response/${encodeURIComponent(url)}`);
        response=await response.json();
        console.log("img:",response);
document.getElementById('imgOf'+name).src=response.link;
} catch(error){
    console.error('Error al leer la pokedex', error);
    }
};