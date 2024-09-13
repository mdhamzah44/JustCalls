import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserProfile() {
  return (
    <View style={styles.container}>
      <Text>User Profile</Text>
      {/* Load and display user details from Firebase */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
