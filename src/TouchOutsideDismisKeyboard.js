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

  state = {
    keyboardIsShown: false
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
    if (this.state.keyboardIsShown) {
      Keyboard.dismiss()
    }
  }

  _keyboardDidShow = () => {
    this.setState({ keyboardIsShown: true })
  }

  _keyboardDidHide = () => {
    this.setState({ keyboardIsShown: false })
  }

  render() {
    const { children } = this.props
    return (
      <TouchableWithoutFeedback
        disabled={!this.state.keyboardIsShown}
        onPress={this.onOutSidePress}>
        {children}
      </TouchableWithoutFeedback>
    )
  }
}
