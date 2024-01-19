import { useState } from "react"
import { TextInput, StyleSheet, Button, View } from "react-native"


const DexInput = ( {dexSearch} ) => {
    const [input, setInput] = useState('')

    const handleInput = (val) =>{
        setInput(val)

    }

    return (

        <View>

            <TextInput 
            style = {styles.input}
            placeholder=" Dex Number"
            value= {input}
            onChangeText={handleInput}
            />
            <Button onPress={() => dexSearch(input)} title = 'Search'/>
        </View>
    )

   
}

const styles = StyleSheet.create({

    input:{
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderWidth : 1,
     
  
    }
  })


export default DexInput