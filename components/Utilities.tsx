import { Dimensions, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { horizontalScale, verticalScale } from "./Metrics";
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window')

export const FocusSlide = ({mode, minute, seconds, subMin, addMin, opacity}) => {
    return (
    <View style={[styles.focusSlideCnt, {opacity: opacity}]}>
        <View style={styles.focusSlide}>
                <View>
                    <Text style={styles.focusSlideLabel}>{mode}</Text>
                        <View style={styles.timerCnt2}>
                            
                            <TouchableOpacity style={styles.addorsubCnt} onPress={subMin}  activeOpacity={0.8}>
                                <Text style={styles.addorsub}>-  </Text>
                            </TouchableOpacity>


                            <Text style={styles.timer}>
                                {minute}:{seconds}  
                            </Text>
                            
                            <TouchableOpacity style={styles.addorsubCnt} onPress={addMin}  activeOpacity={0.8}>
                                <Text style={styles.addorsub}>  +</Text>
                            
                            </TouchableOpacity>
                        </View>
                </View>
        </View>
    </View>
    )
}

export const FocusButton = ({isAction, onPress, isAction2}) => {
    
    return (
        <TouchableOpacity style={[styles.focusButtonCnt, {opacity: isAction ? 0 : .9, zIndex: isAction ? 0 : 1}]} onPress={onPress}  activeOpacity={0.8}>
            <Text style={styles.focusButtonText}>
                {isAction2 ? 'Pause' : 'Start'}
            </Text>
        </TouchableOpacity>
    )
}

export const FocusButtonPause = ({isAction, isAction2, onPress1, onPress2}) => {
    
    return (
        <View style={styles.focusButtonPauseCntCnt}>
            <TouchableOpacity style={[styles.focusButtonPauseCnt1, {opacity: isAction2 ? .9 : 0, zIndex: isAction2 ? 1 : 0}]} onPress={onPress1}  activeOpacity={0.8}>
                <Text style={styles.focusButtonPauseText1}>
                    Continue
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.focusButtonPauseCnt2, {opacity: isAction2 ? .9 : 0, zIndex: isAction2 ? 1 : 0}]} onPress={onPress2}  activeOpacity={0.8}>
                <Text style={styles.focusButtonPauseText2}>
                    Stop
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export const Header = ({title, color, onPress, isSubtle, opacity, isBorderOk, isSheetOn}) => {
    return (
        <View style={[styles.header, {backgroundColor: color, opacity: opacity, borderBottomColor: 'black', borderBottomWidth: isBorderOk ? .7 : 0}]}>
          <Text style={[styles.haederText2, {opacity: opacity}]}>{title}</Text>
          <TouchableOpacity activeOpacity={isSheetOn ? 1 : .4} onPress={onPress} style={[styles.headerIconCnt, {opacity: isSubtle ? 0 : 1, zIndex: isSubtle ? 0 : 1, }]}>
            <Icon name={'arrow-back'} size={25} color={isSheetOn ? '#02162C' : '#007AFF' }/>
          </TouchableOpacity>
        </View>)
}

export const HeaderButton = ({title, color, onPress, isSubtle}) => {
    return (
        <View style={[styles.headerBtnCnt]}>
            <TouchableOpacity onPress={onPress} style={[styles.headerIconCnt]}>
                <Icon name={'arrow-back'} size={25} color={'#000000'}/>
            </TouchableOpacity>
        </View>
    )
}

export const HeaderButtonRight = ({onPress, isWriting}) => {
    return (
        <View style={[styles.headerBtnRghtCnt]}>
            <TouchableOpacity onPress={onPress} style={[styles.headerIconRghtCnt, {opacity: isWriting ? .8 : .2}]}>
                <Icon2 name={'check'} size={24} color={'#000000'}/>
            </TouchableOpacity>
        </View>
    )
    }

export const Space = ({space}) => (
    <View style={{backgroundColor: 'transparent', marginVertical: verticalScale(space)}}>
    </View>
);

export const ProfileRow = ({onPress, txt, opacity}) => {
    return (
        <TouchableOpacity style={styles.profileCnt} onPress={onPress}  activeOpacity={.95}>
        </TouchableOpacity>
    )
}

export const SettingsCell = ({title, icon, backColor, style, onPress, isLast, isFirst, isLogout, isLogged}) => {
    return (

        <TouchableOpacity style={[styles.cell,style, {borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, opacity: isLogged ? 1 : 0, maxHeight: isLogged? 55 : 0, paddingVertical: isLogged ? 10 : 0}]} onPress={onPress}  activeOpacity={0.8}>
            <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
                <Icon name={icon} size={18} color={'white'}/>
            </View>
            <Text style={[styles.title, {color: isLogout ? 'red' : 'gray', opacity: isLogout ? .8 : 1}]}>{title}</Text> 
            <Icon2 style={[styles.iconArrow, {opacity: isLogout ? 1 : 0}]} color={'#766E6E'} name={'angle-right'} size={20}/>
        </TouchableOpacity>
        
    )
}


export const SettingsCellProfile = ({title, icon, backColor, style, onPress, isLast, isFirst, isLogout, isLogged, center}) => {
    return (
        <View style={{flexDirection: 'column'}}>
        <TouchableOpacity style={[styles.cell,style, {borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, opacity: isLogged ? 1 : 0, maxHeight: isLogged? 55 : 0, paddingVertical: isLogged ? 10 : 0}]} onPress={onPress}  activeOpacity={0.8}>
            <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
                <Icon name={icon} size={18} color={'white'}/>
            </View>
            <View style={[styles.titleCnt,  {justifyContent: 'center', flex: 1}]}>
                
                <Text style={[styles.titleProfile, {color: isLogout ? 'red' : 'gray', opacity: isLogout ? 1 : 1, alignSelf:'center'}]}>
                    {title}
                </Text>

            </View> 
            <Icon2 style={[styles.iconArrow, {opacity: isLogout ? 0 : 1}]} color={'#766E6E'} name={'angle-right'} size={20}/>
        </TouchableOpacity>
        <View style={styles.changeSptProfile}>
        </View>
        </View>)
}

export const SettingsCellLogout = ({title, icon, backColor, style, onPress, isLast, isFirst}) => {
    return (
        <TouchableOpacity style={[styles.cell,style, {borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0}]} onPress={onPress}  activeOpacity={0.8}>
        <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
        <Icon name={icon} size={18} color={'white'}/>
        </View>
        <Text style={[styles.title, {color: 'red', opacity: .8}]}>{title}</Text> 
        {/* <Icon style={styles.iconArrow} name={'caret-forward'} size={22}/> */}
        </TouchableOpacity>
    )
}

export const SettingsCellwText = ({title, icon, iconArrow, backColor, style, onPress, value, isLast, isFirst, isMiddle, isSelected, mode}) => {


    return (
        mode === 2 ? 
        <TouchableOpacity style={[styles.cell,style, {zIndex: 3, borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, borderBottomWidth: 0, backgroundColor: isSelected ? '#111111' : '#1c1c1e'}]} onPress={onPress} activeOpacity={0.6}>
            <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
            </View>
            <Text style={[styles.title, {opacity: .9}]}>{title}</Text> 
            <Text style={[styles.subtitle]}>{value}</Text> 
            <Icon2 style={styles.iconArrow} color={'#766E6E'} name={'angle-right'} size={20}/>
        </TouchableOpacity>
:
        <TouchableOpacity style={[styles.cell,style, {zIndex: 3, borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, borderBottomWidth: 0, backgroundColor: isSelected ? '#111111' : '#1c1c1e'}]} onPress={onPress} activeOpacity={0.6}>
        <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
        </View>
        <Text style={[styles.title]}>{title}</Text> 
        <Text style={[styles.subtitle]}>{value}</Text> 
        <Icon2 style={styles.iconArrow} color={'#766E6E'} name={'angle-right'} size={20}/>
        </TouchableOpacity>
    )
}

export const SettingsCellwSwitch = ({title, icon, backColor, style, onPress, value, onValueChange, isLast, isFirst}) => {
    return (
        <View style={[styles.cell,style, { borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, marginVertical: 0}]} onPress={onPress} >
            <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
            </View>
                <Text style={[styles.title]}>{title}</Text>
                <View style={{marginRight: 20, height: 20, justifyContent: 'center'}}>
                <Switch trackColor={{false: '#767577'}}
                    style={{marginRight: 20}}
                    onValueChange={onValueChange}
                    value={value}/>
        </View>
                    </View> 
    )
}

export const SettingsCellGold = ({title, icon, backColor, style, onPress, txt, isLast, isFirst}) => {
    return (
        <TouchableOpacity style={[styles.cell,style,{ borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0}]} onPress={onPress}  activeOpacity={0.8}>
        <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
        <Icon name={icon} size={18} color={'white'}/>
        </View>
        <Text style={[styles.titleGold]}>{title}</Text> 
        <Icon2 style={styles.iconArrow} color={'#766E6E'} name={'angle-right'} size={20}/>
        </TouchableOpacity>
    )
}

export const BreakCell = ({title, icon, backColor, isLast, onPress, isSelected}) => {
    return (
        <TouchableOpacity style={[styles.cellBreak, {backgroundColor: isSelected ? '#B3AFAE' : '#DCDAD8', borderBottomColor: 'gray', borderBottomWidth: isLast ? 0 : .3}]} onPress={onPress}  activeOpacity={0.3}>
        <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
        <Icon name={icon} size={18} color={'white'}/>
        </View>
        <Text style={[styles.titleBreak]}>{title}</Text>
        <View>
            <Icon style={styles.iconArrow} name={'caret-forward'} size={22} color={'#9F9998'}/>
        </View> 
        </TouchableOpacity>
    )
}

export const ProfileWText = ({title, icon, iconArrow, backColor, style, onPress, value, isLast, isFirst}) => {


    return (
        <TouchableOpacity style={[styles.cell,style, {zIndex: 3, borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0}]} onPress={onPress} activeOpacity={0.8}>
            <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
                <Icon name={icon} size={18} color={'white'}/>
            </View>
            <Text style={[styles.titleProfile]}>{title}</Text> 
            <Text style={[styles.subtitleProfile]}>{value}</Text> 
            <Icon2 style={styles.iconArrow} color={'#766E6E'} name={iconArrow} size={20}/>
        </TouchableOpacity>
    )
}

export const ChangeWText = ({lastname, firstname, onChangeTextSurname, onChangeTextFirstname}) => {


    return (
        <View style={styles.cellChangeCnt}>
            <View style={[styles.cellChange, {zIndex: 3, borderTopLeftRadius: 10, borderTopRightRadius: 10}]} activeOpacity={0.8}>
                <Text style={[styles.cellChangeTitleProfile]}>Last</Text> 

                <TextInput onChangeText={onChangeTextSurname} style={[styles.cellChangeSubtitleProfile]} placeholderTextColor={'white'} defaultValue={lastname}>
                </TextInput>

            </View>

            <View style={styles.changeSpt}>

            </View>

            <View style={[styles.cellChange, {zIndex: 3, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}]} activeOpacity={0.8}>
                <Text style={[styles.cellChangeTitleProfile]}>First</Text> 

                <TextInput onChangeText={onChangeTextFirstname} style={[styles.cellChangeSubtitleProfile]} placeholderTextColor={'white'} defaultValue={firstname}>
                </TextInput>

            </View>

        </View>
    )
}

export const LineBwCell = () => {
    return (
        <View style={{height: .5, backgroundColor: 'gray', flexDirection: 'row', marginHorizontal: 20}}>
            <View style={{height: '100%', backgroundColor: '#212121', width: 40}}>
                
            </View>
            <View style={{height: '100%', backgroundColor: 'gray', width: 60}}>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    pageSettings : {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        zIndex: 0
    },
    pageFocus : {
        height: SCREEN_HEIGHT,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingBottom: verticalScale(50),
        position: 'absolute'
    },
    pageSign : {
        height: SCREEN_HEIGHT,
        backgroundColor: '#1c1c1e',
        paddingBottom: verticalScale(50),
    },
    pageBreak : {
        backgroundColor: 'black',
        flex: 1
    },
    pageFocusImage : {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: 'white',
        position: 'absolute'
    },
    pageProfile : {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: 'gray',
    },
    pageProfileScrollCnt : {
        flex: 1,
        backgroundColor: 'black'
    },
    pageProfileScroll : {
        justifyContent: 'space-between',
        flex: 1,
    },
    focusSlideCnt:{
        width: SCREEN_WIDTH,
        height: SCREEN_WIDTH * .7,
        backgroundColor: 'transparent',
        borderRadius: SCREEN_WIDTH * .2,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: verticalScale(40),
        position: 'relative',
        top: 200
    },
    focusSlide:{
        width: SCREEN_WIDTH * .7,
        height: SCREEN_WIDTH * .7,
        borderRadius: SCREEN_WIDTH * .2,
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: verticalScale(40),
        opacity: .8
    },
    focusSlideLabel: {
        position: 'absolute',
        bottom: SCREEN_WIDTH * .2,
        alignSelf: 'center',
        color: '#0D0D0C',
        fontSize: 22,
        fontWeight: 400,
        opacity: 0
    },
    timerCnt : {
        height: horizontalScale(50),
        justifyContent: 'center',
    },
    timerCnt2 : {
        justifyContent: 'center',
        flexDirection: 'row',
    },
    addorsub : {
        color: 'gray',
        fontSize: horizontalScale(40),
        alignSelf: 'center',
        opacity: .7,
    },
    addorsubCnt : {
        justifyContent: 'center'
    },
    timer : {
        color: 'white',
        fontSize: horizontalScale(90),
        height: horizontalScale(100),
        alignSelf: 'center',
        fontWeight: 300,
    },
    focusButtonCnt : {
        width: horizontalScale(150),
        backgroundColor: '#212121',
        height: verticalScale(60),
        borderRadius: horizontalScale(25),
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom:SCREEN_WIDTH/4,
    },
    focusButtonText: {
        fontSize: 20,
        fontWeight: 500,
        color: 'white',
        alignSelf: 'center'
    },
    focusButtonPauseCntCnt : {
        width: SCREEN_WIDTH * .6,
        height: verticalScale(60),
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom:SCREEN_WIDTH/4,
        flexDirection: 'row',
        marginHorizontal: horizontalScale(40)
    },
    focusButtonPauseCnt1 : {
        width: horizontalScale(120),
        backgroundColor: '#F3F3F3',
        height: verticalScale(60),
        borderRadius: horizontalScale(25),
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: horizontalScale(20)
    },
    focusButtonPauseText1: {
        fontSize: 18,
        fontWeight: 500,
        color: '#212121',
        alignSelf: 'center'
    },
    focusButtonPauseCnt2 : {
        width: horizontalScale(120),
        backgroundColor: '#212121',
        height: verticalScale(60),
        borderRadius: horizontalScale(25),
        justifyContent: 'center',
        alignSelf: 'center',
        marginHorizontal: horizontalScale(20)
    },
    focusButtonPauseText2: {
        fontSize: 18,
        fontWeight: 500,
        color: 'white',
        alignSelf: 'center'
    },
    header: {
        height: 45,
        justifyContent: 'center',
        backgroundColor: 'white',
      },
      haederText1: {
        color: 'white',
        fontSize: 17,
        fontWeight: 600,
        alignSelf: 'center',
        top: 9,
      },
      haederText2: {
        color: 'white',
        fontSize: 17,
        fontWeight: 600,
        alignSelf: 'center',
        top: 14
      },
      headerIconCnt : {
        left: 25,
        bottom: 9        
      },
      headerButtonCnt: {
      marginTop: 22,
      left: 40,
      position: 'absolute',
      justifyContent: 'center',
      top: 3
    },
      headerButton: {
        color: '#007AFF', 
        fontSize: 30, 
        justifyContent: 'center',
        opacity: .7
    },
      headerButtonCnt2: {
        color: '#1640EA', 
        fontSize: 15, 
        backgroundColor: 'transparent',
        position: 'absolute',
        height: 120,
        justifyContent: 'center'
      },
      headerButton2: {
        color: 'red', 
        fontSize: 15, 
      },
      headerBtnCnt: {
        marginHorizontal: 20,
        top: 18
      },
      headerBtnRghtCnt: {
        marginHorizontal: 20,
        position: 'absolute',
        right: 5,
        top: getStatusBarHeight(),
        height: 45,
        justifyContent: 'center'
    },
    headerIconRghtCnt : {
        
      },
      profileCnt : {
        height: verticalScale(100),
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#1c1c1e',
        marginHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
      },
      avatarCnt: {
        width: '20%',
        justifyContent: 'center',
      },
      avatar : {
        backgroundColor: 'black',
        height: horizontalScale(60),
        width: '90%',
        alignSelf: 'center',
        borderRadius: 70,
        marginLeft: 10
      },
      textCnt : {
        width: '70%',
        justifyContent: 'center',
        left: 20
    },
      textProfileAuth : {
        fontSize: 21,
        fontWeight: 500,
        marginBottom: 2,
        opacity: .9,
        color: 'white',
      },
      textProfile : {
        color: '#EDEDEC',
        opacity: 1
      },
      iconCnt : {
        width: '10%',
        justifyContent: 'center'
      },
      cell: {
        paddingVertical: 10,
        backgroundColor: '#1c1c1e',
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: verticalScale(55),
        zIndex: 1,
        marginHorizontal: 20,
    },
    title: {
        fontSize: 15,
        marginStart: 16,
        fontWeight: 500,
        flex: 1,
        color: 'white'
    },
    titleProfile: {
        fontSize: 15,
        fontWeight: 600,
        color: 'gray'
    },
    cellBreak: {
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: verticalScale(55),
    },
    titleBreak: {
        fontSize: 17,
        marginStart: 16,
        fontWeight: 500,
        flex: 1,
        color: 'gray'
    },
    titleGold: {
        fontSize: 17,
        marginStart: 16,
        fontWeight: 500,
        flex: 1,
        color: '#f48c06'
    },
    subtitle : {
        fontSize: 14,
        opacity: .9,
        marginEnd: 15,
        color: '#EDEDEC'
    },
    rowIcon: {borderWidth: 0, padding:3, borderRadius: 6, marginLeft: 20}, 
    iconArrow: {marginRight: 20},
    cellTxt : {fontSize: 13, color: 'gray'},
    titleProfile: {
        fontSize: 16,
        marginStart: 16,
        fontWeight: 500,
        flex: 1,
        color: 'white'
    },
    subtitleProfile : {
        fontSize: 18,
        opacity: .9,
        marginEnd: 15,
        color: '#766E6E'
    },
    cellChange: {
        paddingVertical: 10,
        backgroundColor: '#212121',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxHeight: verticalScale(55),
        zIndex: 1,
    },
    cellChangeCnt: {
        flexDirection: 'column',
        backgroundColor: '#212121',
        width: '90%',
        alignSelf: 'center',
        borderTopLeftRadius: 10, borderTopRightRadius: 10,
        borderBottomLeftRadius: 10, borderBottomRightRadius: 10,
    },
    changeSpt : {
        height: .2,
        backgroundColor: '#B3AFAE',
        marginLeft: 20,
    },
    changeSptProfile : {
        height: .2,
        backgroundColor: '#B3AFAE',
        marginLeft: 40,
    },
    cellChangeTitleProfile: {
        fontSize: 16,
        marginStart: 20,
        fontWeight: 500,
        color: 'white',
        width: '30%',
    },
    cellChangeSubtitleProfile : {
        fontSize: 18,
        opacity: .9,
        marginEnd: 25,
        color: 'white',
        width: '60%',
    },

})