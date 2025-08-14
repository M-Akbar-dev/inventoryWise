import React, { useRef, useState } from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';

const SignatureScreen = () => {
  const signatureRef = useRef(null);
  const [signature, setSignature] = useState(null);

  const handleSignature = (signature) => {
    setSignature(signature);
    console.log('Signature saved!', signature);
  };

  const handleClear = () => {
    signatureRef.current.clearSignature();
    setSignature(null);
  };

  const handleConfirm = () => {
    signatureRef.current.readSignature(); // important method to trigger onOK
  };

  return (
    <View style={styles.container}>
      <View style={styles.signatureContainer}>
        <SignatureCanvas
          ref={signatureRef}
          onOK={handleSignature}
          onClear={handleClear}
          descriptionText="Sign here"
          clearText="Clear"
          confirmText="Save"
          webStyle={`
            .m-signature-pad {
              flex: 1;
              background-color: white;
            }
            .m-signature-pad--body {
              border: none;
            }
          `}
          penColor="black"
          backgroundColor="white"
        />
      </View>

      {/* <View style={styles.buttonContainer}>
        <Button title="Clear" onPress={handleClear} color="#ff4444" />
        <Button title="Save Signature" onPress={handleConfirm} color="#0066cc" />
      </View> */}

      {signature && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Signature Preview:</Text>
          <Image
            style={styles.signaturePreview}
            source={{ uri: signature }}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  signatureContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    gap: 10,
  },
  previewContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signaturePreview: {
    width: 300,
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  previewText: {
    marginBottom: 10,
    color: '#666',
  },
});

export default SignatureScreen;
