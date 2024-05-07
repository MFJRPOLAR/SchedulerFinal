import React, { useEffect, useState } from 'react';
import { View, FlatList, Text  } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
// import openDatabase hook
import { openDatabase } from "react-native-sqlite-storage";
import Contact from '../../components/Contact';

// use hook to create database
const myContactsDB = openDatabase({name: 'MyContacts.db'});
const contactsTableName = 'contacts';
const groupContactsTableName = 'group_contacts';

const ViewContactsInGroupScreen = props => {

  const post = props.route.params.post;

    const navigation = useNavigation();

  const [contacts, setContacts] = useState([]);
  const [totalNumber, setTotalNumber] = useState(0);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare an empty array that will store the results of the
      // SELECT
      let results = [];
      let total = 0.0;
      // declare a transation that will execute the SELECT
      myContactsDB.transaction(txn => {
        // execute SELECT
        txn.executeSql(
          `SELECT contacts.id, fullname, phone, email FROM ${contactsTableName}, ${groupContactsTableName} WHERE contacts.id = contact_id AND group_id = ${post.id}`,
          [],
          // callback function to handle the results from the
          // SELECT s
          (_, res) => {
            // get number of rows of data selected
            let len = res.rows.length;
            console.log('Length of contacts ' + len);
            // if more than one row was returned
            if (len > 0){
              total = len;
              // loop through the rows
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto the
                // results array
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  fullname: item.fullname,
                  phone: item.phone,
                  email: item.email,
                });
              }
              // assign results array to lists state variable
              setContacts(results);
              setTotalNumber(total);
            } else {
              // if no rows of data were returned,
              // set lists state variable to an empty array
              setContacts([]);
              setTotalNumber(0);
            }
          },
          error => {
            console.log('Error getting contacts ' + error.message);
          },
        )
      });
    });
    return listener;
  });

  const ListHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'left', color: post.color}}>{post.name}</Text>
      </View>
    );
  };

  const ListFooter = () => {
    return (
      <View style={styles.footer}>
        <Text style={styles.total}>TOTAL NUMBER: {totalNumber}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({item}) => <Contact post={item} />}
        keyExtractor={item => item.id}
        ListFooterComponent={ListFooter}
        ListHeaderComponent={ListHeader}
      />
    </View>
  );
};

export default ViewContactsInGroupScreen;