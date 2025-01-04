import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Tabs, useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { auth } from '../../configs/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function TabLayout() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      console.log(uid);
      setAuthenticated(true);
      // ...
    } else {
      setAuthenticated(false);
      // User is signed out
      // ...
    }
  });
  useEffect(() => {
    if (authenticated == false) {
      router.push('/login');
    }
  }, [authenticated]);

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
          title: 'Add New',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name='plus' size={size} color={color} />
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
