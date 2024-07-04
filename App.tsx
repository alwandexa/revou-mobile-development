/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Avatar from './src/components/atoms/Avatar';
import Typography from './src/components/atoms/Typography';
import {COLORS} from './src/constants/colors';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={[styles.container]}>
      <Typography
        type="heading"
        size="xxlarge"
        style={{color: COLORS.purple400}}>
        alwan
      </Typography>
      <Avatar size="xxlarge" />
      <TouchableOpacity
        style={{
          width: 200,
          height: 50,
          backgroundColor: COLORS.purple500,
          borderRadius: 80,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Typography
          type="heading"
          size="medium"
          style={{color: COLORS.neutral300,}}>
          What is the
        </Typography>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    alignItems: 'center',
  },
});

export default App;
