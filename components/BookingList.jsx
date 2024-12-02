import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNavbar from '../components/BottomNavbar'; // Import BottomNavbar

const BookingList = () => {
  const bookings = [
    {
      id: 1,
      location: 'Baluchor, Sylhet',
      title: 'King Futsal',
      price: 500,
      time: '03pm-04pm',
      image: 'https://t4.ftcdn.net/jpg/03/28/27/23/360_F_328272309_h9zOCETSnIN0oNO9lbr6KfU9uQkLHs6o.jpg' // Replace with actual image URLs
    },
    {
      id: 2,
      location: 'Baluchor, Sylhet',
      title: 'King Kong',
      price: 800,
      time: '03pm-04pm',
      image: 'https://t4.ftcdn.net/jpg/03/28/27/23/360_F_328272309_h9zOCETSnIN0oNO9lbr6KfU9uQkLHs6o.jpg',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.header}>Booking List</Text>
        {bookings.map((booking) => (
          <View key={booking.id} style={styles.card}>
            <Image source={{ uri: booking.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.location}>{booking.location}</Text>
              <Text style={styles.title}>{booking.title}</Text>
              <Text style={styles.price}>৳{booking.price}/Per Hour</Text>
              <Text style={styles.time}>{booking.time}</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.badge}>Booked</Text>
          </View>
        ))}
      </ScrollView>
      <BottomNavbar activeTab="booking" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    marginTop: 70,
    marginBottom: 30,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 10,
  },
  location: {
    color: '#666',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  price: {
    color: '#666',
    fontSize: 16,
  },
  time: {
    color: '#000',
    marginVertical: 5,
    fontSize: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#7A67FF',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#FF4D4D',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#654',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default BookingList;
