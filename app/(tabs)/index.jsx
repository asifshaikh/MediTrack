import { View, Text, Button } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/FirebaseConfig';

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='Logout' onPress={() => signOut(auth)} />
    </View>
  );
};

export default HomeScreen;
