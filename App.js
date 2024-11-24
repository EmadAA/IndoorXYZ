import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
// import Login from './components/Login';
// import Signup from './components/Signup';
// import Welcomepage from './components/Welcomepage';
import React from 'react';

import Home from './components/Home';
export default function App() {
  return (
    <View style={styles.container}>

    {/* <Welcomepage /> */}
    {/* <Signup /> */}
    {/* <Login/> */}
    <Home />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
