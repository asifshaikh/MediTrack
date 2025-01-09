import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import Colors from '../../constant/Colors';
import { TypeList } from '../../constant/Options';
import { WhenToTake } from '../../constant/Options';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {
  FormatDate,
  FormatDateForText,
  FormatDateTime,
} from '../../service/ConvertDateTime';

export default function AddMedicationForm() {
  const [formData, setFormData] = useState();

  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(formData);
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Add New Medication */}
      <Text style={style.header}>Add New Medication</Text>

      <View style={style.inputGroup}>
        <Ionicons
          name='medkit-outline'
          size={24}
          color='black'
          style={style.icon}
        />
        <TextInput
          placeholder='Medication Name'
          style={style.textInput}
          onChangeText={(value) => onHandleInputChange('name', value)}
        />
      </View>

      {/* Type */}
      <FlatList
        style={{
          marginTop: 5,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={TypeList}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              style.inputGroup,
              { marginRight: 10 },
              {
                backgroundColor:
                  item.name === formData?.type?.name ? Colors.PRIMARY : 'white',
              },
            ]}
            onPress={() => onHandleInputChange('type', item)}
          >
            <Text
              style={[
                style.typeText,
                {
                  color: item.name === formData?.type?.name ? 'white' : 'black',
                },
              ]}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* DOSE */}
      <View style={style.inputGroup}>
        <Ionicons
          name='eyedrop-outline'
          size={24}
          color='black'
          style={style.icon}
        />
        <TextInput
          placeholder='Dose Ex: 2 Tabs, 5ml etc'
          style={style.textInput}
          onChangeText={(value) => onHandleInputChange('dose', value)}
        />
      </View>

      {/* When to Take Dropdown */}
      <View style={style.inputGroup}>
        <Ionicons
          name='time-outline'
          size={24}
          color='black'
          style={style.icon}
        />
        <Picker
          selectedValue={formData?.when}
          onValueChange={(itemValue, itemIndex) =>
            onHandleInputChange('when', itemValue)
          }
          style={{ width: '90%' }}
        >
          {WhenToTake.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      {/* Start and End Date */}
      <View style={style.dateInputGroup}>
        <TouchableOpacity
          style={[style.inputGroup, { flex: 1 }]}
          onPress={() => setShowStartDate(true)}
        >
          <Ionicons
            name='calendar-outline'
            size={24}
            color='black'
            style={style.icon}
          />
          <Text style={style.text}>
            {FormatDateForText(formData?.startDate) ?? 'Start Date'}
          </Text>
        </TouchableOpacity>
        {showStartDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                'startDate',
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowStartDate(false);
            }}
            value={
              formData?.startDate ? new Date(formData?.startDate) : new Date()
            }
          />
        )}
        <TouchableOpacity
          style={[style.inputGroup, { flex: 1 }]}
          onPress={() => setShowEndDate(true)}
        >
          <Ionicons
            name='calendar-outline'
            size={24}
            color='black'
            style={style.icon}
          />
          <Text style={style.text}>
            {FormatDateForText(formData?.endDate) ?? 'End Date'}
          </Text>
        </TouchableOpacity>
        {showEndDate && (
          <RNDateTimePicker
            minimumDate={new Date()}
            onChange={(event) => {
              onHandleInputChange(
                'endDate',
                FormatDate(event.nativeEvent.timestamp)
              );
              setShowEndDate(false);
            }}
            value={formData?.endDate ? new Date(formData?.endDate) : new Date()}
          />
        )}
      </View>
      {/* Set Reminder Input */}
      <View style={style.dateInputGroup}>
        <TouchableOpacity
          style={[style.inputGroup, { flex: 1 }]}
          onPress={() => setShowTimePicker(true)}
        >
          <Ionicons
            name='timer-outline'
            size={24}
            color='black'
            style={style.icon}
          />
          <Text style={style.text}>
            {formData?.reminderTime ?? 'Select Reminder Time'}
          </Text>
        </TouchableOpacity>
      </View>
      {showTimePicker && (
        <RNDateTimePicker
          mode='time'
          onChange={(event) => {
            onHandleInputChange(
              'reminderTime',
              FormatDateTime(event.nativeEvent.timestamp)
            );
            setShowTimePicker(false);
          }}
          value={
            formData?.reminderTime
              ? new Date(formData?.reminderTime)
              : new Date()
          }
        />
      )}
      <TouchableOpacity style={style.button}>
        <Text style={style.buttonText}> Add New Medication</Text>
      </TouchableOpacity>
    </View>
  );
}
const style = StyleSheet.create({
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginTop: 10,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY_BORDER,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    color: Colors.PRIMARY,
    borderRightWidth: 1,
    paddingRight: 10,
    borderRightColor: Colors.GRAY,
  },
  typeText: {
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    padding: 5,
    marginLeft: 10,
    flex: 1,
  },
  dateInputGroup: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: 25,
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
  },
});
