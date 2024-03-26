import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { RecoilRoot } from 'recoil';
import Navigation from './components/navigation';

export default function App() {
  const isWeb = Platform.OS === 'web';

  return (
    <RecoilRoot>
      <View style={isWeb ? styles.appContainer : styles.fullScreen}>
        {isWeb ? (
            <View style={styles.container}>
              <Navigation />
            </View>
          ) : (
            <Navigation />
          )}
      </View>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#e9e9e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: Platform.OS === 'web' ? 375 : '100%', 
    height: Platform.OS === 'web' ? 667 : '100%', 
    backgroundColor: '#fff',
    borderWidth: Platform.OS === 'web' ? 2 : 0,
    borderColor: '#000',
    borderStyle: 'solid',
    borderRadius: Platform.OS === 'web' ? 20 : 0,
    overflow: 'hidden', 
    shadowColor: Platform.OS === 'web' ? "#000" : 'transparent', 
    shadowOffset: {
      width: 0,
      height: Platform.OS === 'web' ? 2 : 0,
    },
    shadowOpacity: Platform.OS === 'web' ? 0.25 : 0,
    shadowRadius: Platform.OS === 'web' ? 3.84 : 0,
    elevation: Platform.OS === 'web' ? 5 : 0,
  },
  plusButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

