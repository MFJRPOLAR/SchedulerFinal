import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Group = props => {

    const post = props.post;
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('Existing Group', {post: post})
    }

  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <View style={{flex: 1}}>
                    <View style={{backgroundColor: post.color, 
                            height: 50, 
                            width: 50,
                            borderRadius: 50,}}>
                        <Text style={styles.color}>{post.name.charAt(0)}</Text>
                    </View>
            </View>
            <View style={{flex: 6}}>
                <Text style={styles.name} numberOfLines={1}>{post.name}</Text>
            </View>
        </TouchableOpacity>
    </View>
  );
};

export default Group;