import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import SelectDropdown from 'react-native-select-dropdown';

const ExistingGroupScreen = props => {

    const post = props.route.params.post;
    const navigation = useNavigation();

    const [name, setName] = useState(post.name);
    const [color, setPriority] = useState(post.color);

    const colorNames = ['red', 'orange', 'green', 'blue', 'purple'];

    const onAddGroupContact = () => {
        navigation.navigate('Add Contact To Group', {post: post});
    }

    const onViewContacts = () => {
        navigation.navigate('View Contacts In Group', {post: post});
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
                editable={false}
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
                disabled={true}
            />
        </View>
        <View style={styles.bottomContainer}>
            <Pressable style={styles.addButton} onPress={onAddGroupContact}>
                <Text style={styles.buttonText}>Add Contact</Text>
            </Pressable>
            <Pressable style={styles.viewButton} onPress={onViewContacts}>
                <Text style={styles.buttonText}>View Contacts</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default ExistingGroupScreen;