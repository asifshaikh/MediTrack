import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';

export default function SignUp() {
  const router = useRouter();
  return (
    <View
      style={{
        marginTop: 150,
        padding: 20,
      }}
    >
      <Text style={style.textHeader}>Create New Account</Text>
      <View style={{ marginTop: 40 }}>
        <Text>Full Name</Text>
        <TextInput placeholder='Full Name' style={style.textInput} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>Email</Text>
        <TextInput placeholder='Email' style={style.textInput} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>Password</Text>
        <TextInput
          placeholder='Password'
          style={style.textInput}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={style.button}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 17 }}>
          Sign Up
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.buttonCreate}
        onPress={() => router.push('login/SignIn')}
      >
        <Text
          style={{ color: Colors.PRIMARY, textAlign: 'center', fontSize: 17 }}
        >
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  textHeader: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 30,
    color: Colors.GRAY,
    fontWeight: 'bold',
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    fontSize: 17,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 35,
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
  },
  buttonCreate: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
});
