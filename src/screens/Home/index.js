import React, { useState } from 'react';
import {View, Text, Pressable, SafeAreaView, BackHandler, TextInput, TouchableOpacity, Alert} from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Entypo  from 'react-native-vector-icons/Entypo';
import bcrypt from 'react-native-bcrypt'; 
import { openDatabase } from "react-native-sqlite-storage";


const myContactsDB = openDatabase({name: 'MyContacts.db'});
const usersTableName = 'users'; 

const HomeScreen = () => {
  
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [securityTextEntry, setSecuritTextEntry] = useState(true);

  const onIconPress = () => {
    setSecuritTextEntry(!securityTextEntry);
  };

  const onSumbit = async () => {
    if (!username || !password || !email){
      Alert.alert('Invalid Input', 'Username, Email, and Password are required');
      return;
    }

    myContactsDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${usersTableName} WHERE username = "${username}" AND email = "${email}"`,
        [],
        (_,res) => {
          let user = res.rows.length; 
          if (user==0){
            Alert.alert('Invalid User', 'Full and email is invalid!');
            return;
          } else {
            let item = res.rows.item(0);
            let isPasswordCorrect = bcrypt.compareSync(password, item.password);
            if (!isPasswordCorrect){
              Alert.alert('Invalid User', 'Password is invalid!');
              return;
            }

            if (user != 0 && isPasswordCorrect){
              navigation.navigate('Go To Contacts!');
            }
          }
        },
        error => {
          console.log('Error getting user ' + error.message);
        }
      );
    });
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0.0}} />
      <View style={styles.header}>
        <Text style={styles.title}>
          My Contacts Sign In
        </Text>
        <TextInput
          placeholder='Enter Fullname'
          placeholderTextColor='grey'
          value={username}
          autoCapitalize='none'
          onChangeText={setUsername}
          style={{
            color: 'black',
            fontSize: 16,
            width: '100%',
            marginVertical: 15,
            borderColor: 'lightgrey', 
            borderBottomWidth: 1.0,
            paddingTop: 100,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            borderBottomWidth: 1.0,
            borderColor: 'lightgrey',
            marginVertical: 15,
          }}>
            <TextInput 
              placeholder='Enter Email'
              placeholderTextColor='grey'
              value={email}
              autoCapitalize='none'
              onChangeText={setEmail}
              style={{
                color: 'black',
                fontSize: 16, 
                width: '100%',
                flex: 1,
              }}
            />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            borderBottomWidth: 1.0,
            borderColor: 'lightgrey',
            marginVertical: 15,
          }}>
            <TextInput 
              placeholder='Enter Password'
              placeholderTextColor='grey'
              value={password}
              autoCapitalize='none'
              onChangeText={setPassword}
              secureTextEntry={securityTextEntry}
              style={{
                color: 'black',
                fontSize: 16, 
                width: '100%',
                flex: 1,
              }}
            />
            <TouchableOpacity onPress={onIconPress}>
              {securityTextEntry == true ? (
                <Entypo name="eye" size={20}/>
              ) : (
                <Entypo name="eye-with-line" size={20}/>
              )

              }
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottom}>
        <Pressable
          style={styles.button}
          onPress={() => onSumbit()}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
        <TouchableOpacity onPress={() => navigation.navigate('Sign Up')}>
          <View style={{
            flexDirection: 'row', 
            marginTop: 20, 
            justifyContent: 'center'
          }}>
            <Text style={{
              fontSize: 16,
            }}>Don't have an account </Text>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>Sign Up</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;