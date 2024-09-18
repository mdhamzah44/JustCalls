import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay'; // Ensure this works with your setup
import firebase from 'firebase/app'; // Import Firebase modules
import 'firebase/database'; // Import Firebase Database service

// Initialize Firebase (replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: 'your-api-key',
  authDomain: 'your-auth-domain',
  databaseURL: 'your-database-url',
  projectId: 'your-project-id',
  storageBucket: 'your-storage-bucket',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id',
};

// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Payment({ navigation, route }) {
  const { bookingItems, totalAmount } = route.params; // Passed from previous page
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const handlePayNow = () => {
    const options = {
      description: 'Payment for Just Calls services',
      image: 'https://your-logo-url.png',
      currency: 'INR',
      key: 'your_razorpay_key_here', // Replace with your Razorpay key
      amount: totalAmount * 100, // Amount in paisa (e.g., 50000 paisa = 500 INR)
      name: 'Just Calls',
      prefill: {
        email: 'customer_email@example.com',
        contact: '9876543210',
        name: 'Customer Name'
      },
      theme: { color: '#3399cc' }
    };

    setIsPaymentProcessing(true);

    RazorpayCheckout.open(options)
      .then((data) => {
        // Success payment response
        setIsPaymentProcessing(false);
        Alert.alert('Payment Success', `Payment ID: ${data.razorpay_payment_id}`);
        saveBookingDetailsToFirebase(data.razorpay_payment_id, 'success');
      })
      .catch((error) => {
        // Failure payment response
        setIsPaymentProcessing(false);
        Alert.alert('Payment Failed', error.description);
      });
  };

  const saveBookingDetailsToFirebase = (paymentId, status) => {
    const userId = 'user-id'; // Replace with actual user ID or get it from context/auth

    // Save booking details to Firebase
    firebase.database().ref(`/users/bookedservice/${userId}`).push({
      bookingItems,
      totalAmount,
      paymentStatus: status,
      paymentId: paymentId || null
    })
    .then(() => {
      // Navigate to the "Booked Services" page or show confirmation
      navigation.navigate('BookedServices');
    })
    .catch((error) => {
      Alert.alert('Error', 'Could not save booking details. Please try again.');
    });
  };

  const handlePayLater = () => {
    // Pay Later: Save booking details to Firebase without payment
    saveBookingDetailsToFirebase(null, 'pending');
    Alert.alert('Booked', 'Your service has been booked. You can pay later.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Total Amount: ₹{totalAmount}</Text>

      <Button
        title="Pay Now"
        onPress={handlePayNow}
        disabled={isPaymentProcessing}
      />

      <Button
        title="Pay Later"
        onPress={handlePayLater}
        color="gray"
        disabled={isPaymentProcessing}
      />

      {isPaymentProcessing && <Text>Processing Payment...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
});
