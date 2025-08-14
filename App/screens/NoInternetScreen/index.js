import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import styles from './styles';
import { Images } from '../../themes';

const NoInternetScreen = ({ retry }) => {
    return (
        <View style={styles.container}>
            <Image style={{width:400 , height : 400}} source={Images.NoInternet} />
            <Text style={styles.title}>No Internet Connection</Text>
            <Text style={styles.subtitle}>Please check your connection and try again.</Text>
            <Button title="Retry" onPress={retry} />
        </View>
    );
};

 

export default NoInternetScreen;
