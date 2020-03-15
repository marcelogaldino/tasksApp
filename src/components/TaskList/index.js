import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

export default function TaskList({ data, handleDelete }) {
    return(
        <Animatable.View 
            style={style.container}
            animation='bounceIn'
            useNativeDriver
        >
        
            <TouchableOpacity onPress={ () => handleDelete(data)}>
                <Ionicons name='md-checkmark-circle' size={35} color='#121212'/>
            </TouchableOpacity>

            <View>
                <Text style={style.text} > { data.task } </Text>
            </View>
        </Animatable.View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        margin: 8,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        padding: 7,
        elevation: 1.5,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 1,
            height: 3
        }
    },
    text: {
        color: '#121212',
        paddingLeft: 10,
        paddingRight: 20,
        fontSize: 20 
    }
})