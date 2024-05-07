import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Group from '../../components/Group';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";

// create constant object that refers to database
const myContactsDB = openDatabase({name: 'MyContacts.db'});

// create constant that contains the name of the lists table
const groupsTableName = 'groups';

const GroupsScreen = props => {
  
  const navigation = useNavigation();

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare empty array that will store results of SELECT
      let results = [];
      // declare transaction that will execute SELECT
      myContactsDB.transaction(txn => {
        // execute SELECT
        txn.executeSql(
          `SELECT * FROM ${groupsTableName}`,
          [],
          // callback function to handle results from SELECT
          (_, res) => {
            // get the number of rows selected
            let len = res.rows.length;
            console.log('Number of rows: ' + len);
            // if more than one row of data was selected
            if(len > 0){
              // loop through the rows of data
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto results array
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  name: item.name,
                  color: item.color
                });
              }
              // assign results array to lists state variable
              setGroups(results);
            } else {
              // if no rows of data were selected
              // assign empty array to lists state variable
              setGroups([]);
            }
          },
          error => {
            console.log('Error getting groups ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList 
          data={groups}
          renderItem={({item}) => <Group post={item} />}
        />
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
                style={styles.button}
                onPress={() => navigation.navigate('Add Group')}
                >
                <Text style={styles.buttonText}>Add Group</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default GroupsScreen;