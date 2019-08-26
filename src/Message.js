/* eslint react-native/no-inline-styles: 0 */

import PropTypes from 'prop-types';
import React from 'react';
import { View, ViewPropTypes, StyleSheet, Image, Text } from 'react-native';

import Avatar from './Avatar';
import Color from './Color';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';
import Day from './Day';
import Time from './Time';
import Statement from './Statement'

import { isSameUser, isSameDay } from './utils';

const styles = {
  left: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginLeft: 8,
      marginRight: 0,
    },
  }),
  right: StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      marginLeft: 0,
      marginRight: 0,
    },
  }),
};

export default class Message extends React.Component {

  state = {
    showTime: false
  }

  shouldComponentUpdate(nextProps) {
    if ((nextProps.selectedId == this.props.currentMessage._id)
      || (this.props.currentMessage._id == this.props.selectedId)
      || (this.props.roomType == 'group' && (this.props.arrSeenMsg.some(e => e.msg_id == this.props.currentMessage._id) || nextProps.arrSeenMsg.some(e => e.msg_id == this.props.currentMessage._id)))
      || (this.props.roomType == 'private' && (this.props.currentMessage._id == this.props.seenId || this.props.currentMessage._id == nextProps.seenId))) {

      return true
    }
    return false
  }

  getInnerComponentProps() {
    const { containerStyle, selectedId, ...props } = this.props;
    return {
      ...props,
      isSameUser,
      isSameDay,
      selectedId
    };
  }

  renderTime() {
    if (this.props.currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = this.props;
      if (this.props.renderTime) {
        return this.props.renderTime(timeProps);
      }
      return <Time {...timeProps} />;
    }
    return null;
  }

  renderDay() {
    if (this.props.currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps();
      if (this.props.renderDay) {
        return this.props.renderDay(dayProps);
      }
      return <Day {...dayProps} />;
    }
    return null;
  }

  renderBubble() {
    const { onBubblePress = (item) => { }, onVideoPress = (item) => { } } = this.props
    const bubbleProps = this.getInnerComponentProps();
    if (this.props.renderBubble) {
      return this.props.renderBubble(bubbleProps);
    }
    return <Bubble
      onPress={onBubblePress}
      onVideoPress={onVideoPress}
      {...bubbleProps} />;
  }

  renderSystemMessage() {
    const systemMessageProps = this.getInnerComponentProps();
    if (this.props.renderSystemMessage) {
      return this.props.renderSystemMessage(systemMessageProps);
    }
    return <SystemMessage {...systemMessageProps} />;
  }

  renderStatement() {
    const message = this.props.currentMessage.text
    return (
      <View>
        < Statement message={message} />
        {this.renderArrSeen()}
      </View>
    )
  }

  convertToImgix = (url, options = {}) => {
    // if (!url) return ''
    // const queryStringArr = []
    // for (const key of Object.keys(options)) {
    //   queryStringArr.push(`${key}=${options[key]}`)
    // }

    // let queryString = ''
    // if (queryStringArr.length > 0) {
    //   queryString =
    //     `?${queryStringArr.join('&')}&auto=format&dpr=2.0&fm=jpg&q=40"`
    // } else {
    //   queryString =
    //     `?auto=format&fit=crop&dpr=2.0&fm=jpg&q=40`
    // }
    // url = url
    //   .replace(
    //     'https://skylabchat.s3.ap-south-1.amazonaws.com/',
    //     'http://messageinternal.imgix.net/'
    //   ) + queryString

    return url
  }

  renderArrSeen = () => {
    if (this.props.roomType == 'group') {
      return (
        <View style={{
          alignSelf: 'flex-end',
          flexDirection: 'row'
        }}>
          {this.renderArrSeenAvatar()}
        </View>
      )
    }
  }

  renderArrSeenAvatar = () => {
    return this.props.arrSeenMsg.map((e) => {
      if (this.props.currentMessage._id == e.msg_id) {
        const avatar = e.avatar ? { url: this.convertToImgix(e.avatar, { w: 18, h: 18 }) } : require('./assets/images/img_placeholder.png')
        return (
          <Image
            key={`${e.user_id}`}
            source={avatar}
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              marginRight: 5,
              marginBottom: 10
            }}
          />
        )
      } else {
        return null
      }
    })
  }

  renderAvatarSeen = () => {
    if (this.props.roomType == 'private' && (this.props.currentMessage._id == this.props.seenId)) {
      return (
        <Image
          source={{ uri: this.props.avatarSeen }}
          style={{
            width: 18,
            height: 18,
            borderRadius: 9,
            marginHorizontal: 3
          }}
        />
      )
    }
    return (
      <View
        style={{
          width: 18,
          marginHorizontal: 3
        }}
      />
    )
  }

  renderAvatar() {
    if (this.props.user._id === this.props.currentMessage.user._id && !this.props.showUserAvatar) {
      return null;
    }
    const avatarProps = this.getInnerComponentProps();
    const { currentMessage } = avatarProps;
    if (currentMessage.user.avatar === null) {
      return null;
    }
    return <Avatar {...avatarProps} />;
  }

  render() {
    const { currentMessage, nextMessage, previousMessage, inverted } = this.props
    const sameUser = isSameUser(currentMessage, nextMessage);
    const sameUser2 = isSameUser(currentMessage, previousMessage);
    const color = this.props.customerInfo.id == this.props.currentMessage.user._id ? Color.defaultBlue : Color.defaultColor
    return (
      <View>
        {this.renderDay()}
        {currentMessage.system ? (
          this.renderSystemMessage()
        ) : (
            currentMessage.type == 'statement'
              ? this.renderStatement()
              : (
                <View>
                  {this.props.selectedId === this.props.currentMessage._id &&
                    isSameDay(currentMessage, inverted ? previousMessage : nextMessage) &&
                    < View style={{ alignItems: 'center' }}>
                      {this.renderTime()}
                    </View>
                  }
                  {(this.props.position === 'left' && !sameUser2 && this.props.roomType != 'private') && < Text style={{
                    color: color,
                    fontSize: 12,
                    fontWeight: '500',
                    marginBottom: 4,
                    marginLeft: 50
                  }}> {this.props.currentMessage.user.name}</Text>}
                  <View
                    style={[
                      styles[this.props.position].container,
                      { marginBottom: sameUser ? 2 : 10 },
                      !this.props.inverted && { marginBottom: 2 },
                      this.props.containerStyle[this.props.position],
                    ]}
                  >
                    {this.props.position === 'left' ? this.renderAvatar() : null}
                    {this.renderBubble()}
                    {this.props.position === 'right' ? this.renderAvatar() : null}
                    {this.renderAvatarSeen()}
                  </View>

                  {this.renderArrSeen()}
                </View>
              ))
        }
      </View>
    );
  }

}

Message.defaultProps = {
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  renderSystemMessage: null,
  position: 'left',
  currentMessage: {},
  nextMessage: {},
  previousMessage: {},
  user: {},
  containerStyle: {},
  showUserAvatar: true,
  inverted: true,
};

Message.propTypes = {
  renderAvatar: PropTypes.func,
  showUserAvatar: PropTypes.bool,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  renderSystemMessage: PropTypes.func,
  position: PropTypes.oneOf(['left', 'right']),
  currentMessage: PropTypes.object,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  user: PropTypes.object,
  inverted: PropTypes.bool,
  containerStyle: PropTypes.shape({
    left: ViewPropTypes.style,
    right: ViewPropTypes.style,
  }),
};
