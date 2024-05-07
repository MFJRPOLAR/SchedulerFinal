/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React from 'react';
import type {Node} from 'react';
import Router from './src/navigation/Router';
import bcrypt from 'react-native-bcrypt'; 
import { openDatabase } from "react-native-sqlite-storage";
import { LogBox } from 'react-native';

const db = require('./src/components/Handlers/database.js');

const myContactsDB = openDatabase({name: 'MyContacts.db'});
const usersTableName = 'users'; 

let salt = bcrypt.genSaltSync(10);

const App: () => Node = () => {
  try {
    db.createContactsTable();
  } catch (error) {
    console.log('Failed to create contacts table ' + error);
  }
  try {
    db.createGroupsTable();
  } catch (error) {
    console.log('Failed to create groups table ' + error);
  }
  try {
    db.createGroupContactsTable();
  } catch (error) {
    console.log('Failed to create group contacts table ' + error);
  }
  try {
    db.createUsersTable();
  } catch (error) {
    console.log('Failed to create users table ' + error);
  }

  return <Router />;
};

LogBox.ignoreLogs(['Math.random']);
export default App;