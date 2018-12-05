import React, { PureComponent } from 'react'
import {
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import PropTypes from 'prop-types'

export default class TouchOutsideDismissKeyboard extends PureComponent {
  static propTypes = {
    children: PropTypes.object
  }

  static defaultProps = {
    children: {}
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  onOutSidePress = () => {
    if (this.keyboardIsShown) {
      Keyboard.dismiss()
    }
  }

  _keyboardDidShow = () => {
    this.keyboardIsShown = true
  }

  _keyboardDidHide = () => {
    this.keyboardIsShown = false
  }

  render() {
    const { children } = this.props
    return (
      <TouchableWithoutFeedback onPress={this.onOutSidePress}>
        {children}
      </TouchableWithoutFeedback>
    )
  }
}
