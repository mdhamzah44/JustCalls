import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Network from 'expo-network';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence, 
  withTiming,
  Easing
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function MainScreen() {
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(true);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);
  const translateY = useSharedValue(height);

  useEffect(() => {
    animateEntrance();
    checkInternetAndNavigate();
  }, []);

  const animateEntrance = () => {
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    translateY.value = withSequence(
      withTiming(0, { duration: 1000, easing: Easing.out(Easing.exp) }),
      withTiming(-20, { duration: 200 }),
      withSpring(0, { damping: 4, stiffness: 80 })
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateY: translateY.value }
      ],
    };
  });

  const checkInternetAndNavigate = async () => {
    const status = await Network.getNetworkStateAsync();
    setIsConnected(status.isConnected);
    if (status.isConnected) {
      setTimeout(() => navigation.navigate('Drawer'), 5000);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, animatedStyle]}>
        <Text style={styles.title}>Just Calls</Text>
        {isConnected ? (
          <ActivityIndicator size="large" color="#4A90E2" />
        ) : (
          <TouchableOpacity style={styles.retryButton} onPress={checkInternetAndNavigate}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2C3E50',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  retryButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  retryText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});