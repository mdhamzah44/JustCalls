import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Mock data - replace with actual data fetching logic
const mockItems = [
  { id: '1', title: 'Basic Service', description: 'Standard cleaning and maintenance', price: 29.99, rating: 4.5, time: '1 hour' },
  { id: '2', title: 'Deep Clean', description: 'Thorough cleaning and servicing', price: 49.99, rating: 4.8, time: '2 hours' },
  { id: '3', title: 'Repair Service', description: 'Fix common issues and replace parts', price: 79.99, rating: 4.7, time: '1-3 hours' },
];

export default function ItemScreen({ route, navigation }) {
  const { service } = route.params;
  const [items, setItems] = useState([]);

  const listOpacity = useSharedValue(0);
  const listTranslateY = useSharedValue(50);

  useEffect(() => {
    // Fetch items from API or database
    setItems(mockItems);

    listOpacity.value = withSpring(1);
    listTranslateY.value = withSpring(0);
  }, []);

  const animatedListStyle = useAnimatedStyle(() => {
    return {
      opacity: listOpacity.value,
      transform: [{ translateY: listTranslateY.value }],
    };
  });

  const renderItem = ({ item }) => (
    <Animated.View style={[styles.itemContainer, animatedListStyle]}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <View style={styles.itemDetails}>
        <Text style={styles.itemPrice}>₹{item.price}</Text>
        <View style={styles.ratingContainer}>
          <Image source={require('../assets/star.png')} style={styles.starIcon} />
          <Text style={styles.itemRating}>{item.rating}</Text>
        </View>
      </View>
      <Text style={styles.itemTime}>Estimated time: {item.time}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => {/* Add to cart logic */}}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>{service}</Text>
      </LinearGradient>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
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
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  listContainer: {
    padding: 15,
  },
  itemContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  itemDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980B9',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  itemRating: {
    fontSize: 14,
    color: '#F39C12',
  },
  itemTime: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});