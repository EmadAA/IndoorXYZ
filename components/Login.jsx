import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Login = () => {
  const navigation = useNavigation(); // Initialize navigation

  // Handle login action
  const handleLogin = () => {
    // You can add authentication logic here
    // If successful, navigate to the next screen
    navigation.navigate('WelcomePage'); // Adjust this to the name of the screen you want to navigate to
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  }
  return (
    <View style={styles.container}>
      {/* Header Logo */}
      <View style={styles.header}>
        <Image
          source={require('../assets/Logo.png')} // Replace with your logo URL
          style={styles.logo}
        />
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Login To Continue</Text>

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
          />
        </View>

        {/* Remember Me and Forgot Password */}
        <View style={styles.row}>
          <TouchableOpacity>
            <Text style={styles.link}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Or Divider */}
        <Text style={styles.orText}>Or</Text>

        {/* Sign Up */}
        {/* <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleText} onPress={ handleSignup}>Sign Up</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.googleButton} onPress={handleSignup}>
          <Text style={styles.googleButtonText}>Sign Up</Text>
        </TouchableOpacity>


        {/* Contact Support */}
        <TouchableOpacity>
          <Text style={styles.contactText}>
            Did You Face Any Issue? <Text style={styles.contactLink}>Contact US</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  link: {
    color: '#FBB03B',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#7A67FF',
    paddingVertical: 15,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
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
    marginBottom: 30,
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

export default Login;