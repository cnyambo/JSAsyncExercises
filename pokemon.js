//1. Further Study Q1 and Q2

async function getAllPokemon() {
    let pokemon = await $.getJSON(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
    let response = pokemon.results.map(pok => ({
        name: pok.name,
        url: pok.url
    }));
    for (let i = 0; i < 3; i++) {
        let randVal = Math.floor(Math.random() * (pokemon.count) );
        let randPokemons = await $.getJSON(response[randVal].url);
        console.log(randPokemons);
    }
}

//Father Study Q3 and Q4

async function getThreePokemon() {
    try {
        let threePokemons = [];
        let pokemon = await $.getJSON(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
        let response = pokemon.results.map(pok => ({
            name: pok.name,
            url: pok.url
        }));
        for (let i = 1; i <= 3; i++) {            
            let randVal = Math.floor(Math.random() * (pokemon.count))
            let name = response[randVal].name
            threePokemons.push(
                $.getJSON(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
            )            
        }
        let pokemons = await Promise.all(threePokemons);    
        console.log(pokemons)
        pokemons.forEach(function(p) {                   
            const res = p.flavor_text_entries.find(element => {
                return element.language.name  == 'en';
              });
                             
            $(`.row`).prepend(`<div class="col-sm md-12 border border-secondary">
            <h2>${p.name}</h2>
            <p>${res.flavor_text}</p>
            </div>`) ;   
        })
    }catch(e) {
        console.log("Ooops some of the 3 pokemons don't have species")
    }
}

$(document).on('click', '#btnGetPokemonClick', function() { 
    const container = document.getElementById('pokemon');
    container.textContent = '';
    getThreePokemon();
}); 