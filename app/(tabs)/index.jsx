import { View, Text, Button } from 'react-native';
import React from 'react';
import { Redirect, useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/FirebaseConfig';
import { removeLocalStorage } from '../../service/Storage';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import MedicationList from '../components/MedicationList';

const HomeScreen = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await removeLocalStorage();
    signOut(auth);
    router.push('login');
  };
  return (
    <View
      style={{
        padding: 25,
        backgroundColor: 'white',
        height: '100%',
      }}
    >
      <Header />
      {/* <EmptyState /> */}
      <MedicationList />
      {/* <Text>HomeScreen</Text>
      <Button title='Logout' onPress={() => handleSignOut()} /> */}
    </View>
  );
};

export default HomeScreen;
