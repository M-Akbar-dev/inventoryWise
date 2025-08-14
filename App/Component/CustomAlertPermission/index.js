import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import styles from './styles';
import { AppStyles } from '../../themes';
import { useSelector } from 'react-redux';

const CustomAlertPermission = ({
    visible,
    title,
    description,
    buttons
}) => {

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
        >
            <StatusBar backgroundColor={'rgba(0, 0, 0, 0.5)'} />
            <View style={styles.overlay}>
                <View style={styles.alertBox}>
                    {title && <Text style={[styles.title, { fontSize: 18 }]}>{title}</Text>}
                    {description && <Text style={[styles.description, { fontSize: 15 }]}>{description}</Text>}

                    <View style={styles.buttonContainer}>
                        {buttons && buttons.map((button, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.button,
                                    index === 0 && styles.buttonPrimary,
                                    index === 1 && styles.buttonSecondary,
                                    index === 2 && styles.buttonTertiary
                                ]}
                                onPress={button.onPress}
                            >
                                <Text style={[
                                    styles.buttonText,
                                    index === 0 && styles.buttonTextPrimary,
                                    index === 1 && styles.buttonTextSecondary,
                                    index === 2 && styles.buttonTextTertiary,
                                    { fontSize: 14 }
                                ]}>
                                    {button.text}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </View>
        </Modal>
    );
};



export default CustomAlertPermission;
