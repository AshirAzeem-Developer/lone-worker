import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import {styles} from './style';
import {ActivityIndicator, DataTable} from 'react-native-paper';

import {getShiftHistory} from '../../../services/ShiftDetails';
import {showError} from '../../../utils/helperFunction';

export default function ShiftDetails() {
  const [shiftdata, setshiftdata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShiftHistory();
        setLoading(true);
        console.log('Shift Data:', data);
        if (!data) {
          console.log('no details found');
          showError('No Shift Details found', '');
          return;
        } else {
          setLoading(false);
          setshiftdata(data);
          console.log('shfit', data);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
      <View style={styles.container}>
        <Text style={styles.heading}>ShiftDetails</Text>
        {loading ? (
          <>
            <ActivityIndicator size="large" color="#28A745" />
          </>
        ) : (
          <>
            {shiftdata.map((index, key) => (
              <DataTable
                key={key}
                style={{
                  backgroundColor: '#EDEDED',
                  marginTop: 10,
                  alignSelf: 'center',
                }}>
                {/* Display as columns instead of rows */}
                <View style={{flexDirection: 'column', padding: 10}}>
                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text style={{fontWeight: 'bold', width: 100}}>
                      Customer:
                    </Text>
                    <Text style={{color: 'black'}}>{index.customer_name}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text style={{fontWeight: 'bold', width: 100}}>
                      SiteName:
                    </Text>
                    <Text>{index.site_name}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text style={{fontWeight: 'bold', width: 100}}>Days:</Text>
                    <Text>
                      {index.days && index.days !== 'null'
                        ? Array.isArray(index.days)
                          ? index.days.join(', ')
                          : JSON.parse(index.days).join(', ')
                        : 'N/A'}
                    </Text>
                  </View>

                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text style={{fontWeight: 'bold', width: 100}}>
                      StartTime:
                    </Text>
                    <Text>{index.start_time}</Text>
                  </View>

                  <View style={{flexDirection: 'row', marginBottom: 5}}>
                    <Text style={{fontWeight: 'bold', width: 100}}>
                      EndTime:
                    </Text>
                    <Text>{index.end_time}</Text>
                  </View>
                </View>
              </DataTable>
            ))}
          </>
        )}
      </View>
    </>
  );
}
