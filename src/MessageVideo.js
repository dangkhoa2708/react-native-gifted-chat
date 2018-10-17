/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View, ViewPropTypes } from 'react-native';
import Video from 'react-native-video';
import Lightbox from 'react-native-lightbox';

export default function MessageVideo({
  containerStyle,
  videoProps,
  imageStyle,
  currentMessage,
  uri
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Video
        {...videoProps}
        style={[styles.image, imageStyle]}
        source={{ uri: currentMessage.video }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 150,
    height: 100,
    borderRadius: 8,
  }
});

MessageVideo.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  videoProps: {},
  lightboxProps: {},
};

MessageVideo.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  videoProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
