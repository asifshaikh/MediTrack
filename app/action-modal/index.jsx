import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import moment from 'moment';
export default function MedicationActionModal() {
  const medicine = useLocalSearchParams();
  const router = useRouter();
  const updateActionStatus = async (status) => {
    try {
      const docRef = doc(db, 'medication', medicine?.docId);
      await updateDoc(docRef, {
        action: arrayUnion({
          status: status,
          time: moment().format('LT'),
          date: medicine?.selectedDate,
        }),
      });
      Alert.alert(status, 'Response Saved', [
        {
          text: 'OK',
          onPress: () => router.replace('(tabs)'),
        },
      ]);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={style.container}>
      <Image
        source={require('../../assets/images/notification.gif')}
        style={{
          width: 120,
          height: 120,
        }}
      />
      <Text style={{ fontSize: 20 }}>{medicine?.selectedDate}</Text>
      <Text style={{ fontSize: 38, fontWeight: 'bold', color: Colors.PRIMARY }}>
        {medicine?.reminderTime}
      </Text>
      <Text style={{ fontSize: 20 }}>Its Time to Take {medicine?.name}</Text>
      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={style.closeButton}
          onPress={() => updateActionStatus('Missed')}
        >
          <Ionicons name='close' size={24} color='red' />
          <Text style={{ fontSize: 20, color: 'red' }}>Missed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.successButton}
          onPress={() => updateActionStatus('Taken')}
        >
          <Ionicons name='checkmark' size={24} color='white' />
          <Text style={{ fontSize: 20, color: 'white' }}>Taken</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{ position: 'absolute', bottom: 30 }}
        onPress={() => router.back()}
      >
        <Ionicons name='close-circle' size={44} color={Colors.GRAY} />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  closeButton: {
    padding: 10,
    flexDirection: 'row',
    gap: 6,
    borderWidth: 1,
    alignItems: 'center',
    borderColor: 'red',
    borderRadius: 15,
  },
  successButton: {
    padding: 10,
    flexDirection: 'row',
    gap: 6,
    backgroundColor: Colors.GREEN,
    alignItems: 'center',

    borderRadius: 15,
  },
});
