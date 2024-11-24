import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Welcomepage() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
        source={require('../assets/Logo.png')} // Adjusted path
        style={styles.logo}
        />
      </View>
      <Text style={styles.welcomeText}>Welcome To</Text>
      <Text style={styles.appName}>
        INDOOR <Text style={styles.highlight}>XYZ</Text>
      </Text>
      <Text style={styles.description}>
        Rent the perfect playground or share yours with families!
      </Text>
      <TouchableOpacity style={styles.rentButton}>
        <Text style={styles.rentButtonText}>Rent A Playground</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.listButton}>
        <Text style={styles.listButtonText}>List Your Playground</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Did You Face Any Issue?{' '}
        <Text style={styles.contactLink}>Contact US</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 5,
  },
  appName: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  highlight: {
    color: '#BFA5FF',
  },
  description: {
    color: '#A0A0A0',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  rentButton: {
    backgroundColor: '#8A5EFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  rentButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listButton: {
    borderColor: '#8A5EFF',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  listButtonText: {
    color: '#8A5EFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    color: '#A0A0A0',
    fontSize: 14,
    marginTop: 20,
    
  },
  contactLink: {
    color: '#8A5EFF',
    textDecorationLine: 'underline',
  },
});
