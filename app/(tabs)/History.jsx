import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../constant/Colors';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { getDatesRangeDisplayForHistory } from '../../service/ConvertDateTime';
import { getLocalStorage } from '../../service/Storage';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import MedicationCardItem from '../components/MedicationCardItem';
import EmptyState from '../components/EmptyState';
export default function History() {
  const [dateRange, setDateRange] = useState();
  const [medList, setMedList] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format('MM/DD/YYYY')
  );

  useEffect(() => {
    getDateList();
    getMedList(selectedDate);
  }, []);

  const getDateList = () => {
    const dates = getDatesRangeDisplayForHistory();
    setDateRange(dates);
  };
  const getMedList = async (selectedDate) => {
    setLoading(true);
    const user = await getLocalStorage('userDetail');
    setMedList([]);
    try {
      const q = query(
        collection(db, 'medication'),
        where('userEmail', '==', user?.email),
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
    <FlatList
      data={[]}
      style={{
        height: '100%',
        backgroundColor: 'white',
      }}
      ListHeaderComponent={
        <View style={style.mainContainer}>
          <Image
            source={require('../../assets/images/med-history.png')}
            style={style.imagerBanner}
          />
          <Text style={style.header}>Medication History</Text>
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
                      selectedDate === item.formatted
                        ? Colors.PRIMARY
                        : Colors.LIGHT_GRAY_BORDER,
                  },
                ]}
                onPress={() => {
                  setSelectedDate(item.formatted);
                  getMedList(item.formatted);
                }}
              >
                <Text
                  style={[
                    style.day,
                    {
                      color:
                        selectedDate === item.formatted ? 'white' : 'black',
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
                        selectedDate === item.formatted ? 'white' : 'black',
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
                  <MedicationCardItem
                    medicine={item}
                    selectedDate={selectedDate}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <Text
              style={{
                fontSize: 25,
                padding: 30,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              No Medication Found
            </Text>
          )}
        </View>
      }
    />
  );
}
const style = StyleSheet.create({
  mainContainer: {
    padding: 25,
    backgroundColor: '#f9f9f9',
  },
  imagerBanner: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
  },
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
