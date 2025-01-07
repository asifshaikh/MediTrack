import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getLocalStorage } from '../../service/Storage';

export default function TabLayout() {
  const router = useRouter();

  useEffect(() => {
    getUserDetails();
  }, []);
  const getUserDetails = async () => {
    const userInfo = await getLocalStorage('userDetail');
    if (!userInfo) {
      router.replace('/login');
    }
  };

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='home' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='AddNew'
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='history' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='user' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
