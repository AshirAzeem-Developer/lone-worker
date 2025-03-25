import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {styles} from './style';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';

import icons from '../../../assets/icons';
import {getHistory} from '../../../services/FetchCheckInHistory';

export default function CheckInHistory() {
  const [historyData, setHistoryData] = useState([]); // Store check-in history
  const [page, setPage] = useState(1); // Current page number
  const [pagination, setPagination] = useState({}); // Store pagination metadata
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  const fetchHistory = async pageNumber => {
    setLoading(true);
    try {
      const response = await getHistory(pageNumber);
      setHistoryData(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  //  Function to return an icon based on status
  const getStatusIcon = status => {
    if (status === 'completed') {
      return <Image source={icons.CHECK} width={20} height={20} />;
    } else if (status === 'pending') {
      return <Image source={icons.CHECK} width={20} height={20} />;
    } else {
      return <Image source={icons.CHECK} width={20} height={20} />;
    }
  };

  //  Handle Page Change
  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setPage(newPage);
    }
  };

  return (
    <>
      <CustomHeader showBackButton showMenu />
      <View style={styles.container}>
        <Text style={styles.heading}>Check-In History</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#28A745" />
        ) : (
          <>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.headerText}>Date</Text>
              <Text style={styles.headerText}>Scheduled</Text>
              <Text style={styles.headerText}>Actual</Text>
              <Text style={styles.headerText}>Grace Period</Text>
              <Text style={styles.headerText}>Location</Text>
              <Text style={styles.headerText}>Status</Text>
            </View>

            {/* Table Rows */}
            <FlatList
              data={historyData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <View
                  style={[
                    styles.tableRow,
                    {backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F2F2F2'},
                  ]}>
                  <Text style={styles.cell}>{item.date}</Text>
                  <Text style={styles.cell}>{item.scheduled_time}</Text>
                  <Text style={styles.cell}>{item.actual_time}</Text>
                  <Text style={styles.cell}>{item.grace_period_end}</Text>
                  <Text style={styles.cell}>{item.location}</Text>
                  <View style={styles.statusCell}>
                    {getStatusIcon(item.status)}
                  </View>
                </View>
              )}
            />

            {/* Pagination Controls */}
            <View style={styles.paginationContainer}>
              {/* Previous Button */}
              <TouchableOpacity
                style={[styles.pageButton, page === 1 && styles.disabledButton]}
                onPress={() => handlePageChange(page - 1)}
                disabled={page === 1}>
                <Image
                  source={icons.CHECK}
                  width={22}
                  height={22}
                  tintColor={page === 1 ? '#ccc' : '#333'}
                />
              </TouchableOpacity>

              {/* Page Numbers */}
              {Array.from({length: pagination.last_page}, (_, i) => (
                <TouchableOpacity
                  key={i + 1}
                  style={[
                    styles.pageNumber,
                    page === i + 1 && styles.activePage,
                  ]}
                  onPress={() => handlePageChange(i + 1)}>
                  <Text
                    style={[
                      styles.pageText,
                      page === i + 1 && styles.activePageText,
                    ]}>
                    {i + 1}
                  </Text>
                </TouchableOpacity>
              ))}

              {/* Next Button */}
              <TouchableOpacity
                style={[
                  styles.pageButton,
                  page === pagination.last_page && styles.disabledButton,
                ]}
                onPress={() => handlePageChange(page + 1)}
                disabled={page === pagination.last_page}>
                <Image source={icons.CHECK} width={22} height={22} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
}
