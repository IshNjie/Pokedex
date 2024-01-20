import { StyleSheet, Text, View, Image } from 'react-native';
import Header from './components/header';
import DexInput from './components/dexInput';
import { useState } from 'react';
import { colors } from './components/styles';


export default function App() {
  const [mon, setMon] = useState('') //json object output

  // handle inputs

  // Set up API data retreival
  const getPokemon = async(id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    // The `await` key word will pause the execution and evaluate the value brought back.
    const result = await fetch (url)
    const pokemon = await result.json()
    console.log(pokemon)

    //Update the mon variable with the Json object form the given input
    setMon(pokemon)

  }

  // Render Pokemon image
  const createPokemon = () => {
    // set condition if the mon is updated from ''
    if(mon){
      const dex_number = mon.id
      ///console.log(dex_number)
      const name = mon.name[0].toUpperCase() + mon.name.slice(1)
      //console.log(name)
      const poketype = mon.types[0].type.name[0].toUpperCase() + mon.types[0].type.name.slice(1);
      //
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dex_number}.png`

      // Colours are defined in another component as an object and this will retrieve the correct colour for a given type
      const colour = colors[poketype.toLowerCase()];

      // This will be rendered on the screen

      return (

        <View style={styles.pokemon}>
          <Image
          style={[styles.pkImage, {backgroundColor:colour}]}
          source = {{
            uri: img,
          }}
          />
        </View>
      )
    }
  }

  // This handles the input
  
  const dexSearch = (input) => {
    let value
    if(input){
      if(typeof input == 'string'){
        value = input.toLowerCase() 
      } else{
        value = input
      }
      getPokemon(value)
      
    }
    
  }




  // Render
  return (
    <View>
    <Header />
    <View style = {styles.content}>
      <DexInput dexSearch={dexSearch}/>
      </View>
      <View style={styles.container}>
        {createPokemon()}
      </View>
    
    </View>
  );
}



const styles = StyleSheet.create({
  content: {
    padding:40,
    //justifyContent:'center',
    alignSelf:'center',
    width:'75%'
  },

  container: {
    flex: 1,
    backgroundColor: '#E4D00A',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pokemon: {
    padding:10,
  },

  pkImage:{
    width:200,
    height:200,
    //alignItems: 'center',
    justifyContent:'center',
    //backgroundColor: colour
    borderRadius: 10,
    overflow: 'hidden'

  }
});
