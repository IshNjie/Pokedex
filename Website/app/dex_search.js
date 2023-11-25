

const poke_container = document.getElementById('poke_container');


function performSearch () {
    

    const searchValue = document.getElementById('searchInput').value;

    console.log(searchValue) // string value
    
    getPokemon(searchValue);
    
}


async function getPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const result = await fetch(url);
    const pokemon = await result.json();
    console.log(pokemon);
    createPokeEntry(pokemon);
}


function createPokeEntry(pokemon){

    const dex_number = pokemon.id; 
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poketype = pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.slice(1);
    let sec_poketype;

    if(typeof pokemon.types[1] == 'undefined'){
        sec_poketype = 'None';
    }else {
        sec_poketype = pokemon.types[1].type.name[0].toUpperCase() + pokemon.types[1].type.name.slice(1) ;
        }
    

    let abilityList = []
    for (let i=0; i<pokemon.abilities.length; i++){
        const ability = pokemon.abilities[i].ability.name;
        //console.log(i)
        abilityList.push(ability[0].toUpperCase() + ability.slice(1));
        
    }

    const abilityString = abilityList.join(', ')
    
    let statList = []
    let statKey = []
    for (let i=0; i<pokemon.stats.length; i++){
        const base_stat = pokemon.stats[i].base_stat;
        const statName = pokemon.stats[i].stat.name;
        //console.log(i)
        statList.push(base_stat);
        statKey.push(statName[0].toUpperCase() + statName.slice(1));
        
    }

    // Page content
    const pokeInnerHTML = `
    

    <div id = "image_wrap" class="img-container">
        <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dex_number}.png" />
    
    </div>
    
    <div class="entry">
        <span class="number"> #${dex_number.toString().padStart(3,'0')}</span>
        <h2 class="name"> ${name}</h2>
        <h3 class="Type"> Type: ${poketype}/${sec_poketype}</h3>
        <h3 class="Ability"> Abilities: ${abilityString}</h3>

        <div id="stat_container" class = "stat-container">
            <h4 class="Base-Stats"> Base Stats</h4>
            <table class="Stats">
                <tr>
                    <th class=${statKey[0]}> ${statKey[0]}:</th>
                    <th>  ${statList[0]} </th>
                </tr>

                <tr>
                    <th class=${statKey[1]}> ${statKey[1]}:</th>
                    <th>  ${statList[1]} </th>
                </tr>

                <tr>
                    <th class=${statKey[2]}> ${statKey[2]}:</th>
                    <th>  ${statList[2]} </th>
                </tr>

                <tr>
                    <th class=${statKey[3]}> ${statKey[3]}:</th>
                    <th>  ${statList[3]} </th>
                </tr>

                <tr>
                    <th class=${statKey[4]}> ${statKey[4]}:</th>
                    <th>  ${statList[4]} </th>
                </tr>

                <tr>
                    <th class=${statKey[5]}> ${statKey[5]}:</th>
                    <th>  ${statList[5]} </th>
                </tr>

            </table>

    </div>

    
    
    </div>
    `

    poke_container.innerHTML = pokeInnerHTML;

    // add element and html content to the div container to render
    //poke_container.appendChild(pokeEl);
    console.log(poke_container)

}