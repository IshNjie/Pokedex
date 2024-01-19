import { StyleSheet, Text, View, Image } from 'react-native';
import Header from './components/header';
import DexInput from './components/dexInput';
import { useState } from 'react';
import { colors } from './components/styles';


export default function App() {
  const [mon, setMon] = useState('') //json object output
  //const [dex, setDex] = useState('') // dexnumber
  const [type, setType] = useState('')

  // handle inputs

  // Set up API data retreival
const getPokemon = async(id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const result = await fetch (url)
    const pokemon = await result.json()
    console.log(pokemon)
    setMon(pokemon)

  }

const createPokemon = () => {
  if(mon){
    const dex_number = mon.id
    console.log(dex_number)
    const name = mon.name[0].toUpperCase() + mon.name.slice(1)
    console.log(name)
    const poketype = mon.types[0].type.name[0].toUpperCase() + mon.types[0].type.name.slice(1);
    //
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dex_number}.png`

    const colour = colors[poketype.toLowerCase()];
    console.log(colour)
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


  const dexSearch = (input) => {
    if(input){
      getPokemon(input)
      
    }
    
  }




  // Render
  return (
    <View>
    <Header />
      <DexInput dexSearch={dexSearch}/>
      <View style={styles.container}>
        {createPokemon()}
  
    </View>
    </View>
  );
}



const styles = StyleSheet.create({
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
