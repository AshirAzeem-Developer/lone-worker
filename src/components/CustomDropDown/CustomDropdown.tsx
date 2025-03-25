import React, {useState} from 'react';
import {View, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

interface CustomDropdownProps {
  options: string[];
  onSelect: (value: string) => void;
}

interface DropdownItem {
  label: string;
  value: string;
}

export default function CustomDropdown({
  options,
  onSelect,
}: CustomDropdownProps) {
  const dropdownData: DropdownItem[] = options.map(opt => ({
    label: opt,
    value: opt,
  }));

  const [selectedValue, setSelectedValue] = useState<string>(
    dropdownData[0].value,
  );

  return (
    <View style={styles.container}>
      <Dropdown
        data={dropdownData}
        labelField="label"
        valueField="value"
        placeholder="Select an option"
        value={selectedValue}
        onChange={(item: DropdownItem) => {
          setSelectedValue(item.value);
          onSelect(item.value);
        }}
        style={styles.dropdown}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        itemTextStyle={styles.itemText}
        containerStyle={styles.dropdownContainer}
      />
    </View>
  );
}

interface Style {
  container: ViewStyle;
  dropdown: ViewStyle;
  placeholder: TextStyle;
  selectedText: TextStyle;
  itemText: TextStyle;
  dropdownContainer: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    width: '100%',
    padding: 10,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  placeholder: {
    fontSize: 16,
    color: 'gray',
  },
  selectedText: {
    fontSize: 16,
    color: 'green',
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
  dropdownContainer: {
    borderRadius: 8,
  },
});
