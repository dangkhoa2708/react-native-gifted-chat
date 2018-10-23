/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View, ViewPropTypes } from 'react-native';
import Lightbox from 'react-native-lightbox';

export default function MessageImage({
  containerStyle,
  lightboxProps,
  imageProps,
  imageStyle,
  currentMessage,
}) {
  return (
    <Lightbox
      activeProps={{
        style: styles.imageActive,
      }}
      {...lightboxProps}
    >
      <View style={[styles.container, containerStyle]}>
        <Image
          {...imageProps}
          style={styles.image}
          source={{ uri: currentMessage.image }}
        />
      </View>

    </Lightbox>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 100
  },
  image: {
    flex: 1
  },
  imageActive: {
    flex: 1,
    resizeMode: 'contain',
  },
});

MessageImage.defaultProps = {
  currentMessage: {
    image: null,
  },
  containerStyle: {},
  imageStyle: {},
  imageProps: {},
  lightboxProps: {},
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object,
};
