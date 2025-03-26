import {View, Text} from 'react-native';
import React from 'react';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import {styles} from './style';
import CustomDropdown from '../../../components/CustomDropDown/CustomDropdown';
import CustomButton from '../../../components/CustomButton/CustomButton';
import {screen} from '../../../utils/constants';

export default function ManDownSettings() {
  const options1 = ['Man Down Off', 'Man Down On'];
  const options2 = [
    '3 Minutes',
    '5 Minutes',
    '10 Minutes',
    '15 Minutes',
    '20 Minutes',
  ];
  const options3 = [
    'Low Sensitivity',
    'Medium Sensitivity',
    'High Sensitivity',
  ];

  return (
    <View>
      <CustomHeader showMenu />
      <View style={styles.container}>
        <Text style={styles.text1}>
          when man down is turned on the system will alert your monitor if you
          do not move in the chosen amount of time.
        </Text>

        <View style={styles.dropdownView}>
          <CustomDropdown
            options={options1}
            onSelect={value => console.log('Selected:', value)}
          />
        </View>
        <Text style={styles.text1}>How Long to wait for Movement?</Text>

        <View style={styles.dropdownView}>
          <CustomDropdown
            options={options2}
            onSelect={value => console.log('Selected:', value)}
          />
        </View>
        <Text style={styles.text1}>
          How sensitive should Man Down be to movement. High sensitivity will
          assume you are safe with less movement by the device. Please choose a
          suitable option for your phone
        </Text>
        <View style={styles.dropdownView}>
          <CustomDropdown
            options={options3}
            onSelect={value => console.log('Selected:', value)}
          />
        </View>
        <Text style={styles.text1}>
          Please Start your Shift or Check in to update your Man Down settings
        </Text>
        <View style={styles.btn}>
          <CustomButton
            onPress={() => console.log('Save Settings')}
            buttonStyle={{
              width: screen.width * 0.9,
              height: 50,
              backgroundColor: '#28A745',
            }}
            title="Save Settings"
            backgroundColor="#28A745"
            textColor="#FFF"
            borderRadius={10}
          />
        </View>
      </View>
    </View>
  );
}
