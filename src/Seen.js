/* eslint no-use-before-define: ["error", { "variables": false }] */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

export default class Seen extends Component {
    shouldComponentUpdate(nextProps) {
        if ((this.props.isTyping != nextProps.isTyping) || (this.props.isSeen != nextProps.isSeen)) {
            return true
        }
        return false
    }
    render() {
        console.log('runnnn')
        if (this.props.isSeen) {
            return (
                <View style={styles.viewSeen}>
                    <Text style={this.props.styleSeenText}>Seen</Text>
                </View>
            )
        }
        if (this.props.isTyping) {
            return <Image style={styles.imgTyping} source={require('./assets/images/img_typing.png')} />
        }
        return null
    }
}

const styles = StyleSheet.create({
    seenText: {
        // color: AppStyle.secondaryTextColor,
        fontSize: 14,
        // fontFamily: 'SFProText-Regular'
    },
    imgTyping: {
        marginLeft: 13,
        marginBottom: 12
    },
    viewSeen: {
        alignItems: 'flex-end',
        marginBottom: 12,
        marginRight: 10
    }
});

Seen.defaultProps = {
    isSeen: false,
    isTyping: true
};

Seen.propTypes = {
    isSeen: PropTypes.bool,
    isTyping: PropTypes.bool
};
