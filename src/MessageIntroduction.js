import React from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { utils } from "react-native-gifted-chat";

export default function MessageIntroduction({
    userAvtURL,
    userName,
    myStatus,
    otherStatus,
    onAcceptPress,
    onDenyPress
}){
    const renderStatusField = ()=>{
        if(otherStatus == 'deny'){
            return <View  style={{
                backgroundColor: '#ff6a4d',
                 paddingVertical: 10, 
                 marginTop: 20
                 }}>
                    <Text style={{
                            marginHorizontal: 15,
                            fontSize: 12,
                            color: 'white', 
                            fontWeight: "bold"
                            }}>{`${userName} denied to connect`}
                    </Text>
                </View>
        } else if (myStatus == 'pending'){
            return (
                <View style={styles.btnField}>
                    <TouchableOpacity onPress={onAcceptPress} style={[styles.btnCon,{
                        borderRightWidth: 0.5,
                        borderRightColor: '#d9d9d9'
                    }]}>
                        <Text style={styles.actionText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onDenyPress} style={styles.btnCon}>
                        <Text style={styles.actionText}>Deny</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (myStatus == 'accept'){
            if(otherStatus == 'accept'){
                return <View 
                style={{
                    backgroundColor: '#d9d9d9',
                     paddingVertical: 10, 
                     marginTop: 20
                     }}>
                <Text 
                style={{
                    marginHorizontal: 15,
                     fontSize: 12,
                      color: '#808080', 
                      fontWeight: "bold"
                    }}
               >
                Connection Established
               </Text>
               </View>
            }
              return <View  style={{
                backgroundColor: '#b3b300',
                 paddingVertical: 10, 
                 marginTop: 20
                 }}>
                    <Text style={{
                        marginHorizontal: 15,
                        fontSize: 12,
                        color: 'white', 
                        fontWeight: "bold"
                    }}>
                    {`Waiting for ${userName} to accept`}
                    </Text>
                </View>
        } else if (myStatus == 'deny'){
            return <View  style={{
                backgroundColor: '#ff6a4d',
                 paddingVertical: 10, 
                 marginTop: 20
                 }}>
                    <Text style={{
                            marginHorizontal: 15,
                            fontSize: 12,
                            color: 'white', 
                            fontWeight: "bold"
                            }}>{`You denied to connect`}
                    </Text>
                </View>
        }
    }
    return(
        <View>
        <View style={{backgroundColor: '#b3d1ff', flex: 1, paddingVertical: 10}}>
            <Text style={styles.title}>Connection</Text>
        </View>
        <View style={styles.container}>
            <Image 
            resizeMode="contain" 
            style={styles.avt} 
            source={{uri: utils.convertToImgix(userAvtURL, {w: 60, h: 60})}}/>
            <Text ellipsizeMode="tail" numberOfLines={1} style={styles.username}>{userName}</Text>
            {renderStatusField()}
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        minWidth: 160,
        maxWidth: 240
    },
    avt: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginTop: 15
    },
    username: {
        marginTop: 5,
        marginHorizontal: 8,
        fontSize: 14,
        fontWeight: "bold"
    },
    btnCon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    btnField: {
        borderTopColor: '#d9d9d9',
        flexDirection: 'row',
        borderTopWidth: 0.5,
        marginTop: 20
    },
    actionText: {
        fontSize: 12,
        fontWeight: "500"
    },
    title: {
        fontSize: 12,
        fontWeight: "bold",
        marginLeft: 10,
    }
})
