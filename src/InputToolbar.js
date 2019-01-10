/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View, Keyboard, ViewPropTypes, Platform, Animated, Text } from 'react-native';

import Composer from './Composer';
import Send from './Send';
import Actions from './Actions';
import Color from './Color';

export default class InputToolbar extends React.Component {

  constructor(props) {
    super(props);

    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);

    this.state = {
      position: 'absolute',
    };
  }

  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }

  keyboardWillShow() {
    if (this.state.position !== 'relative') {
      this.setState({
        position: 'relative',
      });
    }
  }

  keyboardWillHide() {
    if (this.state.position !== 'absolute') {
      this.setState({
        position: 'absolute',
      });
    }
  }

  renderActions() {
    if (this.props.renderActions) {
      return this.props.renderActions(this.props);
    } else if (this.props.onPressActionButton) {
      return <Actions {...this.props} />;
    }
    return null;
  }

  renderSend() {
    if (this.props.renderSend) {
      return this.props.renderSend(this.props);
    }
    return <Send {...this.props} />;
  }

  renderComposer() {
    if (this.props.renderComposer) {
      return this.props.renderComposer(this.props);
    }

    return <Composer {...this.props} />;
  }

  renderAccessory() {
    if (this.props.renderAccessory) {
      return (
        <View style={[styles.accessory, this.props.accessoryStyle]}>{this.props.renderAccessory(this.props)}</View>
      );
    }
    return null;
  }

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle, {}]}>
        <View style={[styles.primary, this.props.primaryStyle]}>
          {this.renderActions()}
          <View style={[styles.inputField, this.props.inputFieldStyle]}>
            {this.renderComposer()}
          </View>
          {this.props.showSend ? this.renderSend() : this.props.renderRightAction()}
        </View>
        {this.renderAccessory()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: Color.defaultColor,
    backgroundColor: Color.white,
    bottom: 10,
    // left: 10,
    // right: 10,
    paddingHorizontal: 10,
  },
  primary: {
    marginTop: 5,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CECECE'
  },
  accessory: {
    height: 44,
  },
  inputField: {
    // paddingLeft: 13,
    paddingRight: 15,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    marginRight: 0,
    flex: 1,
  }
});

InputToolbar.defaultProps = {
  renderAccessory: null,
  renderActions: null,
  renderSend: null,
  renderComposer: null,
  containerStyle: {},
  inputFieldStyle: {},
  showSend: false,
  primaryStyle: {},
  accessoryStyle: {},
  onPressActionButton: () => { },
};

InputToolbar.propTypes = {
  renderAccessory: PropTypes.func,
  renderActions: PropTypes.func,
  renderSend: PropTypes.func,
  renderComposer: PropTypes.func,
  onPressActionButton: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  inputFieldStyle: ViewPropTypes.style,
  primaryStyle: ViewPropTypes.style,
  accessoryStyle: ViewPropTypes.style,
  showSend: PropTypes.bool,
};
