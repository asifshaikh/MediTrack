import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  return (
    <View>
      <View style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
        <Image
          source={require('../../assets/images/login.png')}
          style={style.image}
        />
      </View>
      <View
        style={{
          padding: 20,
          backgroundColor: Colors.PRIMARY,
          height: '100%',
          borderRadius: 30,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Stay on Track, Stay Healthy
        </Text>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 17,
            marginTop: 25,
          }}
        >
          Track your Meds,Take control of your health. Stay consistent, Stay
          Healthy
        </Text>
        <TouchableOpacity
          style={style.button}
          onPress={() => router.push('login/SignIn')}
        >
          <Text
            style={{
              color: Colors.PRIMARY,
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10, color: 'white', textAlign: 'center' }}>
          Note:By clicking Continue, you agree to our Terms and Conditions
        </Text>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  image: {
    width: 210,
    height: 500,
  },
  button: {
    marginTop: 30,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 90,
  },
});
