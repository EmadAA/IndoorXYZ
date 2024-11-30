import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Signup = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Handle login action for the SignUp button
  const handleSignUp = () => {
    // You can add authentication logic here
    // If successful, navigate to the Login screen
    navigation.navigate('Login'); // Adjust this to the name of the screen you want to navigate to
  };

  // Handle Google login action
  const handleGoogleLogin = () => {
    // Add logic for Google login here if needed
    navigation.navigate('Login'); // Navigate to Login page after Google login
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        {/* Header Logo */}
        <View style={styles.header}>
          <Image
            source={require('../assets/Logo.png')} // Replace with your logo URL
            style={styles.logo}
          />
        </View>

        {/* Sign Up Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create Account</Text>

          {/* Full Name Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter Name (Ex. Indoor XYZ)"
              placeholderTextColor="#bbb"
              // Default value shown in the image
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email (Ex. indoorxyz@gmail.com)"
              placeholderTextColor="#bbb"
               // Default value shown in the image
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#bbb"
              secureTextEntry
              // Default value shown in the image
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Or Divider */}
          <Text style={styles.orText}>Or</Text>

          {/* Google Sign Up Button */}
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
            <Text style={styles.googleText}>Already Have an Account?</Text>
          </TouchableOpacity>

          {/* Contact Support */}
          <TouchableOpacity>
            <Text style={styles.contactText}>
              Did You Face Any Issue? <Text style={styles.contactLink}>Contact US</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginTop: 120,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  signUpButton: {
    backgroundColor: '#8A5EFF',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
    fontSize: 14,
  },
  googleButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom:55,
  },
  googleText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactText: {
    textAlign: 'center',
    color: '#333',
    fontSize: 14,
  },
  contactLink: {
    color: '#FBB03B',
    fontWeight: 'bold',
  },
});

export default Signup;