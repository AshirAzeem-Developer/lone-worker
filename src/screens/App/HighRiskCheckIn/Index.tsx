import {View, Text} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import {styles} from './Style';
import CustomButton from '../../../components/CustomButton/CustomButton';

export default function HighRiskCheckIn({navigation}: any) {
  const btns = [
    {
      id: 1,
      title: '10 Minutes',
    },
    {
      id: 2,
      title: '20 Minutes',
    },
    {
      id: 3,
      title: '30 Minutes',
    },
    {
      id: 4,
      title: '40 Minutes',
    },
    {
      id: 5,
      title: '50 Minutes',
    },
    {
      id: 6,
      title: '60 Minutes',
    },
    {
      id: 7,
      title: '90 Minutes',
    },
    {
      id: 8,
      title: '2 Hours',
    },
    {
      id: 9,
      title: '2.5 Hours',
    },
  ];
  const [selectedBtn, setSelectedBtn] = useState(null);

  const changeBtnColor = (id: any) => {
    setSelectedBtn(id);
  };
  return (
    <View>
      <CustomHeader showMenu />
      <View style={styles.container}>
        <Text style={styles.heading}>High Risk CheckIn</Text>

        <Text style={styles.text}>
          Going into an area of high risk? Click on one of the buttons below to
          request an earlier check in
        </Text>
        <View style={styles.btncontainer}>
          {btns.map((btn, id) => (
            <View key={id} style={styles.btnWrapper}>
              <CustomButton
                title={btn.title}
                backgroundColor={selectedBtn === btn.id ? '#13714C' : '#A2E494'}
                buttonStyle={styles.btn}
                borderRadius={10}
                onPress={() => changeBtnColor(btn.id)}
              />
            </View>
          ))}
        </View>

        <CustomButton
          title="Back"
          backgroundColor="#E7E7E7"
          textColor="Black"
          buttonStyle={styles.backbtn}
          borderRadius={10}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}
