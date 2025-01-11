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
import { getLocalStorage } from '../../service/Storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import MedicationCardItem from './MedicationCardItem';
import EmptyState from './EmptyState';
export default function MedicationList() {
  const [medList, setMedList] = useState();
  const [dateRange, setDateRange] = useState();
  const [selectedDate, setSelectedDate] = useState(
    moment().format('MM/DD/YYYY')
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getDatesRangeList();
    getMedList(selectedDate);
  }, []);

  const getDatesRangeList = () => {
    const dateRange = getDatesRangeDisplay();
    setDateRange(dateRange);
  };

  const getMedList = async (selectedDate) => {
    setLoading(true);
    const user = await getLocalStorage('userDetail');
    setMedList([]);
    try {
      const q = query(
        collection(db, 'medication'),
        where('userEmail', '==', user.email),
        where('dates', 'array-contains', selectedDate)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log('docId:', +doc.id + '==>', doc.data());
        setMedList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

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
            onPress={() => {
              setSelectedDate(item.formattedDate);
              getMedList(item.formattedDate);
            }}
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
      {medList?.length > 0 ? (
        <FlatList
          data={medList}
          onRefresh={() => getMedList(selectedDate)}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <TouchableOpacity>
              <MedicationCardItem medicine={item} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <EmptyState />
      )}
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
