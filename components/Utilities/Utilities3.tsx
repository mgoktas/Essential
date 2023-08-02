import { Button, Image, ImageBackground, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Entypo'
import IconF from 'react-native-vector-icons/Feather'
import { horizontalScale, verticalScale } from "../Metrics";
import { LineBwCell, SCREEN_HEIGHT, SCREEN_WIDTH, Space } from "./Utilities";
import { GestureHandlerRootView, TouchableHighlight } from "react-native-gesture-handler";
import { useCallback } from "react"
import { termsofservice } from "../Storage/Data"

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

export const CaretIcon = ({onPress, isLeft, isRight, icon, mode}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.caretIconCnt}>
            <Icon3 color='#007AFF' name={icon} size={32}/>
        </TouchableOpacity>        
    )
}

export const CaretIcon2 = ({onPress, isTaskModeOn, isDoroModeOn}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.caretIconCnt2}>
            <IconF color='#007AFF' name={'rotate-cw'} size={28}/>
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

export const AvatarLogo = ({avatar, fullname, email, onPress, isSheetOn, isDarkModeOn}) => {
    return ( 
        <View style={[styles.profileInfo, {opacity: isSheetOn ? .6 : 1, backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'}]}>
            <TouchableOpacity onPress={onPress} activeOpacity={.8} style={[styles.avatarLogo, {backgroundColor: avatar}]}>
                <View style={[styles.avatarLogoEdit, {backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'}]}>
                <Text style={[styles.avatarLogoEditTxt, {color: isDarkModeOn ? 'gray' : '#1c1c1e'}]}>
                        EDIT
                </Text>
                </View>
            </TouchableOpacity>
            <Text style={[styles.avatarName, {color: isSheetOn ? 'gray' : isDarkModeOn ? 'white' : 'black'}]}> 
            {fullname}
            </Text>
            <Text style={styles.avatarEmail}> 
            {email}
            </Text>
        </View>
    )
}

export const SheetTitle = ({isDarkModeOn}) => {
    return (
        <Text style={[styles.sheetTitle, {backgroundColor : isDarkModeOn ? 'black' : '#f2f2f6'}]}>
            Unlock Everything
        </Text>
    )
}

export const FeaturesBox = ({isDarkModeOn}) => {
    return (
        <View style={[styles.featuresBoxCnt, { backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]}>
            <View style={styles.featuresHeadsCnt}>
                <Text style={[styles.featuresHeads1]}>Features</Text>
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
                    <Text style={[styles.featuresBoxRowText1, {color: isDarkModeOn ? 'white' : 'black'}]}>Syncronize data</Text>
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
                    <Text style={[styles.featuresBoxRowText1, {color: isDarkModeOn ? 'white' : 'black'}]}>Weekly Reports</Text>
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
                    <Text style={[styles.featuresBoxRowText1, {color: isDarkModeOn ? 'white' : 'black'}]}>Task Specific Pomodoros</Text>
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
                    <Text style={[styles.featuresBoxRowText1, {color: isDarkModeOn ? 'white' : 'black'}]}>Different Pomodoro Styles</Text>
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
                    <Text style={[styles.featuresBoxRowText1, {color: isDarkModeOn ? 'white' : 'black'}]}>Themes</Text>
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

export const SubsBox = ({isBorderDisabled, isThirdRowDisabled, isActive, onPress, txt1, txt2, txt21, txt31, isDarkModeOn}) => (
    <TouchableOpacity style={[styles.subsBox, {borderBottomWidth: isBorderDisabled ? 0 : .2, backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'}]} activeOpacity={.7} onPress={onPress}>
        <View style={[styles.iconBox, { backgroundColor: isActive ? 'white' : 'gray', borderColor: isActive ? '#007AFF' : 'gray'}]}>
            <View style={styles.icon}>
            </View>
        </View>
        <View style={[styles.subInfoBox, {backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'}]}>
            <View style={styles.subRow1}>
                <Text style={[styles.subRow1Text1, {color: isDarkModeOn ? 'white' : '#1c1c1e'}]}>{txt1}</Text>
                <Text style={[styles.subRow1Text2]}>{txt2}</Text>
            </View>
            <Text style={styles.subRow2}>{txt21}</Text>
            <Text style={[styles.subRow3, {height: isThirdRowDisabled ? 0 : 'auto', color: isDarkModeOn ? 'white' : '#1c1c1e'}]}>{txt31}</Text>
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

export const AppleButton = ({onPress, isPrimary, txt, color, isDarkModeOn, isOnTask, mode}) => {
    return (
        <TouchableOpacity activeOpacity={.4} style={[styles.appleBtnCnt, {backgroundColor: isPrimary ? color : isDarkModeOn ? 'black' : 'white', borderColor: isOnTask ? 'white' : isPrimary ? 'white' : color,marginHorizontal : mode === 2 ? 100 : 20}]} onPress={onPress}>
            <Text style={[styles.appleBtnTxt, {color : isPrimary && !isDarkModeOn ? 'white' : isDarkModeOn ? 'white' : color}]}>
                {txt}
            </Text>
        </TouchableOpacity>
    )
}

export const AppleButtonWithHighlight = ({onPress, isPrimary, txt, color, isDarkModeOn, isOnTask, didClick}) => {
    return (
        <GestureHandlerRootView>
            <TouchableHighlight onPress={onPress} style={[styles.appleBtnCnt, {backgroundColor: isPrimary ? color : isDarkModeOn ? 'black' : 'white', borderColor: isOnTask ? 'white' : isPrimary ? 'black' : color, display: didClick ? 'none' : 'flex'}]}  activeOpacity={1} underlayColor={'#B9B9BB'}>
                <Text style={[styles.appleBtnTxt, {color : isPrimary && !isDarkModeOn ? 'white' : isDarkModeOn ? 'white' : color}]}>
                    {txt}
                </Text>
            </TouchableHighlight>
        </GestureHandlerRootView>
    )
}

{/* <TouchableHighlight onPress={onPress} style={[styles.cell,{ borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, borderBottomWidth: 0, zIndex: 10, opacity: 10, backgroundColor : !isSheetOn && !isDarkModeOn ? 'white' : isSheetOn && !isSelected ? 'gray' : isSheetOn && isSelected ? '#f2f2f6' : isSheetOn && !isDarkModeOn ? 'gray' : isSelected && isDarkModeOn ? '#39393A' : isDarkModeOn ? '#1c1c1e' : 'white',display: isAddOn ? 'none' : 'flex'}]}  activeOpacity={1} underlayColor={isDarkModeOn ? '#131314' : '#DDDCDF'}>
            
<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
    <Text style={[styles.cellWTextTxt1, {left: isProfile ? 25 : 25, color: isPremium ? '#f48c06' : 'white', color: isDarkModeOn ? 'white' : 'black'}]} >{title}</Text> 
    <View style={{flexDirection: 'row'}}>
        <Text style={[styles.cellWTextTxt2, {fontSize: isProfile ? 24 : 14, color: isTasksOn ? 'gray' : !isDarkModeOn ? '#1c1c1e' : '#EDEDEC'}]}>{value}</Text>  
        <Icon2 style={styles.iconArrow} color={'#766E6E'} name={iconArrow} size={20}/>
    </View>
    <View style={{display: isTaskDone ? 'flex' : 'none', position: 'absolute', right: -5}}>
        <Icon2 name={'check'} size={24} color={ '#007AFF'}/>
    </View>
</View>

</TouchableHighlight> */}

export const BottomTexts = ({txt1, txt2, txt3, onPress1, onPress2, onPress3, isRestore}) => {




    return (
        <View>
            <View style={styles.bottomTxtCnt}>
                <TouchableOpacity style={{display: isRestore ? 'flex' : 'none'}} onPress={onPress1}>
                    <Text style={styles.bottomTxt}>
                        {txt1}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={onPress2}>
                    <Text style={styles.bottomTxt}>
                        {txt2}
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={onPress3}>
                    <Text style={styles.bottomTxt}>
                        {txt3}
                    </Text>
                </TouchableOpacity>
            
            </View>
        </View>
    )
}

export const SubsBoxProfile = ({txt1, txt2, txt3, isDarkModeOn}) => {

    const imageSource = require('../images/icon/180.png')

    return (
        <TouchableOpacity activeOpacity={1} style={[styles.subsBoxProfileCnt, {backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]}>


            <View  style={styles.appIconCnt} >
                <Image style={styles.appIcon} source={imageSource}>
                </Image>
            </View>


            <View style={styles.appInfoCnt} >
                <Text style={[styles.appInfoTxt1, {color: isDarkModeOn ? 'white' : 'black'}]}>{txt1}</Text>
                <Text style={styles.appInfoTxt2}>{txt2}</Text>
                <Text style={styles.appInfoTxt3}>{txt3}</Text>
            </View>
            
            {/* <Icon2 style={styles.iconCaret} color={'#766E6E'} name={'angle-right'} size={25}/> */}


        </TouchableOpacity>
    )
}

export const TextButtonSh = ({title1, title2, title3, title4, isFirst, isLast, onPress1, onPress2, onPress3, onPress4, isDarkModeOn}) => {
    return (

        <View style={{opacity: 10, zIndex: 10}}>
            <TouchableOpacity
                activeOpacity={.8}
                onPress={onPress1}
                style={[styles.textButtonCnt, {
                borderTopLeftRadius: isFirst ? 10 : 0,
                borderTopRightRadius: isFirst ? 10 : 0, backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]}>
                <Text style={styles.textButtonTxt}>
                    {title1}
                </Text>
            </TouchableOpacity>
            <LineBwCell isFull={true}/>
            <TouchableOpacity 
            activeOpacity={.8}
            onPress={onPress2}
            style={[styles.textButtonCnt, {
                 backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]}>
            <Text style={styles.textButtonTxt}>
                {title2}
            </Text>
            </TouchableOpacity>
            <LineBwCell isFull={true}/>
            <TouchableOpacity 
                activeOpacity={.8}
                onPress={onPress3}
                style={[styles.textButtonCnt, {
                borderBottomEndRadius: isLast ? 10 : 0, 
                borderBottomStartRadius: isLast ? 10 : 0,
                backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'
                }]}>
                <Text style={styles.textButtonTxt}>
                    {title3}
                </Text>
            </TouchableOpacity>

            <Space space={5}/>

            <TouchableOpacity 
                activeOpacity={.8}
                onPress={onPress4}
                style={[styles.textButtonCnt, {
                borderTopLeftRadius: isFirst ? 10 : 0,
                borderTopRightRadius: isFirst ? 10 : 0,
                borderBottomEndRadius: isLast ? 10 : 0, 
                borderBottomStartRadius: isLast ? 10 : 0,
                backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'
                }]}>
                <Text style={styles.textButtonTxt}>
                    {title4}
                </Text>
            </TouchableOpacity>
        </View>

    )
}

export const ButtonWSheet = ({btn1, btn2, onPress1, onPress2, isDarkModeOn}) => {
    return (
        <View style={[styles.buttonWSheetCnt, {backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]}>

            <TouchableOpacity onPress={onPress1}>
                <Text style={styles.buttonWSheetTxt1}>{btn1}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onPress2}>
                <Text style={styles.buttonWSheetTxt2}>{btn2}</Text>
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
    avatarLogoEdit: {
        width: SCREEN_WIDTH * .29,
        height: SCREEN_WIDTH * .04,
        borderRadius: 50,
        alignSelf: 'center',
        zIndex: 2,
        opacity: 2,
        backgroundColor: 'black',
        marginTop: 'auto',
        justifyContent: 'center'
    },
    avatarLogoEditTxt: {
        alignSelf: 'center',
        color: 'gray',
        fontSize: 12
    },
    profileInfo: {
        flexDirection: 'column',
        margin: 30
    },
    avatarName: {
        fontWeight: '500',
        fontSize: 28,
        alignSelf: 'center',
        color: 'white'
    },
    avatarEmail: {
        fontWeight: '500',
        fontSize: 16,
        alignSelf: 'center',
        color: 'gray'
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
        top: 119,
        opacity: 10,
        zIndex: 10,
        left: SCREEN_WIDTH - 50
    },
    caretIconCnt2 : {
        position: 'absolute',
        top: 120,
        opacity: 10,
        zIndex: 10,
        left: 24
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
        height: 45,
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
        color: 'gray',
        fontSize: 12
    },
    textButtonCnt: {
        // marginHorizontal: 
        height: verticalScale(60),
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#1c1c1e',
    },
    textButtonTxt: {
        fontSize: 25,
        fontWeight: '400',
        alignSelf: 'center',
        color: '#007AFF'
    },
    subsBoxProfileCnt: {
        height: 80,
        marginHorizontal:10,
        flexDirection: 'row',
        backgroundColor: '#1c1c1e',
        borderRadius: 10
    },
    appIconCnt: {
        margin: 15,
        borderRadius: 3,
        justifyContent: 'center'
    },
    appIcon : {
        height: 40,
        width: 40,
        borderRadius: 10,
        marginVertical: 'auto'
    },
    appInfoCnt: {
        marginVertical: 5,
        justifyContent: 'center',
        flexDirection: 'column'
    },
    appInfoTxt1: {
        color: 'white',
        fontSize: 17,
        fontWeight: '400'
    },
    appInfoTxt2: {
        color: '#f48c06',
        fontSize: 15,
        fontWeight: '400'
    },
    appInfoTxt3: {
        color: '#C7372F',
        fontSize: 15,
        fontWeight: '400'
    },
    iconCaret: {
        alignSelf: 'center',
        marginLeft: 'auto',
        marginRight: 20
    },
    buttonWSheetCnt: {
        justifyContent: 'space-between', 
        flexDirection: 'row',
        marginHorizontal: 20,
        backgroundColor: '#1c1c1e',
        // paddingVertical: 40
    },
    buttonWSheetTxt1: {
        color: '#007AFF',
        fontSize: 17
    },
    buttonWSheetTxt2: {
        color: 'red',
        fontSize: 17,
        fontWeight: '600'
    }
})