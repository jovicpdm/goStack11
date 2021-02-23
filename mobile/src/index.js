import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function App() {
    return(
        <>
        <StatusBar barStyle="light-content" backgroundColor="black"/>    
        <View style={styles.container }>
            <Text style={styles.title}>Olá mundo</Text>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    title: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    }
});