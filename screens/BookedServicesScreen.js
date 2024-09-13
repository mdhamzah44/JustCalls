import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const services = [
  { title: 'Service 1', status: 'Engineer Assigned' },
  { title: 'Service 2', status: 'Booked' }
];

export default function BookedServices() {
  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}</Text>
            <Text>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' },
});
