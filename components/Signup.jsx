import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth, db } from '../Config/Firebase'; // Import Firebase auth and Firestore

const Signup = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle sign-up action
  const handleSignUp = async () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    try {
      // Firebase sign-up method
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore after sign-up
      await addUserDataToFirestore(user);

      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login'); // Redirect to login screen
    } catch (error) {
      console.error(error);
      Alert.alert('Signup Failed', error.message);
    }
  };

  // Add user data to Firestore
  const addUserDataToFirestore = async (user) => {
    try {
      const userDocRef = doc(db, 'users', user.uid); // Create a reference to the user's Firestore document
      await setDoc(userDocRef, {
        name: name, // Add user-provided name
        email: user.email, // Use the email from the authentication result
        profileImage: '', // Add default or placeholder profile image if available
        location: '', // Example additional field (could be empty initially)
        phone: '', // Example additional field (could be empty initially)
      });

      console.log('User data added to Firestore');
    } catch (error) {
      console.error('Error adding user data to Firestore:', error);
    }
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
              value={name}
              onChangeText={setName} // Bind name state
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email (Ex. indoorxyz@gmail.com)"
              placeholderTextColor="#bbb"
              value={email}
              onChangeText={setEmail} // Bind email state
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#bbb"
              secureTextEntry
              value={password}
              onChangeText={setPassword} // Bind password state
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Or Divider */}
          <Text style={styles.orText}>Or</Text>

          {/* Navigate to Login */}
          <TouchableOpacity style={styles.googleButton} onPress={() => navigation.navigate('Login')}>
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
  // Same styles as provided earlier
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
    marginBottom: 55,
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
