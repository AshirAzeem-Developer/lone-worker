import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, View, Image} from 'react-native';

import {useSizes} from '../constants/size';
import {useColors} from '../constants/color';

const BottomOption = ({
  title,
  isFocused,
  selectedIcon,
  icon,
  sizes,
  colors,
}: any) => {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <Image
        source={isFocused ? selectedIcon : icon}
        style={{
          width: isFocused
            ? sizes.BOTTOM_TABS_ICONS_ACTIVE
            : sizes.BOTTOM_TABS_ICONS,
          height: isFocused
            ? sizes.BOTTOM_TABS_ICONS_ACTIVE
            : sizes.BOTTOM_TABS_ICONS,
          tintColor: isFocused ? colors.BLACK : colors.GRAY,
        }}
      />
      <Text
        style={{
          color: isFocused ? colors.BLACK : colors.GRAY,
          fontSize: sizes.FONTSIZE_MEDIUM,
        }}>
        {title}
      </Text>
    </View>
  );
};

const Tabs = createBottomTabNavigator();

type Props = {
  screens: {
    name: string;
    label: string;
    Component: any;
    icon: any;
    selectedIcon: any;
  }[];
  initialRouteName: string;
};

const CreateBottomTabs = ({screens, initialRouteName}: Props) => {
  const sizes = useSizes();
  const colors = useColors();
  return (
    <Tabs.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: sizes.HEADER_FOOTER_SIZE,
          backgroundColor: colors.BACKGROUND,
        },
      }}>
      {screens.map(({name, Component, icon, selectedIcon, label}) => (
        <Tabs.Screen
          key={name}
          name={label ? label : name}
          component={Component}
          options={{
            tabBarIcon: ({focused}: any) => (
              <BottomOption
                isFocused={focused}
                title={label ? label : name}
                icon={icon}
                selectedIcon={selectedIcon}
                sizes={sizes}
                colors={colors}
              />
            ),
          }}
        />
      ))}
    </Tabs.Navigator>
  );
};

export default CreateBottomTabs;
