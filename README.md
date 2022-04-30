Pokedex - with PokeAPI
===

Having fun with the PokeAPI - A script that allows the user to retrieve a Pokedex-like entry for a Pokemon. 
Data supports Pokemon from Gen 1 to Gen 8, including Pokemon from the Sword and Shield DLC

## How we did it 

1. Navigate to PokeAPI page and go to the [API v2 Tab](https://pokeapi.co). 
The documentation will have many endpoints, from Berries to Evolution chain. 

2. 
  * Call the *getPokemon* method to get a Pokedex entry for a given Pokemon Dex number or Pokemon name

    ```
    entry = dex.getPokemon('Mewtwo')

    output: 
    
    #150
    Mewtwo
    Single Type Psychic Pokemon
    Ability: 1. Pressure
    Hidden Ability: Unnerve
    Native Generation: Kanto
    ```
    
    Nothing is currently returned from this function, just printed.

  * Call the *getStats* method to get a full list of Pokemon with they types and sum of their base stats. The user can also filter down to what Primary type they want by setting a PokeType as an argument

    ```
    waterType = dex.getStats('Water')
    ```

