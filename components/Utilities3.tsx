import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Entypo'
import { horizontalScale, verticalScale } from "./Metrics";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./Utilities";

export const SeperatorWithText = () => {
    return (
        <SafeAreaView style={styles.seperatorWithTextCnt}>
                <View style={styles.seperatorWithTextLine}></View>
                <Text style={styles.seperatorWithText}>Or Pay By</Text>
                <View style={styles.seperatorWithTextLine}></View>
        </SafeAreaView>
    )
}

export const CardCnt = () => {
    return (
        <View style={styles.cardCnt}>
            <View style={styles.cardIconCnt}> <Icon name={'card'}/> </View>
            <Text style={styles.cardText}> </Text>
        </View>
    )
}

export const CardInfoCnt = () => {
    return (
    <View style={styles.cardInfoCnt}>
        <View style={styles.cardTextCnt}>
        <Text style={styles.cardInfoText}>Card Information</Text>
        <TouchableOpacity>
            <Icon name='camera' size={10}/>
            <Text style={styles.cardInfoTextScan}>Scan Card</Text>
        </TouchableOpacity>
        </View>
            <TextInput style={styles.cardInfoTextInput}></TextInput>
        <View>
            <TextInput style={styles.cardInfoTextInput2}></TextInput>
            <TextInput style={styles.cardInfoTextInput2}></TextInput>
        </View>
        <View>
            <Text style={styles.cardInfoText}>Card Information</Text>
            <TextInput style={styles.cardInfoTextInput}></TextInput>
            <TextInput style={styles.cardInfoTextInput}></TextInput>
        </View>
        <Text style={styles.cardInfoText}>Card Information</Text>
        <TouchableOpacity style={styles.cardInfoButton}>
            Pay XX$
        </TouchableOpacity>
    </View>
)}

export const CaretIcon = ({onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.caretIconCnt}>
            <Icon color='gray' name='caret-down' size={32}/>
        </TouchableOpacity>
    )
}

export const MyDialog = ({visible, hideDialog, onPressYes, title}) => {

    return (
      <Provider theme={{colors: {background: 'transparent', elevation: {level3: 'white'}}}}>
      <Portal>
          <Dialog style={styles.dialog} visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Actions style={{justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={hideDialog} style={{marginStart: 40, padding: 5, paddingHorizontal: 20, backgroundColor: 'white', borderRadius: 5, borderWidth: 1.2,}}><Text style={{color: 'black'}}>No</Text></TouchableOpacity>
                <TouchableOpacity onPress={onPressYes} style={{marginEnd: 40, padding: 5, paddingHorizontal: 20, backgroundColor: 'black', borderRadius: 5, borderWidth: 1.2,}}><Text style={{color: 'white'}}>Yes</Text></TouchableOpacity>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Provider>
    )
}

export const AvatarLogo = ({avatar, fullname, email}) => {
    return (
        <View style={styles.profileInfo}>
            <TouchableOpacity style={[styles.avatarLogo, {backgroundColor: avatar}]}>
            </TouchableOpacity>
            <Text style={styles.avatarName}> 
            {fullname}
            </Text>
            <Text style={styles.avatarEmail}> 
            {email}
            </Text>
        </View>
    )
}

export const SheetTitle = () => {
    return (
        <Text style={styles.sheetTitle}>
            Unlock Everything
        </Text>
    )
}

export const FeaturesBox = () => {
    return (
        <View style={styles.featuresBoxCnt}>
            <View style={styles.featuresHeadsCnt}>
                <Text style={styles.featuresHeads1}>Features</Text>
                <View style={styles.featuresBoxRowText2Cnt}>
                <Text style={styles.featuresHeads2}>Free</Text>
                </View>
                <View style={styles.featuresBoxRowText2Cnt}>
                <Text style={[styles.featuresHeads2, {color: '#007AFF'}]}>Pro</Text>
                </View>
            </View>
            <View style={styles.seperator}>

            </View>
            <View style={styles.featuresContentCnt}>
                <View style={styles.featuresBoxRowCnt}>
                    <Text style={styles.featuresBoxRowText1}>Syncronize data</Text>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <Text style={styles.featuresBoxRowText2}>x</Text>
                    </View>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <View style={[styles.featuresBoxRowText2, ]}>
                        <Icon3 name={'infinity'}  color={'#007AFF'} size={18} />
                    </View>
                    </View>
                </View>
                <View style={styles.featuresBoxRowCnt}>
                    <Text style={styles.featuresBoxRowText1}>Weekly Reports</Text>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <Text style={styles.featuresBoxRowText2}>x</Text>
                    </View>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <View style={[styles.featuresBoxRowText2, {backgroundColor: '#007AFF', borderRadius: 15} ]}>
                        <Icon name={'checkmark'}  color={'black'} size={13} />
                    </View>
                    </View>
                </View>
                <View style={styles.featuresBoxRowCnt}>
                    <Text style={styles.featuresBoxRowText1}>Task Specific Pomodoros</Text>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <Text style={styles.featuresBoxRowText2}>x</Text>
                    </View>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <View style={[styles.featuresBoxRowText2, {backgroundColor: '#007AFF', borderRadius: 15} ]}>
                        <Icon name={'checkmark'}  color={'black'} size={13} />
                    </View>
                    </View>
                </View>
                <View style={styles.featuresBoxRowCnt}>
                    <Text style={styles.featuresBoxRowText1}>Different Pomodoro Styles</Text>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <Text style={styles.featuresBoxRowText2}>5</Text>
                    </View>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <View style={[styles.featuresBoxRowText2, {backgroundColor: '#007AFF', borderRadius: 15} ]}>
                        <Icon name={'checkmark'}  color={'black'} size={13} />
                    </View>
                    </View>
                </View>
                <View style={styles.featuresBoxRowCnt}>
                    <Text style={styles.featuresBoxRowText1}>Themes</Text>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <Text style={styles.featuresBoxRowText2}>3</Text>
                    </View>
                    <View style={styles.featuresBoxRowText2Cnt}>
                    <View style={[styles.featuresBoxRowText2, ]}>
                        <Icon3 name={'infinity'}  color={'#007AFF'} size={18} />
                    </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export const SubsBox = ({isBorderDisabled, isThirdRowDisabled, isActive, onPress, txt1, txt2, txt21, txt31}) => (
    <TouchableOpacity style={[styles.subsBox, {borderBottomWidth: isBorderDisabled ? 0 : .2}]} activeOpacity={.7} onPress={onPress}>
        <View style={[styles.iconBox, { backgroundColor: isActive ? 'white' : 'gray', borderColor: isActive ? '#007AFF' : 'gray'}]}>
            <View style={styles.icon}>
            </View>
        </View>
        <View style={styles.subInfoBox}>
            <View style={styles.subRow1}>
                <Text style={styles.subRow1Text1}>{txt1}</Text>
                <Text style={styles.subRow1Text2}>{txt2}</Text>
            </View>
            <Text style={styles.subRow2}>{txt21}</Text>
            <Text style={[styles.subRow3, {height: isThirdRowDisabled ? 0 : 'auto'}]}>{txt31}</Text>
        </View>
    </TouchableOpacity>
)

export const BackButton = ({onPress}) => {

    return (
        <TouchableOpacity activeOpacity={.7} style={styles.backButtonCnt} onPress={onPress}>

            <View style={styles.backButtonIconCnt}>
                <Icon2 name={'angle-left'} size={32} color={'#007AFF'}/>
            </View>
                <View style={styles.backButtonBtnCnt}>
                    
                    <Text style={styles.backButtonBtnTxt}>
                    Back
                    </Text>
                </View>

        </TouchableOpacity>
    )
}

export const AppleButton = ({onPress, isPrimary, txt, color}) => {
    return (
        <TouchableOpacity style={[styles.appleBtnCnt, {backgroundColor: isPrimary ? color : 'black', borderColor: isPrimary ? 'black' : color}]} onPress={onPress}>
            <Text style={[styles.appleBtnTxt, {color : isPrimary ? 'black' : color}]}>
                {txt}lj
            </Text>
        </TouchableOpacity>
    )
}

export const BottomTexts = ({txt1, txt2, txt3}) => {
    return (
        <View>
            <TouchableOpacity style={styles.bottomTxtCnt}>
                <Text style={styles.bottomTxt}>
                    A
                </Text>
                <Text style={styles.bottomTxt}>
                    B
                </Text>
                <Text style={styles.bottomTxt}>
                    C
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    avatarLogo: {
        width: SCREEN_WIDTH * .23,
        height: SCREEN_WIDTH * .23,
        borderRadius: 50,
        alignSelf: 'center',
        marginVertical: 10,
    },
    profileInfo: {
        flexDirection: 'column',
        margin: 30
    },
    avatarName: {
        fontWeight: 500,
        fontSize: 30,
        alignSelf: 'center'
    },
    avatarEmail: {
        fontWeight: 400,
        fontSize: 16,
        alignSelf: 'center'
    },
    seperatorWithTextCnt : {
        height: 5,
        justifyContent: 'center'
    },
    seperatorWithTextLine: {
        height: .2,
        backgroundColor: 'gray',
        opacity: 1,
        width: '%40',
    },
    seperatorWithText: {
            width: '%20',
            alignSelf: 'center',
            color: 'gray',
            opacity: .7,
            opacity: 1,
            fontWeight: 400,
            fontSize: 12
    },
    cardCnt: {
        height: SCREEN_HEIGHT * .05,
        width: SCREEN_HEIGHT * .1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    cardIconCnt : {
        height: SCREEN_HEIGHT * .025,
    },
    cardText: {
        height: SCREEN_HEIGHT * .025,
        fontSize: 12
    },
    cardInfoCnt: {
        height: SCREEN_HEIGHT * .2,
        flexDirection: 'column',
    },
    cardTextCnt: {

    },
    cardInfoText: {
        fontSize: 12
    },
    cardInfoTextScan: {
        fontWeight: 500,
        fontSize: 12
    },
    cardInfoTextInput: {
        height: SCREEN_HEIGHT * .08,
    },
    cardInfoTextInput2: {
        height: SCREEN_HEIGHT * .08,
        width: '%50'
    },
    cardInfoButton: {
        marginTop: 10,
        backgroundColor: 'blue',
        height: SCREEN_HEIGHT * .08,
    },
    caretIconCnt : {
        position: 'absolute',
        left: 30,
        top: 80,
        opacity: 10,
        zIndex: 10
    },
    sheetTitle: {
        fontSize: 27,
        fontWeight: 700,
        color: '#007AFF',
        marginLeft: 15,
        top: 10,
        marginTop: 10,
        backgroundColor: 'black'
    },
    featuresBoxCnt: {
        margin: 15,
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: '#212121',
        flexDirection: 'column',
        borderRadius: 15,
    },
    featuresHeadsCnt: {
        marginLeft: 5,
        marginVertical: 15,
        flexDirection: 'row',
    },
    featuresHeads1: {
        fontSize: 18,
        fontWeight: 600,
        width: '60%',
        color: 'gray'
    },
    featuresHeads2: {
        fontSize: 18,
        fontWeight: 600,
        color: 'gray',
        alignSelf: 'center'
    },
    seperator: {
        marginHorizontal: 1,
        backgroundColor: 'black',
        height: .3
    },
    featuresContentCnt: {
        marginLeft: 5,
        marginVertical: 13,
        flexDirection: 'column'   
    },
    featuresBoxRowCnt: {
        flexDirection: 'row',
        marginVertical: 5
    },
    featuresBoxRowText1: {
        width: '60%',
        fontSize: 15,
        fontWeight: 600,
        alignSelf: 'flex-start',
        color: 'white',
        opacity: .8
    },
    featuresBoxRowText2Cnt: {
        justifyContent: 'center',
        width: '20%',
    },
    featuresBoxRowText2: {
        fontWeight: 600,
        fontSize: 16,
        alignSelf: 'center',
        color: 'gray',
        // opacity: .8
    },
    subsBox: {
        backgroundColor: 'black',
        marginVertical: 5,
        borderBottomColor: 'white',
        borderBottomWidth: .2,
        marginHorizontal: 20,
        flexDirection: 'row',
        paddingBottom: 10
    },
    iconBox: {
        alignSelf: 'center',
        width: '10%',
        backgroundColor: 'white',
        height: SCREEN_HEIGHT/33,
        width: SCREEN_HEIGHT/33,
        borderRadius: 40,
        marginRight: 15,
        borderWidth: 6,
        borderColor: '#007AFF'
    },
    subInfoBox: {
        flexDirection: 'column',
        backgroundColor: 'black',
        width: '90%',
    },
    subRow1: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subRow1Text1: {
        fontSize: 16,
        fontWeight: 600,
        color: 'white'
    },
    subRow1Text2: {
        fontSize: 12,
        fontWeight: 600,
        color: '#007AFF',
        marginLeft: 10
    },
    subRow2: {
        fontSize: 13,
        opacity: .7,
        color: 'gray',
        marginVertical: 2
    },
    subRow3: {
        fontSize: 12,
        fontWeight: 400,
        color: 'white'
        
    },
    backButtonCnt: {
        flexDirection: 'row',
        margin: 12,
        marginBottom: 0,
        justifyContent: 'flex-start',
        zIndex: 1,
        width: '20%',
    },
    backButtonIconCnt: {
        justifyContent: 'center'
    },
    backButtonBtnCnt: {
        justifyContent: 'center',
        zIndex: 0,
        marginLeft: 5
    },
    backButtonBtnTxt: {
        color: '#007AFF',
        fontSize: 18,
        fontWeight: '500',
    },
    appleBtnCnt: {
        height: verticalScale(45),
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 10,
        justifyContent: 'center',
        borderWidth: 1,
    },
    appleBtnTxt: {
        color: 'black',
        fontSize: 17,
        fontWeight: 500,
        alignSelf: 'center'
    },
    bottomTxtCnt: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 15
    },
    bottomTxt: {
        color: 'gray'
    }

})