import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  ScrollView,
  RefreshControl,
} from 'react-native';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import icons from '../../../assets/icons';
import {getHistory} from '../../../services/FetchCheckInHistory';
import useStyles from './style';
import images from '../../../assets/images';
import LottieView from 'lottie-react-native';

interface HistoryItem {
  date: string;
  scheduled_time: string;
  actual_time: string;
  grace_period_end: string;
  location: string;
  status: 'completed' | 'pending' | string;
}

interface PaginationMeta {
  last_page: number;
  [key: string]: any; // Allow additional metadata if needed
}

const CheckInHistory: React.FC = () => {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<PaginationMeta>({last_page: 1});
  const [loading, setLoading] = useState<boolean>(false);
  const {styles, sizes, colors} = useStyles();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  const fetchHistory = async (pageNumber: number): Promise<void> => {
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

  const getStatusIcon = (status: string) => {
    let iconSource = icons.OTHERS_ICON;
    if (status === 'completed') iconSource = icons.COMPLETED_ICON;
    else if (status === 'pending') iconSource = icons.PENDING_ICON;

    return (
      <Image
        source={iconSource}
        tintColor={status === 'completed' ? '#28A745' : '#FFA500'}
        style={{
          width: 20,
          height: 20,
        }}
        resizeMode="contain"
      />
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.last_page) {
      setPage(newPage);
    }
  };
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await getHistory(1); // Always refresh from page 1
      setHistoryData(response.data);
      setPagination(response.pagination);
      setPage(1);
    } catch (error) {
      console.error('Error refreshing history:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <CustomHeader showMenu />
      <View style={styles.container}>
        <Text style={styles.heading}>Check-In History</Text>
        <View
          style={{
            width: sizes.WIDTH * 0.95,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: -sizes.HEIGHT * 0.02,
          }}>
          <Text
            style={{
              fontStyle: 'italic',
              marginBottom: sizes.HEIGHT * 0.005,
              width: sizes.WIDTH * 0.22,
              fontSize: sizes.WIDTH * 0.028,
              fontWeight: 'bold',
            }}>
            Slide to see more
          </Text>
          <LottieView
            source={require('../../../assets/lottie/slideArrow.json')}
            style={{
              width: sizes.WIDTH * 0.165,
              height: sizes.WIDTH * 0.165,
              // backgroundColor: 'red',
            }}
            autoPlay
            loop
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#28A745" />
        ) : (
          <>
            {/* Horizontal ScrollView for the entire table */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <View style={styles.wideTable}>
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
                {historyData.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.tableRow,
                      {
                        backgroundColor:
                          index % 2 === 0 ? '#FFFFFF' : '#D9EAFD',
                      },
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
                ))}
              </View>
            </ScrollView>

            {/* Pagination */}
            <View style={styles.paginationContainer}>
              {/* Previous Button */}
              <TouchableOpacity
                style={[styles.pageButton, page === 1 && styles.disabledButton]}
                onPress={() => handlePageChange(page - 1)}
                disabled={page === 1}>
                <Image
                  source={icons.LEFT_ARROW}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: page === 1 ? '#ccc' : '#333',
                  }}
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
                <Image
                  source={icons.RIGHT_ARROW}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </>
  );
};

export default CheckInHistory;
