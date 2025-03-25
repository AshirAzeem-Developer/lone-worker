import React, {useState, useEffect} from 'react';
import {Button} from 'react-native';
import * as Notifications from 'expo-notifications';
import SafetyCheckModal from './SafetyCheckModal';

const SafetyCheck = ({frequencyMinutes}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSafe, setIsSafe] = useState(false);

  useEffect(() => {
    requestPermissions();
    scheduleNotification(frequencyMinutes);

    const subscription = Notifications.addNotificationResponseReceivedListener(
      response => {
        setIsModalVisible(true);
      },
    );

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (isSafe) {
      setIsModalVisible(false);
      // Reset the timer for the next check
      scheduleNotification(frequencyMinutes);
    }
  }, [isSafe]);

  const handleConfirm = () => {
    setIsSafe(true);
    // Make API call to confirm safety
    // fetch('https://your-laravel-backend/api/confirm-safety', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ workerId: '123' }),
    // });
    console.log('alert confirmed, worker is safe.');
  };

  const handleTimeout = () => {
    setIsModalVisible(false);
    // Make API call to notify monitor
    // fetch('https://your-laravel-backend/api/notify-monitor', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ workerId: '123' }),
    // });
    console.log('alert missed, notifying monitor.');
  };

  return (
    <>
      <SafetyCheckModal
        visible={isModalVisible}
        onConfirm={handleConfirm}
        onTimeout={handleTimeout}
      />
    </>
  );
};

export default SafetyCheck;
