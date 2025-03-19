import React, {useState, useEffect} from 'react';
import {Modal, View, Text, Button, Alert} from 'react-native';

const SafetyCheckModal = ({visible, onConfirm, onTimeout}) => {
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        onTimeout();
      }, 60000); // 1 minute timeout

      return () => clearTimeout(timeout);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <Text>Are you safe?</Text>
          <Button title="Confirm Safety" onPress={onConfirm} />
        </View>
      </View>
    </Modal>
  );
};

export default SafetyCheckModal;
