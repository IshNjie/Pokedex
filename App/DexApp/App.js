import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Header from './components/header';
import DexInput from './components/dexInput';
import { useState } from 'react';
import { colors, styles } from './components/styles';
import ProgressBar from 'react-native-progress/Bar'



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

      //Pokemon Attributes
      const dex_number = mon.id
      const format_dex = `#${dex_number.toString().padStart(3,'0')}` // #001 for Dex number
      const name = mon.name[0].toUpperCase() + mon.name.slice(1) // Capitalise Name

      // Pokemon types - Pokemon can have two types
      const poketype = mon.types[0].type.name[0].toUpperCase() + mon.types[0].type.name.slice(1);

      let sec_poketype;

      if (typeof mon.types[1] == 'undefined') {
        sec_poketype = null;
      } else {
        sec_poketype = `/${mon.types[1].type.name[0].toUpperCase() + mon.types[1].type.name.slice(1)}`;
      }

      let abilityList = []
      for (let i = 0; i < mon.abilities.length; i++) {
        const ability = mon.abilities[i].ability.name;

        abilityList.push(ability[0].toUpperCase() + ability.slice(1));

      }
      // Break the list and join them into one string

      const abilityString = abilityList.join(', ')

      
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dex_number}.png`

      // Colours are defined in another component as an object and this will retrieve the correct colour for a given type
      const colour = colors[poketype.toLowerCase()];

      let statList = []
      let statKey = []

      for (let i = 0; i < mon.stats.length; i++) {
        const base_stat = mon.stats[i].base_stat;
        const statName = mon.stats[i].stat.name;

        statList.push(base_stat);
        statKey.push(statName.toUpperCase())//[0].toUpperCase() + statName.slice(1));

    }
    //console.log(statKey)
    //console.log(statList)

    //Stats Data to render
    const data = statList.map((value,index) => {
      return {
        id:(index +1).toString(),
        name:statKey[index],
        data:value
      }
    }
  )

      
    return (
      <View >

        <View style={styles.pkTitle}>
          <View style={[styles.textContainer, { backgroundColor: colour }]}>
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={[styles.textContainer, { backgroundColor: colour }]}>
            <Text style={styles.dex}>{format_dex}</Text>
          </View>
        </View>
        
        <View style={[styles.pokemon, { backgroundColor: colour }]}>
          <Image
            style={styles.pkImage}
            source={{
              uri: img,
            }}
          />
          <View>
          <Text style={styles.types}>Type: {poketype}{sec_poketype}</Text>
          
          <Text style={styles.abilities}>Abilities: </Text>
          <View>
            {abilityList.map((item,index) =>(
              <Text key={index} > {index + 1}. {item}</Text>

            ))}
          </View>
          </View>

          
        </View>
          <View style = {[,{backgroundColor: colour}]}>
          <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
            
          </View>
        
      </View>
    );
    

    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.statsContainer}>
      <Text >{item.name}: {item.data}</Text>
      <ProgressBar 
      progress={item.data/255}
      width={null}
      height={15}
      useNativeDriver={true}

      />
    </View>
  );


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
    <View >
    <Header />
    <View >
      <DexInput dexSearch={dexSearch}/>
      </View>
      <View >
        {createPokemon()}
      </View>
    </View>
  );
}


