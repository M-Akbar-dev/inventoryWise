import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

function CustomTextInput(props) {
    const {
        placeholder,
        value,
        onChangeText,
        secureTextEntry,
        isRequired,
        placeholderTextColor,
        keyboardType,
        customInput,
        customContainerInput,
        isPassword,
        editable,
        selectTextOnFocus,
        numberOfLines = 1
    } = props;

    const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={[styles.inputContainer, customContainerInput]}>
            {/* Required Field Indicator */}
            {/* {isRequired && (
                <MaterialCommunityIcons name={"asterisk"} size={10} color={"red"} style={styles.requiredIcon} />
            )} */}
            
            <TextInput
                style={[styles.input, customInput]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={isPassword ? isPasswordVisible : secureTextEntry}
                placeholderTextColor={placeholderTextColor || "#999"}
                keyboardType={keyboardType || "default"}
                onContentSizeChange={false}
                numberOfLines={numberOfLines}
                editable={editable}
                selectTextOnFocus={selectTextOnFocus}
                contextMenuHidden={false}
             />
            
            {/* Right Icon for Password Toggle */}
            {isPassword && (
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconWrapper}>
                    <MaterialCommunityIcons
                        name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="gray"
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}

CustomTextInput.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool,
    isRequired: PropTypes.bool,
    placeholderTextColor: PropTypes.string,
    keyboardType: PropTypes.string,
    customInput: PropTypes.object,
    customContainerInput: PropTypes.object,
    isPassword: PropTypes.bool,
    editable: PropTypes.bool,
    selectTextOnFocus : PropTypes.bool
};

CustomTextInput.defaultProps = {
    placeholder: '',
    secureTextEntry: false,
    isRequired: false,
    isPassword: false,
};

export default CustomTextInput;