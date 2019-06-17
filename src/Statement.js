/* eslint no-use-before-define: ["error", { "variables": false }] */

import React from 'react';
import { StyleSheet, Text, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import Color from './Color';

export default function Statement({ message, containerStyle, wrapperStyle, textStyle }) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text numberOfLines={2} style={[styles.text, textStyle]}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.defaultColor,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center'
  },
});

Statement.defaultProps = {
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
};

Statement.propTypes = {
  containerStyle: ViewPropTypes.style,
  wrapperStyle: ViewPropTypes.style,
  textStyle: Text.propTypes.style,
};
