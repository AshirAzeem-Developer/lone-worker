import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';


export default function CustomDropdown({ options, onSelect }) {
    const [selectedValue, setSelectedValue] = useState(options[0]);
    const dropdownRef = useRef(null); // ✅ Fix: Use useRef instead of `this.dropdown`

    return (
        <View style={styles.container}>
            <ModalDropdown
                ref={dropdownRef}
                options={options}
                defaultValue={selectedValue}
                onSelect={(index, value) => {
                    setSelectedValue(value);
                    onSelect(value);
                }}
                textStyle={styles.text}
                dropdownStyle={styles.dropdown}
                listStyle={{ maxHeight: 200 }} // ✅ Fix white space issue
                renderRow={(option, index, isSelected) => (
                    <View style={styles.option}>
                        <Text style={[styles.optionText, isSelected && styles.selectedOption]}>
                            {option}
                        </Text>
                    </View>
                )}
            >
                <TouchableOpacity style={styles.dropdownButton} onPress={() => dropdownRef.current?.show()}>
                    <Text style={styles.selectedText}>{selectedValue}</Text>
                    
                </TouchableOpacity>
            </ModalDropdown>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'green',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        position: 'relative',
        zIndex: 1000,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    selectedText: {
        fontSize: 16,
        color: 'green',
        fontWeight: 'bold',
    },
    dropdown: {
        width: '90%', // Ensures full width
        // borderWidth: 5,
        // borderColor: 'green',
        // borderRadius: 5,
        backgroundColor: 'white',
        position: 'absolute',
        top: 40,

        // height: 'auto', // ✅ Auto height 
        maxHeight: 120, // ✅ Prevents large empty space
        overflow: 'hidden', // ✅ Ensures content is visible
        elevation: 5
    },
    option: {
        padding: 10,
    },
    optionText: {
        fontSize: 16,
        color: 'green', // ✅ Ensures text is visible
    },
    selectedOption: {
        fontWeight: 'bold',
    },
});
