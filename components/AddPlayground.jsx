import { addDoc, collection } from "firebase/firestore"; // Firestore methods
import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db } from "../Config/Firebase"; // Import Firestore config

export default function BookingScreen() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  const onChange = (event, selectedDate) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) setDate(selectedDate);
  };

  // Handle form submission and add booking to Firestore
  const handleSubmit = async () => {
    // Booking data to send to Firestore
    const bookingData = {
      name,
      phone,
      location,
      price,
      date: date.toISOString(),
      createdAt: new Date(),
    };

    try {
      // Add data to the "bookings" collection
      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      console.log("Booking added with ID:", docRef.id);
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/play.jpg")} style={styles.image} />

      <View style={styles.form}>
        {/* Date picker functionality can be added here */}
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          keyboardType="phone-pad"
          onChangeText={setPhone}
        />

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />

        <TextInput
          style={styles.input}
          placeholder="Price Per Hour"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
  },
  form: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  placeholder: {
    color: "#c4c4c4",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#7A67FF",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
