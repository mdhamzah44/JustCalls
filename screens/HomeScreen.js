import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Dimensions,
  Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ViewPager from '@react-native-community/viewpager';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const services = [
  { name: 'Washing Machine', icon: require('../assets/washing-machine.png') },
  { name: 'RO', icon: require('../assets/ro.png') },
  { name: 'Fridge', icon: require('../assets/fridge.png') },
  { name: 'Chimney', icon: require('../assets/chimney.png') },
  { name: 'AC', icon: require('../assets/ac.png') },
  { name: 'LED TV', icon: require('../assets/tv.png') },
];

const banners = [
  require('../assets/banner1.jpg'),
  require('../assets/banner2.jpg'),
  require('../assets/banner3.jpg'),
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Check login status
    // setIsLoggedIn(true/false);

    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const renderBanner = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp'
    });

    return (
      <Animated.View style={[styles.bannerContainer, { transform: [{ scale }] }]}>
        <Image source={item} style={styles.bannerImage} />
      </Animated.View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../assets/menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Just Calls</Text>
        {!isLoggedIn && (
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButton}>Login</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>

      <Animated.FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={banners}
        renderItem={renderBanner}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      />

      <View style={styles.serviceGrid}>
        {services.map((service, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.serviceItem} 
            onPress={() => navigation.navigate('Item', { service: service.name })}
          >
            <Image source={service.icon} style={styles.serviceIcon} />
            <Text style={styles.serviceText}>{service.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.adBox}>
        <Text style={styles.adTitle}>Special Offers</Text>
        {/* Add scrollable advertisement content here */}
      </View>

      <TouchableOpacity 
        style={styles.referButton} 
        onPress={() => {/* Handle refer action */}}
      >
        <LinearGradient 
          colors={['#FF9966', '#FF5E62']} 
          style={styles.referGradient}
        >
          <Text style={styles.referText}>Refer for Reward</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 10,
  },
  menuIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginButton: {
    color: '#fff',
    fontSize: 16,
  },
  bannerContainer: {
    width: width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
  serviceItem: {
    width: '30%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#2C3E50',
  },
  adBox: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2C3E50',
  },
  referButton: {
    margin: 15,
    borderRadius: 25,
    overflow: 'hidden',
  },
  referGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  referText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});