import { useState } from "react"
import { TextInput, StyleSheet, Button, View } from "react-native"


const DexInput = ( {dexSearch} ) => {
    const [input, setInput] = useState('')
44
    return (

        <View>

            <TextInput 
            style = {styles.input}
            placeholder=" Dex Number"
            value= {input}
            onChangeText={(input) => setInput(input)}
            
            />

            <Button onPress={() => dexSearch(input)} title = 'Search'/>
        </View>
    )

   
}

const styles = StyleSheet.create({

    input:{
        marginBottom: 10,
        paddingHorizontal: 8,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderWidth : 1,
        width: '100%',
  
    }
  })


export default DexInput