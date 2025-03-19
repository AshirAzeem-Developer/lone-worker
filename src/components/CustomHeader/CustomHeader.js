import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { styles } from './Style'
// import { StatusBar } from 'expo-status-bar';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import images from '../../assets/images';
export default function CustomHeader({ title, showBackButton = false, showMenu = false }) {
    const navigation = useNavigation(); // Access navigation to go back

    return (
        <>
            {/* <StatusBar backgroundColor="#13714C" barStyle="light-content" /> */}
            <View style={styles.header}>
                {/* Back Button (Optional) */}
                {showBackButton ? (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        {/* <MaterialIcons name="arrow-back" size={24} color="#fff" /> */}
                    </TouchableOpacity>
                ) : (
                    <View style={styles.backButtonPlaceholder} /> // Empty view for spacing
                )}

                {/* Centered Logo */}
                <Image source={images.REACT_LOGO} style={styles.logo} />

                {/* Optional Right Icon (E.g., Menu) */}
                {
                    showMenu ? (
                        <>
                            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.rightIcon}>
                                {/* <MaterialIcons name="menu" size={30} color="#fff" /> */}
                            </TouchableOpacity>
                        </>
                    ) : (<>
                        <View style={styles.backButtonPlaceholder} />

                    </>)
                }



            </View>
        </>
    );
}

