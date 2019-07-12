/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, SafeAreaView, ViewPropTypes, Dimensions, Modal, View, TouchableOpacity, Platform } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';


const { width, height } = Dimensions.get('window')
export default function MessageImage({
  containerStyle,
  lightboxProps,
  imageProps,
  imageStyle,
  currentMessage,
  onOpen,
  onClose,
  onCancel,
  showModal,
  connectionID
}) {
  const convertToImgix = (url, options = {}) => {
    if (!url) return ''
    const queryStringArr = []
    for (const key of Object.keys(options)) {
      queryStringArr.push(`${key}=${options[key]}`)
    }
    return url + `?${queryStringArr.join('&')}`
  }
  return (
    <View>
      <Modal
        onShow={onOpen}
        onRequestClose={() => {
          onCancel(onClose)
        }}
        visible={showModal}
        transparent={true}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
          <ImageViewer
            onCancel={() => onCancel(onClose)}
            enableSwipeDown
            enableImageZoom
            renderIndicator={() => {
              return <View />
            }}
            imageUrls={[{
              width: width,
              height: height,
              url: currentMessage.image,
              props: {
                resizeMode: "contain",
                source: {
                  headers: {
                    connectionID: connectionID
                  }
                }
              }
            }]} />

          <TouchableOpacity
            style={{
              width: 40, height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              left: 15,
              top: 20
            }}
            onPress={() => onCancel(onClose)}>
            <Image
              resizeMode="contain"
              style={{ width: 24, height: 24, tintColor: 'white' }}
              source={require('./assets/images/ic_close.png')}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
      <View
        style={[styles.container, containerStyle]}>
        <Image
          {...imageProps}
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: convertToImgix(currentMessage.image, { w: 200, h: 200 }),
            headers: {
              connectionID: connectionID
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    backgroundColor: '#7F8284'
  },
  image: {
    flex: 1
  },
  imageActive: {
    flex: 1,
    resizeMode: 'cover',
  },
  closeButton: {
    fontSize: 18,
  },
  closeHolder: {
    width: 32,
    height: 32,
    marginTop: 15,
    marginLeft: 15,
    borderRadius: 16,
    backgroundColor: '#878585',
    justifyContent: 'center',
    alignItems: 'center'
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
  onOpen: () => { },
  onClose: () => { },
  onCancel: () => { },
  showModal: false
};

MessageImage.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: ViewPropTypes.style,
  imageStyle: Image.propTypes.style,
  imageProps: PropTypes.object,
  lightboxProps: PropTypes.object,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onCancel: PropTypes.func,
  showModal: PropTypes.bool
};
