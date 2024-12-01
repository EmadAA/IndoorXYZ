import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text >Profile</Text>
      <View style={styles.profileSection}>
    <Image source={require("../assets/play.jpg")} style={styles.profileImage}/>
    <View>
        <Text> Farhan Shuvon</Text>
        <Text>Baluchor</Text>
        <Text>+5448</Text>
    </View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  profileSection: {
   display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,

  },
  profileImage:{
        width: 200,
        height: 200,        
        
  }
})