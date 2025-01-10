import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getDatesRangeDisplay } from '../../service/ConvertDateTime';
import Colors from '../../constant/Colors';
import moment from 'moment/moment';
export default function MedicationList() {
  const [medList, setMedList] = useState();
  const [dateRange, setDateRange] = useState();
  const [selectedDate, setSelectedDate] = useState(
    moment().format('MM/DD/YYYY')
  );

  const getDatesRangeList = () => {
    const dateRange = getDatesRangeDisplay();
    setDateRange(dateRange);
  };
  useEffect(() => {
    getDatesRangeList();
  }, []);

  return (
    <View
      style={{
        marginTop: 25,
      }}
    >
      <Image
        source={require('../../assets/images/medication.jpeg')}
        style={{
          width: '100%',
          height: 200,
          borderRadius: 15,
        }}
      />
      <FlatList
        data={dateRange}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              style.dateGroup,
              {
                backgroundColor:
                  selectedDate === item.formattedDate
                    ? Colors.PRIMARY
                    : Colors.LIGHT_GRAY_BORDER,
              },
            ]}
            onPress={() => setSelectedDate(item.formattedDate)}
          >
            <Text
              style={[
                style.day,
                {
                  color:
                    selectedDate === item.formattedDate ? 'white' : 'black',
                },
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                style.date,
                {
                  color:
                    selectedDate === item.formattedDate ? 'white' : 'black',
                },
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
const style = StyleSheet.create({
  dateGroup: {
    padding: 15,
    backgroundColor: Colors.LIGHT_GRAY_BORDER,
    display: 'flex',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 15,
  },
  day: {
    fontSize: 20,
  },
  date: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
