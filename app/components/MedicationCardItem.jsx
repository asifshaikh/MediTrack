import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '../../constant/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
export default function MedicationCardItem({ medicine, selectedDate = '' }) {
  const [status, setStatus] = useState('');

  useEffect(() => {
    checkStatus();
  }, [medicine]);
  const checkStatus = () => {
    const data = medicine?.action?.find((item) => item.date == selectedDate);
    console.log('--', data);
    setStatus(data);
  };
  return (
    <View style={style.container}>
      <View style={style.subContainer}>
        <View style={style.imageContainer}>
          <Image
            source={{ uri: medicine?.type?.icon }}
            style={{ width: 60, height: 60 }}
          />
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
            {medicine?.name}
          </Text>
          <Text style={{ fontSize: 17 }}>{medicine?.when}</Text>
          <Text style={{ color: 'grey' }}>
            {medicine?.dose} {medicine?.type?.name}
          </Text>
        </View>
      </View>
      <View style={style.reminderContainer}>
        <Ionicons name='timer-outline' size={24} color='black' />
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
          {medicine?.reminderTime}
        </Text>
      </View>
      {status?.date && (
        <View style={style.statusContainer}>
          {status?.status == 'Taken' ? (
            <Ionicons name='checkmark-circle' size={24} color={Colors.GREEN} />
          ) : (
            status?.status == 'Missed' && (
              <Ionicons name='close-circle' size={24} color={'red'} />
            )
          )}
        </View>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.LIGHT_PRIMARY,
    marginTop: 10,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 10,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderContainer: {
    padding: 13,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
  },
  statusContainer: {
    position: 'absolute',
    top: 5,
    padding: 7,
  },
});
