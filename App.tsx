/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Typography from './src/components/atoms/Typography';
import {COLORS} from './src/constants/colors';
import Avatar from './src/components/atoms/Avatar';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={[styles.container]}>
      <Typography type="heading" size="xxlarge" style={{color: COLORS.blue200}}>
        alwan
      </Typography>
      <Avatar size="medium" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
});

export default App;
