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
import { db } from '../Config/Firebase';
import BottomNavbar from './BottomNavbar';
import SearchSection from './SearchSection';

const Home = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [activeFilter, setActiveFilter] = useState('All');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const bookingsRef = collection(db, 'bookings');
      const q = query(bookingsRef);
      const querySnapshot = await getDocs(q);

      const bookingsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        location: doc.data().location || 'Location not specified',
        name: doc.data().name || 'Unnamed',
        price: doc.data().price || '0',
        phone: doc.data().phone || 'N/A',
        date: doc.data().date || '',
        status: doc.data().status || 'Available', // Ensure status is dynamically fetched
      }));

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
    const imageSource = item.image
      ? { uri: item.image }
      : require('../assets/play.jpg');

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
                  {
                    backgroundColor:
                      item.status === 'Available' ? '#4CAF50' : '#F44336',
                  },
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

  // Add Header Component for FlatList
  const renderHeader = () => (
    <View>
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
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>
          INDOOR <Text style={styles.logoHighlight}>XYZ</Text>
        </Text>
        <TouchableOpacity>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList as Main Scroller */}
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={styles.loader} />
      ) : bookings.length === 0 ? (
        <Text style={styles.noPlaygroundsText}>No bookings available</Text>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBooking}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader} // Add the Search and Filter sections here
          contentContainerStyle={styles.playgroundsSection}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </View>
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
  // searchSection: {
  //   paddingHorizontal: 20,
  //   paddingVertical: 10,
  //   backgroundColor: '#fff',
  // },
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
  loader: {
    marginVertical: 20,
  },
  noPlaygroundsText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default Home;
