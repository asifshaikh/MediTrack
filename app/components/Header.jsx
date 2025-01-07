import { View, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { getLocalStorage } from '../../service/Storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constant/Colors';

export default function Header() {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const userInfo = await getLocalStorage('userDetail');
    console.log(userInfo);
    setUser(userInfo);
  };
  return (
    <View style={{ marginTop: 20 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Image
            source={require('../../assets/images/smiley.png')}
            style={{ width: 45, height: 45 }}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 30 }}>
            Hello {user?.displayName} 👋
          </Text>
        </View>
        <Ionicons name='settings-outline' size={34} color={Colors.DARK_GRAY} />
      </View>
    </View>
  );
}
