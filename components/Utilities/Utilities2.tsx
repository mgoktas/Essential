import { Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from 'react-native-vector-icons/Ionicons'
import { horizontalScale, verticalScale } from "../Metrics";
import { SCREEN_WIDTH } from "./Utilities";

export const BackButton = ({onPress}) => {
    return (
        <SafeAreaView style={styles.backButton}>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.backButtonText}>
                    X
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export const Logo = () => {
    return (
        <View style={styles.logo}>
            <Image source={require('../images/icon/1024.png')} style={styles.logoImage}></Image>
        </View>
    )
}

export const Input = ({onChangeText, icon, placeholder, isPassword, autoCap, isDarkModeOn}) => {
    return (
        <View style={[styles.inputBox, {backgroundColor: isDarkModeOn ? 'black' : 'white'}]}>

            <View style={styles.iconCnt} >
                <Icon name={icon} style={[styles.icon, {left: isPassword ? .7 : 0}]} size={20}/>
            </View>

            <TextInput autoCapitalize={autoCap} secureTextEntry={isPassword} onChangeText={onChangeText} placeholder={placeholder}  placeholderTextColor={'#6B6B6B'} style={styles.textInput}>
                
            </TextInput>
        </View>
    )
}

export const CustomButton = ({
    title, onPress, bck, color
}) => {

    return (
    <TouchableOpacity style={[styles.btnCtnCst, {backgroundColor : bck, borderWidth: 2}]} onPress={onPress}>
        <Text style={[styles.textCst, {color: color}]}>
           {title}
        </Text>
    </TouchableOpacity>
)}

export const TextButton = ({txt, onPress, margin, isDarkModeOn}) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.txtBtmCnt, {marginVertical: margin}]}>
            <Text style={[styles.txtBtm, {color: isDarkModeOn ? 'white' : 'black'}]}>
                {txt}
            </Text>
        </TouchableOpacity>
    )
}

export const BottomText = ({txt, isDarkModeOn}) => {
    return (
        <View style={styles.txtBtmCnt}>
            <Text style={[styles.txtBtm, {color: isDarkModeOn ? 'white' : 'black'}]}>
                {txt}
            </Text>
        </View>
    )
}

export const LineSeperator = () => {
    return (
    <View style={styles.seperator}>
    </View>
    )}

const styles = StyleSheet.create({
    backButton : {
        marginLeft: 30,
    },
    backButtonText : {
        fontSize: 24,
        opacity: 1,
        color: '#766E6E'
    },
    backButtonAbs : {
        marginLeft: 30,
        position: 'absolute',
        top: 10,
    },
    backButtonTextAbs : {
        fontSize: 20,
        opacity: .4
    },
    logo : {
        width: horizontalScale(100),
        height: horizontalScale(100),
        backgroundColor: 'black',
        opacity: .7,
        alignSelf: 'center',
        borderRadius: 40,
    },
    logoImage : {
        width: horizontalScale(100),
        height: horizontalScale(100),
        backgroundColor: 'black',
        opacity: .7,
        alignSelf: 'center',
        borderRadius: 40,
    },
    seperator : {
        borderBottomWidth: .6,
        width: SCREEN_WIDTH * .95,
        borderBottomColor: 'white',
        alignSelf: 'flex-end',
        marginVertical:2

    },
    seperatorPr : {
        borderBottomWidth: .2,
        width: SCREEN_WIDTH * .95,
        alignSelf: 'flex-end',
        borderBottomColor: 'white'
    },
    inputBox: {
        height: 50,
        backgroundColor: 'black',
        flexDirection: 'row',
    },
    icon : {
        alignSelf: 'center',
        top: 2,
    },
    iconCnt : {
        width: '7%',
        height: 26,
        alignSelf: 'center',
        margin: 10,
        backgroundColor: 'gray',
        borderRadius: 30
    },
    textInput : {
        opacity: 1,
        fontSize: 18,
        color: 'white',
        left: 10
    },
    btnCtnCst : {
        marginHorizontal: horizontalScale(40),
        height: 50,
        justifyContent: 'center',
        borderRadius: 30,
        marginVertical: verticalScale(10),
    },
    btnCtnCstLg : {
        marginHorizontal: horizontalScale(40),
        height: verticalScale(60),
        borderRadius: 6,
        // marginTop: verticalScale(10),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textCst : {
        alignSelf: 'center',
        fontSize: 18,
        color: 'black',
        fontWeight: 500
    },
    txtBtmCnt: {
        justifyContent: 'center',
    },
    txtBtm : {
        alignSelf: 'center',
        color: 'white',
        opacity: .8,
        fontWeight: 400,
        fontSize: 12
    },
})