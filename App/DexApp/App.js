import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
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
      
      const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${dex_number}.png`

      const colour = colors[poketype.toLowerCase()];

      let statList = []
      let statKey = []

      for (let i = 0; i < mon.stats.length; i++) {
        const base_stat = mon.stats[i].base_stat;
        const statName = mon.stats[i].stat.name;

        statList.push(base_stat);
        statKey.push(statName[0].toUpperCase() + statName.slice(1));

    }
    console.log(statKey)
    console.log(statList)

    const data = statList.map((value,index) => {
      return {
        id:(index +1).toString(),
        name:statKey[index],
        data:value
      }


    }
    )
    console.log(data[0].data)

    

      
    return (
      <View>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.pokemon}>
          <Image
            style={[styles.pkImage, { backgroundColor: colour }]}
            source={{
              uri: img,
            }}
          />
          <View>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          </View>
        </View>
      </View>
    );
    

    }

  }

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}:{item.data}</Text>
      </View>
  );


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
    <View style = {styles.input}>
      <DexInput dexSearch={dexSearch}/>
      </View>
      <View style={styles.container}>
        {createPokemon()}
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  app:{
    //backgroundColor:'pink'

  },
  input: {
    padding:30,
    marginBottom:-40,
    alignSelf:'center',
    width:'60%',
  },

  container: {
    marginTop:0,
    flex: 1,
    alignItems: 'center',
    backgroundColor:'black',
  },

  pokemon: {
    padding:1,
  },

  pkImage:{
    width:200,
    height:200,
    borderRadius: 10,
    overflow: 'hidden'

  },
  name:{
    padding:40,
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },

  itemContainer: {
    marginHorizontal: 10,
    marginTop: 14,
    padding: 20,
    backgroundColor: '#E0BBE4',
    fontSize: 14,
    borderRadius: 10,
    overflow: 'hidden'
  },
  itemText: {
    fontSize: 18,
    marginBottom: 8,
    color:'black'
  }
});
