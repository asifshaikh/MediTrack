import { View, Text, Alert } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';

export default function Logout() {
  const router = useRouter();
  const handleSignOut = async () => {
    await removeLocalStorage();
    signOut(auth);
    router.push('login');
  };

  React.useEffect(() => {
    Alert.alert('Success', 'Logout successfully', [
      {
        text: 'OK',
        onPress: () => handleSignOut(),
      },
    ]);
  }, []);

  return (
    <View>
      <Text>Logging out...</Text>
    </View>
  );
}
