import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown';

const database = require('../../components/Handlers/database.js');

const AddGroupScreen = props => {

    const [name, setName] = useState('');
    const [color, setPriority] = useState('');

    const colorNames = ['red', 'orange', 'green', 'blue', 'purple'];

    const onGroupAdd = () => {
        if (!name){
            alert('Please enter a group name.');
            return;
        }
        if (!color){
            alert('Please select a color.');
            return;
        }
        
        try {
            database.addGroup(name, color);
        } catch (error) {
            console.log('Error adding group ' + error);
        }

        alert(name + ' Added.');
    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value={name}
                onChangeText={value => setName(value)}
                style={styles.name}
                placeholder={'Enter Name'}
                placeholderTextColor={'grey'}
            />
            <SelectDropdown
                data={colorNames}
                defaultValue={color}
                defaultButtonText={'Select Color'}
                onSelect={(selectedItem, index) => {
                    setPriority(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                    return item;
                }}
                buttonStyle={styles.dropdownBtnStyle}
                buttonTextStyle={styles.dropdownBtnTxtStyle}
                dropdownStyle={styles.dropdownDropdownStyle}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTxtStyle}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.button} onPress={onGroupAdd}>
                <Text style={styles.buttonText}>Add</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default AddGroupScreen;