import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import styles from './styles';

// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// use hook to create database
const myContactsDB = openDatabase({name: 'MyContacts.db'});
const contactsTableName = 'contacts';

const ExistingContactScreen = props => {

    const post = props.route.params.post;

    const [fullname, setFullName] = useState(post.fullname);
    const [phone, setPhone] = useState(post.phone);
    const [email, setEmail] = useState(post.email);

    const onContactUpdate = () => {
        if (!fullname){
            alert('Please enter a contact fullname.');
            return;
        }
        if (!phone){
            alert('Please enter a contact phone in format NPA-NXX-XXXX.');
            return;
        }
        if (!email){
            alert('Please enter a contact email.');
            return;
        }
        
        myContactsDB.transaction(txn => {
            txn.executeSql(
                `UPDATE ${contactsTableName} SET fullname = "${fullname}", phone = "${phone}", email = "${email}" WHERE id = "${post.id}"`,
                [],
                () => {
                    console.log(`${fullname} updated successfully`);
                },
                error => {
                    console.log('Error on updating contact ' + error.message);
                }
            );
        });

        alert(fullname + ' Updated!');
    }

    const onContactDelete = () => {
        return Alert.alert(
            // title
            'Confirm',
            // message
            'Are you sure you want to delete this contact?',
            // code for buttons
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        myContactsDB.transaction(txn => {
                            txn.executeSql(
                                `DELETE FROM ${contactsTableName} WHERE id = ${post.id}`,
                                [],
                                () => {
                                    console.log(`${fullname} deleted successfully`);
                                },
                                error => {
                                    console.log('Error on deleting contact ' + error.message);
                                }
                            );
                        });
                        alert('Contact Deleted!');
                    },
                },
                {
                    text: 'No',
                },
            ],
        );
    }

  return (
    <View style={styles.container}>
        <View style={styles.topContainer}>
            <TextInput 
                value={fullname}
                onChangeText={value => setFullName(value)}
                style={styles.fullname}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Contact Fullname'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={phone}
                onChangeText={value => setPhone(value)}
                style={styles.phone}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Contact Phone in format NPA-NXX-XXXX'}
                placeholderTextColor={'grey'}
            />
            <TextInput 
                value={email}
                onChangeText={value => setEmail(value)}
                style={styles.email}
                clearButtonMode={'while-editing'}
                placeholder={'Enter Contact Email'}
                placeholderTextColor={'grey'}
            />
        </View>
        <View style={styles.bottomContainer}>
        <Pressable style={styles.updateButton} onPress={onContactUpdate}>
                <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={onContactDelete}>
                <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
        </View>
    </View>
  );
};

export default ExistingContactScreen;