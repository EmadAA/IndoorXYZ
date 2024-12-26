import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import SearchSection from '../components/SearchSection';
import { db } from '../Config/Firebase';
import BottomNavbar from './BottomNavbar';

const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      console.log('Fetching bookings...');

      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef);
      
      const querySnapshot = await getDocs(q);
      console.log('Number of documents:', querySnapshot.size);

      const bookingsList = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Document data:', data);
        
        bookingsList.push({
          id: doc.id,
          location: data.location || 'Location not specified',
          name: data.name || 'Unnamed',
          price: data.price || '0',
          phone: data.phone || 'N/A',
          date: data.date || '',
          createdAt: data.createdAt || null,
          // You might want to derive status based on date or other fields
          status: 'Available' // You can modify this based on your business logic
        });
      });

      console.log('Fetched bookings:', bookingsList);
      setBookings(bookingsList);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleNavigateToBooking = (bookingId) => {
    navigation.navigate('Booking', { bookingId });
  };


  const renderBooking = ({ item }) => {
    // Determine the image source
    const imageSource = item.image
      ? { uri: item.image } // Server image
      : require(`../assets/play.jpg`); // Local image in your project folder
  
    return (
      <View style={styles.playgroundCard}>
        <Image source={imageSource} style={styles.playgroundImage} />
        <View style={styles.playgroundDetails}>
          <View style={styles.infoLeft}>
            <Text style={styles.locationText}>{item.location}</Text>
            <Text style={styles.priceText}>{item.price} / Hour</Text>
          </View>
          <View style={styles.infoRight}>
            <Text style={styles.nameText}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleNavigateToBooking(item.id)}>
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
          {['All', 'Football', 'Cricket', 'Badminton'].map((filter) => (
            <TouchableOpacity 
              key={filter} 
              onPress={() => setActiveFilter(filter)}
            >
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

      {/* Bookings List */}
      <View style={styles.playgroundsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Available Bookings</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
        ) : bookings.length === 0 ? (
          <Text style={styles.noPlaygroundsText}>No bookings available</Text>
        ) : (
          <FlatList
            data={bookings}
            renderItem={renderBooking}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        )}
      </View>

      {/* Bottom Navigation */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </ScrollView>
  );
};


const styles = StyleSheet.create({
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
  filterText: {
    fontSize: 15,
    backgroundColor: '#ddd',
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
    borderColor: '#ddd',
    borderRadius: 20,
    marginBottom: 25,
    height: 360,
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
    marginTop: 5,
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
    fontWeight: 'bold',
    marginTop: 20,
  },
  // Additional styles for new elements in the working version
  loader: {
    marginVertical: 20,
  },
  noPlaygroundsText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#666',
  },
  phoneText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  }
});

export default Home;