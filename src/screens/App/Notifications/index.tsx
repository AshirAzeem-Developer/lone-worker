import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import {DataTable, TouchableRipple} from 'react-native-paper';
import {styles} from './style';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
export default function NotificationsScreen() {
  const [selectedNotification, setSelectedNotification] = useState(null); // State to track selected notification
  const [modalVisible, setModalVisible] = useState(false);
  const DummyNotifications = [
    {
      id: 1,
      Date: '24-Feb-2025',
      Time: '1:10 PM',
      Message: 'You have been allocated a new shift.',
    },
    {
      id: 2,
      Date: '25-Feb-2025',
      Time: '3:45 PM',
      Message: 'Your shift schedule has been updated.',
    },
    {
      id: 3,
      Date: '26-Feb-2025',
      Time: '10:30 AM',
      Message: 'Reminder: Your shift starts in 1 hour.',
    },
    {
      id: 4,
      Date: '27-Feb-2025',
      Time: '5:15 PM',
      Message: 'New company policy update available.',
    },
    {
      id: 5,
      Date: '28-Feb-2025',
      Time: '2:00 PM',
      Message: 'System maintenance scheduled for tomorrow.',
    },
    {
      id: 6,
      Date: '01-Mar-2025',
      Time: '11:25 AM',
      Message: 'You have a pending task to complete.',
    },
    {
      id: 7,
      Date: '02-Mar-2025',
      Time: '4:40 PM',
      Message: 'A new announcement has been posted.',
    },
    {
      id: 8,
      Date: '03-Mar-2025',
      Time: '8:00 AM',
      Message: 'Check your emails for an important update.',
    },
    {
      id: 9,
      Date: '04-Mar-2025',
      Time: '7:20 PM',
      Message: 'Your profile has been successfully updated.',
    },
    {
      id: 10,
      Date: '05-Mar-2025',
      Time: '9:50 AM',
      Message: 'Reminder: Meeting scheduled at 2 PM today.',
    },
  ];
  // Function to show modal with notification details
  const showDetails = notification => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };
  // Function to close modal
  const closeDetails = () => {
    setModalVisible(false);
  };
  return (
    <>
      <CustomHeader showBackButton showMenu />
      <View style={styles.container}>
        <Text style={styles.heading}>Notifications</Text>

        <DataTable>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title textStyle={styles.headerText}>
              Date
            </DataTable.Title>
            <DataTable.Title textStyle={styles.headerText}>
              Time
            </DataTable.Title>
            <DataTable.Title textStyle={styles.headerText}>
              Message
            </DataTable.Title>
          </DataTable.Header>
          {DummyNotifications.map(Index => (
            <DataTable.Row key={Index.id}>
              <DataTable.Cell textStyle={styles.cell}>
                {Index.Date}
              </DataTable.Cell>
              <DataTable.Cell textStyle={styles.cell}>
                {Index.Time}
              </DataTable.Cell>
              <DataTable.Cell textStyle={styles.cell}>
                <TouchableRipple onPress={() => showDetails(Index)}>
                  <Text style={styles.cell}>
                    {`${Index.Message.slice(0, 20)}....`}
                  </Text>
                  {/* <TouchableRipple onPress={() => showDetails(Index)}>
            <Text style={styles.seeMoreBtn}> See More</Text>
        </TouchableRipple> */}
                </TouchableRipple>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
      {/* Modal for Notification Details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeDetails}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Notification Details</Text>
            {selectedNotification && (
              <>
                <Text
                  style={
                    styles.modalText
                  }>{`Date: ${selectedNotification.Date}`}</Text>
                <Text
                  style={
                    styles.modalText
                  }>{`Time: ${selectedNotification.Time}`}</Text>
                <Text
                  style={
                    styles.modalText
                  }>{`Message: ${selectedNotification.Message}`}</Text>
              </>
            )}
            <TouchableOpacity onPress={closeDetails} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
