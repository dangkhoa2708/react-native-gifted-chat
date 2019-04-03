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
        if (this.props.isSeen) {
            return (
                <View style={styles.viewSeen}>
                    <Text style={this.props.styleSeenText}>Seen</Text>
                </View>
            )
        }
        if (this.props.isTyping) {
            return <Image
                resizeMode="contain"
                style={styles.imgTyping}
                source={{ uri: 'https://support.signal.org/hc/article_attachments/360016877511/typing-animation-3x.gif' }} />
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
        // marginBottom: 12,
        width: 50,
        height: 40
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
