import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Mock data - replace with actual cart data
const mockCartItems = [
  { id: '1', title: 'Basic Service', price: 29.99 },
  { id: '2', title: 'Deep Clean', price: 49.99 },
];

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([]);
  const listOpacity = useSharedValue(0);
  const listTranslateY = useSharedValue(50);

  useEffect(() => {
    // Fetch cart items from state management or local storage
    setCartItems(mockCartItems);

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
    <Animated.View style={[styles.cartItem, animatedListStyle]}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>₹{item.price}</Text>
    </Animated.View>
  );

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={require('../assets/back.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Your Cart</Text>
      </LinearGradient>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        }
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total:</Text>
        <Text style={styles.totalPrice}>₹{totalPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Booking')}
        >
          <Text style={styles.buttonText}>Book Selected Items</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.checkoutButton]} 
          onPress={() => navigation.navigate('Booking', { allItems: true })}
        >
          <Text style={styles.buttonText}>Checkout All</Text>
        </TouchableOpacity>
      </View>
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
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 16,
    color: '#2C3E50',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980B9',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980B9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  button: {
    flex: 1,
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginRight: 10,
  },
  checkoutButton: {
    backgroundColor: '#27AE60',
    marginRight: 0,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});