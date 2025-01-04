import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import Colors from '../../constant/Colors';
import { useRouter } from 'expo-router';
import { auth } from '../../configs/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSignInClick = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.replace('(tabs)');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorCode === 'auth/invalid-credential') {
          Alert.alert('Error', 'Invalid Email or Password');
        }
      });
  };

  return (
    <View
      style={{
        marginTop: 150,
        padding: 20,
      }}
    >
      <Text style={style.textHeader}>Lets Sign You In</Text>
      <Text style={style.subText}>Welcome Back</Text>
      <View style={{ marginTop: 40 }}>
        <Text>Email</Text>
        <TextInput
          placeholder='Email'
          style={style.textInput}
          onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text>Password</Text>
        <TextInput
          placeholder='Password'
          style={style.textInput}
          secureTextEntry={true}
          onChangeText={(value) => setPassword(value)}
        />
      </View>
      <TouchableOpacity style={style.button} onPress={onSignInClick}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 17 }}>
          Sign In
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.buttonCreate}
        onPress={() => router.push('login/SignUp')}
      >
        <Text
          style={{ color: Colors.PRIMARY, textAlign: 'center', fontSize: 17 }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

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
