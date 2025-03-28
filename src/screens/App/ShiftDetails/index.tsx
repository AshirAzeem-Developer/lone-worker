import {View, Text, RefreshControl, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';

import {ActivityIndicator} from 'react-native-paper';

import {getShiftHistory} from '../../../services/ShiftDetails';
import {showError} from '../../../utils/helperFunction';
import useStyles from './style';
import {ShiftData} from '../../../types/globalTypes';

export default function ShiftDetails() {
  const [refreshing, setRefreshing] = useState(false);
  const {styles} = useStyles();
  const [shiftdata, setshiftdata] = useState<ShiftData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      if (!refreshing) setLoading(true);

      const rawData = await getShiftHistory();

      const formattedData: ShiftData[] = (rawData || []).map((item: any) => ({
        id: Math.random(),
        customer_name: item.customer_name || '',
        site_name: item.site_name || '',
        days: item.days ? JSON.parse(item.days) : [],
        start_time: item.start_time || '',
        end_time: item.end_time || '',
      }));

      if (formattedData.length === 0) {
        showError('No Shift Details found', '');
      }

      setshiftdata(formattedData);
    } catch (error) {
      console.error('Error fetching shift data:', error);
      showError('Failed to fetch shift details', '');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const dummyShifts = [
    {
      id: 1,
      Customer: 'Abc',
      SiteName: 'xyz',
      Days: 'M,T,W,T',
      StartTime: '9.00 AM',
      EndTime: '5.00 PM',
    },
  ];
  return (
    <>
      <CustomHeader showMenu />

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#28A745']}
            tintColor="#28A745"
          />
        }>
        <Text style={styles.heading}>ShiftDetails</Text>

        {loading && !refreshing ? (
          <ActivityIndicator size="large" color="#28A745" />
        ) : (
          shiftdata.map((index, key) => (
            <View key={key} style={styles.shiftCard}>
              <View style={styles.row}>
                <Text style={styles.label}>Customer:</Text>
                <Text style={styles.value}>{index.customer_name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Site Name:</Text>
                <Text style={styles.value}>{index.site_name}</Text>
              </View>
              <View style={[styles.row, {alignItems: 'flex-start'}]}>
                <Text style={styles.label}>Days:</Text>
                <View style={styles.dayContainer}>
                  {(Array.isArray(index.days)
                    ? index.days
                    : JSON.parse(index.days)
                  ).map((day: string, idx: number) => (
                    <View key={idx} style={styles.dayPill}>
                      <Text style={styles.dayText}>{day}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Start Time:</Text>
                <Text style={styles.value}>{index.start_time}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>End Time:</Text>
                <Text style={styles.value}>{index.end_time}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </>
  );
}
