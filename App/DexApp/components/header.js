import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {

    return (

        <View style={styles.header}>
            <Text style={styles.title}> Pokedex </Text>

        </View>
    )

}

const styles = StyleSheet.create({
    header: {
      height: 100,
      paddingTop: 50,
      backgroundColor: '#E4D00A',
    },
    title: {
      textAlign: 'center',
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      padding: 10
    }
  });
  

export default Header