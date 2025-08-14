import React, { useState } from 'react';
import { SafeAreaView, Text, ActivityIndicator, View } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './styles';

function TermsAndConditions(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLoadStart = () => {
    setLoading(true);
    setError(null);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    setLoading(false);
    setError(`WebView Error: ${nativeEvent.description}`);
  };

  const body = () => {
    return (
      <SafeAreaView style={styles.container}>
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorText}>Please check your internet connection and try again.</Text>
          </View>
        ) : (
          <>
            <WebView
              source={{ uri: 'https://inventorywise.co.uk/term-condition/' }}
              style={styles.webview}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
              onError={handleError}
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                setLoading(false);
                setError(`HTTP Error: ${nativeEvent.statusCode}`);
              }}
              startInLoadingState={true}
              renderLoading={() => (
                <ActivityIndicator
                  size="large"
                  color={styles.loaderColor?.color || '#0000ff'}
                  style={styles.loader}
                />
              )}
            />
            {loading && (
              <ActivityIndicator
                size="large"
                color={styles.loaderColor?.color || '#0000ff'}
                style={styles.loader}
              />
            )}
          </>
        )}
      </SafeAreaView>
    );
  };

  return body();
}

export default TermsAndConditions