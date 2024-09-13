import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import database from '@react-native-firebase/database';

export default function Payment({ navigation, route }) {
  const { bookingItems, totalAmount } = route.params; // Passed from previous page
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

  const handlePayNow = () => {
    const options = {
      description: 'Payment for Just Calls services',
      image: 'https://your-logo-url.png',
      currency: 'INR',
      key: 'your_razorpay_key_here', // Replace with your Razorpay key
      amount: totalAmount * 100, // Amount in paisa (for example, 50000 paisa = 500 INR)
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
    const userId = 'user-id'; // Assume you have the user's ID

    // Save booking details to Firebase
    database().ref(`/users/bookedservice/${userId}`).push({
      bookingItems,
      totalAmount,
      paymentStatus: status,
      paymentId: paymentId || null
    });

    // Navigate to the "Booked Services" page or show confirmation
    navigation.navigate('BookedServices');
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
