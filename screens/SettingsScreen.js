import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Button title="Dark Mode" onPress={() => {}} />
      <Button title="Privacy Policy" onPress={() => {}} />
      <Button title="Terms and Conditions" onPress={() => {}} />
      <Button title="About Us" onPress={() => {}} />
      <Button title="About Developer" onPress={() => {}} />
      <Button title="Join Us" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});
