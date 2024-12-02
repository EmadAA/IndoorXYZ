import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomNavbar from "../components/BottomNavbar";

const Profile = () => {
  const navigation = useNavigation();
  const handleNavigate = (screen, tab) => {
    setActiveTab(tab); // Update activeTab state
    navigation.navigate('AddPlayground'); // Navigate to AddPlayground screen
  };
  const [activeTab, setActiveTab] = useState('profile');
  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileCard}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} // Replace with actual profile image
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.name}>Farhan Israk Shuvon</Text>
          <Text style={styles.location}>Baluchor, Sylhet</Text>
          <Text style={styles.phone}>+088 14 484 ****</Text>
          <TouchableOpacity>
            <Text style={styles.socialLink}>Add Social Media Link</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Indoor Button */}
      <TouchableOpacity style={styles.addIndoorButton} onPress={handleNavigate}>
        <Text style={styles.addIndoorText} >Add Indoor</Text>
      </TouchableOpacity>

      {/* Booking Cards */}
      {[1, 2].map((_, index) => (
        <View key={index} style={styles.bookingCard}>
          <Image
            source={{
              uri: 'https://kaboom.org/wp-content/uploads/2024/05/IMG_2615.jpg', // Replace with actual image
            }}
            style={styles.bookingImage}
          />
          <View style={styles.bookingDetails}>
            <Text style={styles.locationText}>Baluchor, Sylhet</Text>
            <Text style={styles.indoorName}>King Futsal</Text>
            <Text style={styles.priceText}>৳500 Per Hour</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
      ))}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
    backgroundColor: "#F8F8F8",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    border:'1px solid #000',
    borderRadius: 15,
    elevation: 3,
    height: 180,
  },
  profileImage: {
    width: 160,
    height: 180,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  profileDetails: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  location: {
    fontSize: 14,
    color: "#666",
    marginVertical: 3,
  },
  phone: {
    fontSize: 14,
    color: "#666",
  },
  socialLink: {
    fontSize: 14,
    color: "#7a67ff",
    marginTop: 5,
  },
  addIndoorButton: {
    backgroundColor: "#7a67ff",
    margin: 10,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  addIndoorText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  bookingCard: {
    backgroundColor: "#FFF",
    margin: 10,
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  bookingImage: {
    width: "100%",
    height: 200,
  },
  bookingDetails: {
    padding: 15,
  },
  locationText: {
    fontSize: 14,
    color: "#666",
  },
  indoorName: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    color: "#333",
  },
  priceText: {
    fontSize: 14,
    color: "#7a67ff",
  },
  timeText: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#7a67ff",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  cancelButton: {
    backgroundColor: "#FF5C5C",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 14,
    width: 100,
    textAlign: "center",
    height: 30,
    paddingVertical: 5,
  },
});

export default Profile;
