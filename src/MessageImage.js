/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View, ViewPropTypes, Dimensions, TouchableOpacity } from 'react-native';
import Lightbox from 'react-native-lightbox';

const { width, height } = Dimensions.get('window')
export default function MessageImage({
  containerStyle,
  lightboxProps,
  imageProps,
  imageStyle,
  currentMessage,
}) {
  const convertToImgix = (url, options = {}, width, height) => {
    if (!url) return ''
    const queryStringArr = []
    for (const key of Object.keys(options)) {
      queryStringArr.push(`${key}=${options[key]}`)
    }

    let queryString = ''
    if (queryStringArr.length > 0) {
      queryString =
        `?${queryStringArr.join('&')}&auto=format&fit=crop&w=${width}&h=${width}&dpr=2.0&fm=jpg&q=40"`
    } else {
      queryString =
        `?auto=format&fit=crop&w=${width}&h=${height}&dpr=2.0&fm=jpg&q=40`
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
      springConfig={{ tension: 900000, friction: 900000 }}
      activeProps={{
        style: styles.imageActive,
      }}
      renderContent={() => {
        return (
          <Image
            {...imageProps}
            style={{
              width: width,
              height: height
            }}
            source={{ uri: currentMessage.image }}
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
          source={{ uri: convertToImgix(currentMessage.image, {}, 150, 100) }}
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
  close: {
    width: 30,
    height: 30
  },
  closeHolder: {
    width,
    position: 'absolute',
    top: 5,
    zIndex: 100000,
    left: 5,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
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
