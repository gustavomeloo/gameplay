import {StatusBar} from 'expo-status-bar'
import React from "react";
import {Text, View, StyleSheet} from 'react-native'


export default function App () {
  return (
    <View style={styles.container}>
      <Text>Alo mundo</Text>
      <StatusBar style='auto'/>
    </View>
  )
} 

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent : 'center',
  },
});