import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchSection from '../components/SearchSection';

const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeFilter, setActiveFilter] = useState('All'); // State to track active filter

  const navigation = useNavigation(); // Initialize navigation inside component

  // Handle navigation to the Booking screen
  const handleNavigateToBooking = () => {
    navigation.navigate('Booking'); // Adjust this to the name of your booking screen
  };

  const playgrounds = [
    {
      id: '1',
      location: 'Baluchor, Sylhet',
      name: 'King Futsal',
      price: '৳999',
      status: 'Available',
      image: 'https://c8.alamy.com/comp/JEE2WA/football-playground-in-australia-soccer-playground-with-goal-posts-JEE2WA.jpg',
    },
    {
      id: '2',
      location: 'Zindabazar, Sylhet',
      name: 'Queen Turf',
      price: '৳1,299',
      status: 'Booked',
      image: 'https://kaboom.org/wp-content/uploads/2024/05/IMG_2615.jpg',
    },
    {
      id: '3',
      location: 'Mirabazar, Sylhet',
      name: 'Dream Turf',
      price: '৳799',
      status: 'Available',
      image: 'https://www.gametime.com/media/wysiwyg/Story_Swings_Mobile.png',
    },
    {
      id: '4',
      location: 'Sunarpara, Sylhet',
      name: 'DBS Club',
      price: '৳1099',
      status: 'Available',
      image: 'https://t4.ftcdn.net/jpg/03/28/27/23/360_F_328272309_h9zOCETSnIN0oNO9lbr6KfU9uQkLHs6o.jpg',
    },
  ];

  const renderPlayground = ({ item }) => (
    <View style={styles.playgroundCard}>
      <Image source={{ uri: item.image }} style={styles.playgroundImage} />
      <View style={styles.playgroundDetails}>
        <View style={styles.infoLeft}>
          <Text style={styles.locationText}>{item.location}</Text>
          <Text style={styles.priceText}>{item.price} / Hour</Text>
        </View>
        <View style={styles.infoRight}>
          <Text style={styles.nameText}>{item.name}</Text>
          <TouchableOpacity onPress={handleNavigateToBooking}>
            <Text
              style={[
                styles.statusText,
                { backgroundColor: item.status === 'Available' ? '#4CAF50' : '#F44336' },
              ]}
            >
              {item.status}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const handleFilterChange = (filter) => {
    setActiveFilter(filter); // Update active filter
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>
          INDOOR <Text style={styles.logoHighlight}>XYZ</Text>
        </Text>
        <TouchableOpacity>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <SearchSection />
      </View>

      {/* Filter Section */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.filterSection}>
          {['All', 'Football', 'Cricket', 'Badminton', "Adil", "Mukter", "Shuvon"].map((filter) => (
            <TouchableOpacity key={filter} onPress={() => handleFilterChange(filter)}>
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilter,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Playground List */}
      <View style={styles.playgroundsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Playgrounds Near You</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={playgrounds}
          renderItem={renderPlayground}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity onPress={() => setActiveTab('home')}>
          <Icon
            name="home"
            style={styles.homeIcon}
            size={30}
            color={activeTab === 'home' ? '#7A67FF' : '#777'}
          />
          <Text
            style={[styles.navText, activeTab === 'home' && styles.activeNavText]}
          >
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('playground')}>
          <Icon
            name="sports-soccer"
            style={styles.playgroundIcon}
            size={30}
            color={activeTab === 'playground' ? '#7A67FF' : '#777'}
          />
          <Text
            style={[styles.navText, activeTab === 'playground' && styles.activeNavText]}
          >
            Playground
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('booking')}>
          <Icon
            style={styles.bookingIcon}
            name="event"
            size={30}
            color={activeTab === 'booking' ? '#7A67FF' : '#777'}
          />
          <Text
            style={[styles.navText, activeTab === 'booking' && styles.activeNavText]}
          >
            Booking
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: 15,
    backgroundColor:'#ddd',
    paddingHorizontal: 20,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    color: '#333',
  },
  activeFilter: {
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#7A67FF',
  },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 50,
      width: '100%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    logoText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    logoHighlight: {
      color: '#7A67FF',
    },
    menuIcon: {
      fontSize: 24,
    },
    searchSection: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#fff',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 10,
      paddingHorizontal: 15,
      marginBottom: 10,
      height: 40,
    },
    findNowButton: {
      backgroundColor: '#7A67FF',
      borderRadius: 10,
      alignItems: 'center',
      paddingVertical: 10,
    },
    findNowText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    filterSection: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginVertical: 10,
      paddingHorizontal: 20,
    },
    playgroundsSection: {
      paddingHorizontal: 20,
    },
    sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 18,
      paddingVertical: 10,
      fontWeight: 'bold',
    },
    viewAllText: {
      color: '#7A67FF',
    },
    playgroundCard: {
      flexDirection: 'column',
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 20,
      marginBottom: 10,
      height: 340,
      overflow: 'hidden',
    },
    playgroundImage: {
      width: '100%',
      height: 230,
    },
    playgroundDetails: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      height: 85,
    },
    infoLeft: {
      alignItems: 'flex-start',
      flex: 1,
    },
    infoRight: {
      alignItems: 'flex-end',
      flex: 1,
    },
    statusText: {
        fontSize: 17, 
        marginTop: 5,
        paddingVertical: 10, 
        paddingHorizontal: 15, 
        backgroundColor: '#4CAF50', 
        color: '#fff', 
        borderRadius: 8, 
        textAlign: 'center', 
        overflow: 'hidden', 
      },
    
    locationText: {
      fontSize: 16,
      color: '#777',
      marginTop:5,
      marginBottom: -8,
    },
    nameText: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    priceText: {
      fontSize: 22,
      color: '#333',
      fontWeight:'bold',
      marginTop: 20,
    },
    bottomNavigation: {
      marginTop: 25,
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderColor: '#ddd',
  
    },
    navText: {
      border: '1px solid #000',
      fontSize: 14,
      color: '#333',
      
    },
    playgroundIcon:{
        marginLeft: 20,
    },
    homeIcon:{
        marginLeft: 5,
    },
    bookingIcon:{
        marginLeft: 10,
    },
  });

export default Home;