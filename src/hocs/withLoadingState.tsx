import React, { ComponentType } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface WithLoadingProps {
  isLoading?: boolean;
  loadingMessage?: string;
}

export const withLoadingState = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P & WithLoadingProps> => {
  const WithLoadingState = ({ isLoading = false, loadingMessage = 'Loading...', ...props }: WithLoadingProps & P) => {
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#1890ff" />
          <Text style={styles.loadingText}>{loadingMessage}</Text>
        </View>
      );
    }

    return <WrappedComponent {...(props as P)} />;
  };

  WithLoadingState.displayName = `withLoadingState(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithLoadingState;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
});

