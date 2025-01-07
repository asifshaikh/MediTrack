import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import ConstantString from '../../constant/ConstantString';
import Colors from '../../constant/Colors';

export default function EmptyState() {
  return (
    <View
      style={{
        marginTop: 80,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('../../assets/images/medicine.png')}
        style={{
          width: 120,
          height: 120,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: 10,
        }}
      >
        {ConstantString.NoMedication}
      </Text>
      <Text
        style={{
          fontSize: 20,
          color: 'gray',
          marginTop: 10,
          textAlign: 'center',
        }}
      >
        {ConstantString.MedicationSubText}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.PRIMARY,
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
          width: '100%',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
          }}
        >
          {ConstantString.AddNewMedication}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
