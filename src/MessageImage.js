/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View, ViewPropTypes, Dimensions } from 'react-native';
import Lightbox from 'react-native-lightbox';

const { width, height } = Dimensions.get('window')
export default function MessageImage({
  containerStyle,
  lightboxProps,
  imageProps,
  imageStyle,
  currentMessage,
}) {
  const convertToImgix = (url, options = {}, small = true) => {
    if (!url) return ''
    const queryStringArr = []
    for (const key of Object.keys(options)) {
      queryStringArr.push(`${key}=${options[key]}`)
    }

    let queryString = ''
    if (queryStringArr.length > 0) {
      queryString = small ?
        `?${queryStringArr.join('&')}&auto=format&fit=crop&w=100&h=100&dpr=2.0&fm=jpg&q=40"`
        :
        `?${queryStringArr.join('&')}&auto=format&fit=crop&dpr=2.0&fm=jpg&q=40"`
    } else {
      queryString = small
        ?
        '?auto=format&fit=crop&w=100&h=100&dpr=2.0&fm=jpg&q=40'
        :
        '?auto=format&fit=crop&dpr=2.0&fm=jpg&q=40'
    }
    url = url
      .replace(
        'https://skylabchat.s3.ap-south-1.amazonaws.com/',
        'http://messageinternal.imgix.net/'
      ) + queryString

    return url
  }
  return (
    <Lightbox
      activeProps={{
        style: styles.imageActive,
      }}
      renderContent={() => {
        console.log(currentMessage.image)
        return (
          <Image
            {...imageProps}
            style={{
              width: width,
              height: height
            }}
            source={{ uri: convertToImgix(currentMessage.image, {}, false) }}
          />
        )
      }}
      {...lightboxProps}
    >
      <View
        style={[styles.container, containerStyle]}>
        <Image
          {...imageProps}
          style={styles.image}
          source={{ uri: convertToImgix(currentMessage.image) }}
        />
      </View>

    </Lightbox>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 100,
    backgroundColor: '#7F8284'
  },
  image: {
    flex: 1
  },
  imageActive: {
    flex: 1,
    resizeMode: 'cover',
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
