/* Help from :
https://www.youtube.com/watch?v=XL68br6JyYs&list=PLYbEljNSZ6jnDfFvcoh59s6lzg5NXof5W&index=2&t=736s

*/

// target the div in html by the id
const poke_container = document.getElementById('poke_container_home');

// target the amount of pokemon I want to retrieve
const pokemon_number = 493;

// Assign hex colours to each type to colour the card
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5',
    dark: '#b2a8b5',
    steel: '#B7B7CE',
    ghost: '#ab8ed1',
    ice: '#96D9D6'
};

/*
Create function to get Pokemon
This function will need to be called x amount of times
For how many pokemon you wish to return
*/

// function name = getPokemon
const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    
    // The `await` key word will pause the execution and evaluate the value brought back. 
    const result = await fetch(url);

     // Target the result and turn into json response
    const pokemon = await result.json();
    console.log(pokemon)
    createPokeCard(pokemon);

}

// fetch all pokemon for a given max dex number
const fetchPokemon = async() => {
    // for i from 1 to pokemon_number, do something
    for (let i =1; i <= pokemon_number; i++){
        await getPokemon(i);

    }
};

function createPokeCard(pokemon){
    const pokeEl = document.createElement('div');
    // add a class to element
    pokeEl.classList.add('pokemon');


    // Pokemon Attributes


    /*
    To capitalise, take the first letter and apply upper case
    Then slice from the second letter and concat
    */

    const dex_number = pokemon.id;
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poketype = pokemon.types[0].type.name[0].toUpperCase() + pokemon.types[0].type.name.slice(1);
    
    // some Pokemon have multiple types 
    let sec_poketype;

    if(typeof pokemon.types[1] == 'undefined'){
        sec_poketype = 'None';
    }else {
        sec_poketype = pokemon.types[1].type.name[0].toUpperCase() + pokemon.types[1].type.name.slice(1) ;
        }
    
    // Assign colours to the primary pokemon types for the background of the card
    const colour = colors[poketype.toLowerCase()];
    pokeEl.style.backgroundColor = colour;
    
    /*
    The innerHTML property in HTML is a property of HTML elements that allows you to get or set the HTML content inside an element. 
    It provides a way to manipulate the HTML content within a specific element directly from JavaScript.
    */


    const pokeInnerHTML = `
    

    <div class="img-container">
        <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dex_number}.png" />
    
    </div>
    
    <div class="entry">
        <span class="number"> #${dex_number.toString().padStart(3,'0')}</span>
        <h2 class="name"> ${name}</h2>
        <h3 class="Type">${poketype}/${sec_poketype}</h3>
    
    
    </div>
    `

    pokeEl.innerHTML = pokeInnerHTML;

    // add element and html content to the div container to render
    poke_container.appendChild(pokeEl);


}

fetchPokemon();