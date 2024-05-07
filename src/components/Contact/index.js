import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const database = require('../Handlers/database.js');

const Contact = props => {

    const post = props.post;
    const navigation = useNavigation();

    const onPress = () => {
        if (post.group_id) {
            try {
                database.addGroupContact(post.id, post.group_id);
            } catch (error) {
                console.log('Error adding contact group' + error);
            }
            alert('Contact added to group!');
        } else {
            navigation.navigate('Existing Contact', {post: post})
        }
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={{flex: 2}}>
                <Text style={styles.fullname} numberOfLines={1}>{post.fullname}</Text>
                <Text style={styles.email} numberOfLines={1}>{post.email}</Text>
            </View>
            <View style={{flex: 1}}>
                <Text style={styles.phone}>{post.phone}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Contact;