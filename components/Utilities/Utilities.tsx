import { Animated, Dimensions, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import { horizontalScale, verticalScale } from "../Metrics";
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/FontAwesome'
import Icon3 from 'react-native-vector-icons/Entypo'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useRef } from "react";
import { TouchableHighlight, GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window')


export const FocusSlide = ({mode, minute, seconds, subMin, addMin, opacity, hide}) => {
    return (
    <View style={[styles.focusSlideCnt, {opacity: opacity}]}>
        <View style={styles.focusSlide}>
                <View>
                    <Text style={styles.focusSlideLabel}>{mode}</Text>
                        <View style={styles.timerCnt2}>
                            
                            <TouchableOpacity style={[styles.addorsubCnt, {display: hide ? 'none' : 'flex'}]} onPress={subMin}  activeOpacity={0.8}>
                                <Text style={styles.addorsub}>-  </Text>
                            </TouchableOpacity>


                            <Text style={[styles.timer, {fontWeight: '100'}]}>
                                {minute}:{seconds}  
                            </Text>
                            
                            <TouchableOpacity style={[styles.addorsubCnt,  {display: hide ? 'none' : 'flex'}]} onPress={addMin}  activeOpacity={0.8}>
                                <Text style={styles.addorsub}>  +</Text>
                            
                            </TouchableOpacity>
                        </View>
                </View>
        </View>
    </View>
    )
}

export const FocusSlideTask = ({mode, minute, seconds, subMin, addMin, opacity, hide, taskChosen, isChoosingTheTask}) => {
    return (
    <View style={[styles.focusSlideCnt, {opacity: taskChosen ? 1 : 0, zIndex: taskChosen ? 1 : 0,display: isChoosingTheTask ? 'none' : 'flex'}]}>
        <View style={styles.focusSlide}>
                <View>
                    <Text style={styles.focusSlideLabel}>{mode}</Text>
                        <View style={styles.timerCnt2}>
                            
                            <TouchableOpacity style={[styles.addorsubCnt, {display: hide ? 'none' : 'flex'}]} onPress={subMin}  activeOpacity={0.8}>
                                <Text style={styles.addorsub}>-  </Text>
                            </TouchableOpacity>


                            <Text style={[styles.timer, {fontWeight: '100'}]}>
                                {minute}:{seconds}  
                            </Text>
                            
                            <TouchableOpacity style={[styles.addorsubCnt,  {display: hide ? 'none' : 'flex'}]} onPress={addMin}  activeOpacity={0.8}>
                                <Text style={styles.addorsub}>  +</Text>
                            
                            </TouchableOpacity>
                        </View>
                </View>
        </View>
    </View>
    )
}

export const FocusButton = ({isAction, onPress, isAction2, isLoading, taskChosen, taskMode}) => {
    
    return (
        <TouchableOpacity style={[styles.focusButtonCnt, {opacity: isAction ? 0 : .9, zIndex: isAction ? 0 : 1, left: !isLoading ? SCREEN_WIDTH/2.8 : 'auto'}]} onPress={onPress}  activeOpacity={0.8}>
            <Text style={styles.focusButtonText}>
                {isAction2 ? 'Pause' : taskChosen ? 'Start Task' : 'Start'}
            </Text>
        </TouchableOpacity>
    )
}

export const FocusButtonTask = ({isAction, onPress, isAction2, isLoading, taskChosen, taskMode}) => {
    
    return (
        <TouchableOpacity style={[styles.focusButtonCnt, {opacity: isAction ? 0 : taskChosen ? .9 :  0, zIndex: isAction ? 0 : 1, left: !isLoading ? SCREEN_WIDTH/2.8 : 'auto',}]} onPress={onPress}  activeOpacity={0.8}>
            <Text style={styles.focusButtonText}>
                {isAction2 ? 'Pause' : taskChosen ? 'Start Task' : 'Start'}
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

export const Header = ({mode, title, color, onPress, isSubtle, opacity, isBorderOk, isSheetOn, isWriting, isOnChange, isDarkModeOn, onPress2, isOnTask, isAddOn, isAddOn0}) => {


    return (

        mode === 'pwc'  ?
    <View style={[styles.header, {backgroundColor: color, opacity: isSheetOn ? .7 : 1, borderBottomColor: 'black', borderBottomWidth: isBorderOk ? .7 : 0}]}>
        <Text style={[styles.haederText2, {opacity: opacity, color: isSheetOn ? 'gray' : isDarkModeOn ? 'white' : 'black'}]}>{title}</Text>
        <TouchableOpacity activeOpacity={isSheetOn ? .5 : .4} onPress={isSheetOn ? ()=>{} : onPress} style={[styles.headerIconCnt, {opacity: isSheetOn ? .5 : 1, zIndex: isSubtle || isSheetOn ? 0 : 1, }]}>
          <Icon name={'arrow-back'} size={25} color={isSheetOn ? 'gray' : '#007AFF' }/>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={!isOnChange ? 0 : .6} onPress={onPress2} style={[styles.headerIconCnt2, {right: 30, display: isWriting? 'flex' : 'none'}]}>
              <Icon2 name={isOnTask && !isAddOn ? 'plus' : 'check'} size={24} color={isSheetOn && isOnTask ? 'gray' : isOnTask && !isAddOn ? '#f48c06' : '#007AFF'}/>
          </TouchableOpacity>
    </View>
        :
    <View style={[styles.header, {backgroundColor: color, opacity: isSheetOn ? .7 : 1, borderBottomColor: 'black', borderBottomWidth: isBorderOk ? .7 : 0}]}>
          <Text style={[styles.haederText2, {opacity: opacity, color: isSheetOn ? 'gray' : isDarkModeOn ? 'white' : 'black'}]}>{title}</Text>
          <TouchableOpacity activeOpacity={isSheetOn ? .5 : .4} onPress={isSheetOn ? ()=>{} : onPress} style={[styles.headerIconCnt, {opacity: isSheetOn ? .5 : 1, zIndex: isSubtle || isSheetOn ? 0 : 1, }]}>
            <Icon name={'arrow-back'} size={25} color={isSheetOn ? 'gray' : '#007AFF' }/>
          </TouchableOpacity>
            <View style={{opacity: isWriting ? 1 : 0}}>
          <TouchableOpacity activeOpacity={!isOnChange ? 0 : .6} onPress={onPress2} style={[styles.headerIconCnt2, {opacity: isSubtle || !isOnChange ? 0 : 1, zIndex: isSubtle ? 0 : 1, display: isAddOn0 ? 'none' : 'flex'}]}>
                <Icon2 name={isOnTask && !isAddOn ? 'plus' : 'check'} size={24} color={isSheetOn && isOnTask ? 'gray' : isOnTask && !isAddOn ? '#f48c06' : '#007AFF'}/>
            </TouchableOpacity>
            </View>
    </View>
        )
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

export const HeaderButtonRight = ({onPress, isWriting, isDarkModeOn}) => {
    return (
        <View style={[styles.headerBtnRghtCnt, {backgroundColor: isDarkModeOn ? 'white' : 'black'}]}>
            <TouchableOpacity onPress={onPress} style={[styles.headerIconRghtCnt, {opacity: isWriting ? .8 : 0}]}>
                <Icon2 name={'check'} size={24} color={'#007AFF'}/>
            </TouchableOpacity>
        </View>
    )
    }

export const Space = ({space, isDate}) => (
    <View style={{backgroundColor: 'transparent', marginVertical:isDate ? 0 : verticalScale(space),}}>
    </View>
);

export const ProfileRow = ({onPress, txt, opacity, avatar, isDarkModeOn}) => {
    return (
        <TouchableOpacity style={[styles.profileCnt, {backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]} onPress={onPress} activeOpacity={1}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.avatarCnt}>
                    <View style={[styles.avatar, {backgroundColor: avatar}]}>
                        
                    </View>
                </View>
                <View style={styles.textCnt}>
                    <Text style={[styles.textProfileAuth, {opacity: opacity, color: isDarkModeOn ? 'white' : 'black'}]}>
                    {txt}
                    </Text>
                    <Text style={[styles.textProfile, {color: isDarkModeOn ? 'gray' : '#1c1c1e'}]}>
                        Save your doros!
                    </Text>
                </View>
            </View>
            
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


export const SettingsCellProfile = ({title, icon, backColor, style, onPress, isLast, isFirst, isLogout, isLogged, type, flexStart, isSheetOn, isDarkModeOn}) => {
    return (
        <View style={{flexDirection: 'column', opacity: isSheetOn ? .6 : 1}}>
        <TouchableOpacity style={[styles.cell,style, {borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, opacity: isLogged ? 1 : 0, maxHeight: isLogged? 55 : 0, paddingVertical: isLogged ? 10 : 0, backgroundColor: isDarkModeOn ? '#1C1C1E' : 'white'}]} onPress={onPress}  activeOpacity={0.8}>
            <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
                <Icon name={icon} size={18} color={'white'}/>
            </View>
            <View style={[styles.titleCnt,  {justifyContent: flexStart ? 'flex-start' : 'center', flex: 1}]}>
                
                <Text style={[styles.titleProfile, {color: type , opacity: isLogout ? 1 : 1, alignSelf: flexStart ? 'flex-start' : 'center', marginStart: flexStart ? 0 : 16}]}>
                    {title}
                </Text>

            </View> 
            <Icon2 style={[styles.iconArrow, {opacity: isLogout ? 0 : 1}]} color={'#766E6E'} name={'angle-right'} size={20}/>
        </TouchableOpacity>
        {/* <View style={styles.changeSptProfile}>
        </View> */}
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

export const SettingsCellwText = ({title, isPremium, isProfile, iconArrow, onPress, value, isTasksOn, isLast, isFirst, isDarkModeOn, isSelected, isAddOn, isTasks, isSheetOn, isTaskDone}) => {


    return (
     <GestureHandlerRootView>
         <TouchableHighlight onPress={onPress} style={[styles.cell,{ borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, borderBottomWidth: 0, zIndex: 10, opacity: 10, backgroundColor : !isDarkModeOn && isSheetOn && isTasks && isSelected ? '#6F6F70' : isTasks && isSelected && isSheetOn ? '#3D3D3F' : !isSheetOn && !isDarkModeOn && isSelected ? '#e8e8fa' : isSheetOn && isDarkModeOn && isTasks ? '#2D2D2E' : isSheetOn && !isSelected ? 'gray' : isSheetOn && isSelected ? '#f2f2f6' : isSheetOn && !isDarkModeOn ? 'gray' : isSelected && isDarkModeOn ? '#39393A' : isDarkModeOn ? '#1c1c1e' : 'white', display: isAddOn ? 'none' : 'flex'}]}   activeOpacity={1} underlayColor={isDarkModeOn ? '#131314' : '#DDDCDF'}>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', opacity: isSheetOn && isTasks ? .7 : 1}}>
                <Text style={[styles.cellWTextTxt1, {left: isProfile ? 25 : 25, color: isPremium ? '#f48c06' : 'white', color: isDarkModeOn ? 'white' : 'black'}]} >{title}</Text> 
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.cellWTextTxt2, {fontSize: isProfile ? 24 : 14, color: isTasksOn ? 'gray' : !isDarkModeOn ? '#1c1c1e' : '#EDEDEC'}]}>{value}</Text>  
                    <Icon2 style={styles.iconArrow} color={'#766E6E'} name={iconArrow} size={20}/>
                </View>
                <View style={{display: isTaskDone ? 'flex' : 'none', position: 'absolute', right: -5}}>
                    <Icon2 name={'check'} size={24} color={ '#007AFF'}/>
                </View>
            </View>

        </TouchableHighlight>
     </GestureHandlerRootView>

    )
}

// export const AppleButtonWithHighlight = ({onPress, isPrimary, txt, color, isDarkModeOn, isOnTask}) => {
export const AppleButtonWithHighlight = ({title, isPremium, isProfile, iconArrow, backColor, style, onPress, value, isTasksOn, isLast, isFirst, isDarkModeOn, isSelected, isAddOn, isTasks, isSheetOn, isTaskDone}) => {
    return (
        <GestureHandlerRootView>
<TouchableHighlight onPress={onPress} style={[styles.cell,{ borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, borderBottomWidth: 0, zIndex: 10, opacity: 10, backgroundColor : !isSheetOn && !isDarkModeOn ? 'white' : isSheetOn && !isSelected ? 'gray' : isSheetOn && isSelected ? '#f2f2f6' : isSheetOn && !isDarkModeOn ? 'gray' : isSelected && isDarkModeOn ? '#39393A' : isDarkModeOn ? '#1c1c1e' : 'white',display: isAddOn ? 'none' : 'flex',}]}  activeOpacity={1} underlayColor={isDarkModeOn ? '#131314' : '#DDDCDF'}>
            
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

        </TouchableHighlight>
    </GestureHandlerRootView>
        // <TouchableHighlight onPress={onPress} style={[styles.appleBtnCnt, {backgroundColor: isPrimary ? color : isDarkModeOn ? 'black' : 'white', borderColor: isOnTask ? 'white' : isPrimary ? 'black' : color, opacity: 100, zIndex: 100}]}  activeOpacity={.1} underlayColor={'black'}>
        //     <Text style={[styles.appleBtnTxt, {color : isPrimary && !isDarkModeOn ? 'white' : isDarkModeOn ? 'white' : color,}]}>
        //         {txt}
        //     </Text>
        // </TouchableHighlight>
    )
}

export const Textt = ({title, value}) => {
    return (
        <View>
            
        </View>
    )
}

export const SettingsCellwSwitch = ({title, icon, backColor, style, onPress, value, onValueChange, isLast, isFirst, isDarkModeOn }) => {
    return (
        <View style={[styles.cell,style, { borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, marginVertical: 0, backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]} onPress={onPress} >
            <View style={[styles.rowIcon ,{backgroundColor: backColor}]}>
                </View>
                    <Text style={[styles.title, {color: isDarkModeOn ? 'white' : 'black', fontWeight: '400', fontSize: 16}]}>{title}</Text>
                <View style={{marginRight: 20, height: 20, justifyContent: 'center'}}>
                    <Switch trackColor={{false: '#767577'}}
                        style={{marginRight: 0}}
                        onValueChange={onValueChange}
                        value={value}/>
            </View>
        </View> 
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

export const ProfileWText = ({title, isPremium, isProfile, iconArrow, onPress, value, isLast, isFirst, isSheetOn, isDarkModeOn}) => {


    return (
    <GestureHandlerRootView>
        <TouchableHighlight onPress={onPress} style={[styles.cell,{ borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, borderBottomWidth: 0, zIndex: 10, opacity: 10, backgroundColor: isSheetOn && isDarkModeOn  ? '#171717' : isDarkModeOn ? '#1c1c1e' : 'white'}]}  activeOpacity={1} underlayColor={isDarkModeOn ? '#131314' : '#DDDCDF'}>
                    
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginLeft: isProfile ? 10 : 0}}>
        <Text style={[styles.cellWTextTxt1, {marginStart: isProfile ? 5 : 25, color: isPremium ? '#f48c06' : 'white', color : isSheetOn ? 'gray' : isDarkModeOn ? 'white' : 'black',}]} >{title}</Text> 
            <View style={{flexDirection: 'row'}}>
            <Text style={[styles.subtitleProfile, {fontSize: 18, color: isSheetOn ? '#434141' : isDarkModeOn ? 'gray' : isSheetOn ? 'white'  : '#404042',  opacity: isSheetOn ? .7 : 1}]}>{value}</Text> 
                <Icon2 style={styles.iconArrow} color={'#766E6E'} name={iconArrow} size={20}/>
            </View>
        </View>

        </TouchableHighlight>
    </GestureHandlerRootView>

    )
}

export const ChangeWText = ({lastname, firstname, onChangeTextSurname, onChangeTextFirstname, txt1, txt2, isCp, isDarkModeOn, isSecure}) => {

    

    return (
        <View style={[styles.cellChangeCnt, {backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]}>
            <View style={[styles.cellChange, {zIndex: 3, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]} activeOpacity={0.8}>
                <Text style={[styles.cellChangeTitleProfile, {color: isDarkModeOn ? 'white' : 'black'}]}>{txt1}</Text> 

                <TextInput secureTextEntry={isSecure}  onChangeText={onChangeTextSurname} style={[styles.cellChangeSubtitleProfile, {left: isCp? 40 : 0, color: isDarkModeOn ? 'white' : 'black'}]} placeholderTextColor={isDarkModeOn ? 'white' : 'black'} defaultValue={lastname}>
                </TextInput>

            </View>

            <View style={[styles.changeSpt, {backgroundColor: isDarkModeOn ? '#B3AFAE' : 'black'}]}>

            </View>

            <View style={[styles.cellChange, {zIndex: 3, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white'}]} activeOpacity={0.8}>
                <Text style={[styles.cellChangeTitleProfile, {color: isDarkModeOn ? 'white' : 'black'}]}>{txt2}</Text> 

                <TextInput secureTextEntry={isSecure}  onChangeText={onChangeTextFirstname} style={[styles.cellChangeSubtitleProfile, {left: isCp? 40 : 0, color: isDarkModeOn ? 'white' : 'black'}]} placeholderTextColor={'white'} defaultValue={firstname}>
                </TextInput>

            </View>

        </View>
    )
}

export const AppleInput = ({isDarkModeOn, txt, isCp, onChangeText, isSecure}) => {
    return (
        <View style={[styles.cellChange, {zIndex: 3, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: isDarkModeOn ? '#1c1c1e' : 'white', marginHorizontal: 20}]}>
            <Text style={[styles.cellChangeTitleProfile, {color: isDarkModeOn ? 'white' : 'black'}]}>{txt}</Text> 

            <TextInput secureTextEntry={isSecure}   onChangeText={onChangeText} style={[styles.cellChangeSubtitleProfile, {left: isCp? 40 : 0, color: isDarkModeOn ? 'white' : 'black'}]} placeholderTextColor={isDarkModeOn ? 'white' : 'black'} defaultValue={''}>
            </TextInput>
        </View>
    )
}

export const LineBwCell = ({isFull, isDarkModeOn, isOnTask}) => {
    return (
        <View style={{height: .5, backgroundColor: isOnTask ? 'black' : isDarkModeOn ? '#242426' : '#d0d0d2', flexDirection: 'row', marginHorizontal: isFull ? 0 : 20}}>
            <View style={{height: '100%', backgroundColor: isFull ? '#242426' : 'black', width: 0}}>
                
            </View>
            <View style={{height: '100%', backgroundColor: isOnTask ? 'black' : isDarkModeOn ? '#1c1c1e' : 'white', width: isOnTask ? 100 : 45}}>
            </View>
        </View>
    )
}

export const CellUpperText = ({txt, isDarkModeOn}) => {
    return (
        <Text style={[styles.cellUpperText, {color: isDarkModeOn ? 'gray' : '#1c1ce'}]}>
            {txt}
        </Text>
    )
}

export const TaskInput = ({title, isWritingTaskInput, onChangeText, taskChosen, onPress, isChoosingTheTask, isOnTask, didClickWrite}) => {

    const ref = useRef()
    ref?.current?.clear()

    return (
        <View style={[styles.taskInputCnt, {height: isOnTask ?  40 :  taskChosen || isChoosingTheTask ? 0 : 40, opacity: isOnTask ? 1 : taskChosen ? 0 : 1, zIndex: 10, display: !didClickWrite ? 'none' :  isOnTask ? 'flex' : taskChosen || isChoosingTheTask ? 'none' : 'flex', backgroundColor: isOnTask ? 'gray' : 'white'}]}>
            <TextInput ref={ref} onChangeText={onChangeText} style={styles.taskInput} placeholder={title} placeholderTextColor={'gray'}>
                
            </TextInput>
            <TouchableOpacity onPress={onPress} style={[styles.inputIconCnt,{opacity: isWritingTaskInput ? 1 : 0}]}>
                <Icon3 name={'arrow-with-circle-right'} size={20}/>
            </TouchableOpacity>

        </View>
    )
}

export const TaskTitle = ({txt, taskChosen}) => {
    return (
        <View style={[styles.taskTitleCnt, {height: taskChosen ? 40 : 0, opacity: taskChosen ? 1 : 0}]}>
            <Text style={styles.taskTitleTxt}>
                {txt}
            </Text>
        </View>
    )
}

export const TaskHead = ({txt, isChoosingTheTask}) => {
    return (
        <View style={[styles.taskHeadCnt, {opacity: isChoosingTheTask ? 1 : 0, height: isChoosingTheTask ? 40 : 0}]}>
            <Text style={styles.taskHeadTxt}>
                {txt}
            </Text>
        </View>
    )
}

export const SessionsLeft = ({txt, taskChosen, value, hasTaskSessionEnded}) => {
    return (
        <View style={[styles.taskLeftCnt, {opacity: taskChosen  && !hasTaskSessionEnded ? 1 : 0, height: taskChosen ? 20 : 0}]}>
            <Text style={styles.taskLeftTxt}>
               sessions left : {value}
            </Text>
        </View>    )
}

export const TasksInput = ({title, isWritingTaskInput, onChangeText, taskChosen, onPress, isOnTask, isAddOn, isDateAdding, open}) => {

    const ref = useRef()

    ref?.current?.clear()

    return (
        <View style={[styles.tasksInputCnt, {height: 40, opacity: 1, zIndex: 10, backgroundColor: isOnTask ? '#C9C9CE' : '#E7D1A9', display: open == true ? 'none' : isAddOn || isDateAdding ? 'flex' : 'none',}]}>
            <TextInput ref={ref} onChangeText={onChangeText} style={styles.tasksInput} placeholder={title} placeholderTextColor={'white'}>
                
            </TextInput>
        </View>
    )
}

export const Swipe = ({isLeft, onPress, isFirst, isLast, scale, title}) => {


    return  (

    <TouchableOpacity activeOpacity={.7} onPress={onPress}  style={[styles.deleteBox, {borderTopRightRadius: isFirst ? 10 : 0,borderBottomLeftRadius: isLast ? 10 : 0, backgroundColor: isLeft ? '#EB0606' : '#0D67C3'}]}>
        <View style={{justifyContent: 'center', alignContent: 'center'}}>
            <Animated.Text style={[{transform: [{scale: scale}]}, {color: 'white', fontWeight: 500, fontSize: 16}]}>
            {title}
            </Animated.Text>
        </View>
    </TouchableOpacity>
)}


interface ChildPropsEdit {
    setDelete: void
}

export const SwipeRight = ({isLeft, onPress, isFirst, isLast, scale, title}) => {


    return  (

    <TouchableOpacity activeOpacity={.7} onPress={onPress}  style={[styles.deleteBox, {borderTopRightRadius: isFirst ? 10 : 0,borderBottomLeftRadius: isLast ? 10 : 0, backgroundColor: isLeft ? '#EB0606' : '#0D67C3'}]}>
        <View style={{justifyContent: 'center', alignContent: 'center'}}>
            <Animated.Text style={[{transform: [{scale: scale}]}, {color: 'white', fontWeight: 500, fontSize: 16}]}>
            {title}
            </Animated.Text>
        </View>
    </TouchableOpacity>
)}


export const renderLeftActions = (progress, dragX, onPress, item, items, onPress2) => {
    const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1]
    })
    

return (

    <Swipe onPress={onPress2} isLeft={true} title={'Delete'}  isFirst={item.index == 0 ? true : false} isLast={item.index == items.length ? true : false} scale={scale} onPress={onPress} />

);
};


export const renderRightActions = (progress, dragX, onPress, item, items, props : ChildPropsEdit, ) => {
    const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [.5, 0]
    })

    
return (

    <SwipeRight onPress={() => { props.setDelete(); onPress(item._id); }} isLeft={false} title={'Done'} isFirst={item.index == 0 ? true : false} isLast={item.index == items.length ? true : false} scale={scale} onPress={onPress} />

);
};

export const TaskCnt = ({title, isPremium, coosingTask, iconArrow, backColor, style, onPress, value, isTasksOn, isLast, isFirst, isDarkModeOn, isSelected, isAddOn, isTasks, isSheetOn, isTaskDone}) => (
    // <TouchableHighlight onPress={onPress} style={styles.taskCnt} underlayColor={'#D5D5D5'} activeOpacity={1}>
        //     <View style={[styles.taskCntCnt, {flexDirection: 'row', justifyContent: 'space-between', width: '100%'}]}>
        //         <Text style={styles.taskTxt}>{title}</Text>
        //     </View>
        // </TouchableHighlight>

<GestureHandlerRootView>
<TouchableHighlight onPress={onPress} style={[styles.cell,{ borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, borderBottomWidth: 0, zIndex: 10, opacity: 10, backgroundColor : isSelected ? '#E8E7EB' :  !isDarkModeOn && isSheetOn && isTasks && isSelected ? '#6F6F70' : isTasks && isSelected && isSheetOn ? '#3D3D3F' : !isSheetOn && !isDarkModeOn ? 'white' : isSheetOn && isDarkModeOn && isTasks ? '#2D2D2E' : isSheetOn && !isSelected ? 'gray' : isSheetOn && isSelected ? '#f2f2f6' : isSheetOn && !isDarkModeOn ? 'gray' : isSelected && isDarkModeOn ? '#39393A' : isDarkModeOn ? '#1c1c1e' : 'white', display: isAddOn ? 'none' : 'flex', marginHorizontal: 0}]}   activeOpacity={1} underlayColor={isDarkModeOn ? '#131314' : '#DDDCDF'}>
            
<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', opacity: isSheetOn && isTasks ? .7 : 1}}>
    <Text style={[styles.cellWTextTxt1, {left: 10, color: isPremium ? '#f48c06' : 'white', color: isDarkModeOn ? 'white' : 'black'}]} >{title}</Text> 
    <TouchableOpacity style={{right: 42, display: coosingTask ? 'flex' : 'none'}} >
        <Icon2 name={'play-circle'} size={20}/>
    </TouchableOpacity>
</View>

</TouchableHighlight>
</GestureHandlerRootView>
)

export const TaskCntCnt = ({title, isPremium, coosingTask, onPressPlay, backColor, style, onPress, value, isTasksOn, isLast, isFirst, isDarkModeOn, isSelected, isAddOn, isTasks, isSheetOn, isTaskDone}) => (
    // <TouchableHighlight onPress={onPress} style={styles.taskCnt} underlayColor={'#D5D5D5'} activeOpacity={1}>
        //     <View style={[styles.taskCntCnt, {flexDirection: 'row', justifyContent: 'space-between', width: '100%'}]}>
        //         <Text style={styles.taskTxt}>{title}</Text>
        //     </View>
        // </TouchableHighlight>

<View onPress={onPress} style={[styles.cell,{ borderTopLeftRadius: isFirst ? 10 : 0, borderTopRightRadius: isFirst ? 10 : 0, borderBottomLeftRadius: isLast ? 10 : 0, borderBottomRightRadius: isLast ? 10 : 0, borderBottomWidth: 0, zIndex: 10, opacity: 10, backgroundColor : isSelected ? '#E8E7EB' :  !isDarkModeOn && isSheetOn && isTasks && isSelected ? '#6F6F70' : isTasks && isSelected && isSheetOn ? '#3D3D3F' : !isSheetOn && !isDarkModeOn ? 'white' : isSheetOn && isDarkModeOn && isTasks ? '#2D2D2E' : isSheetOn && !isSelected ? 'gray' : isSheetOn && isSelected ? '#f2f2f6' : isSheetOn && !isDarkModeOn ? 'gray' : isSelected && isDarkModeOn ? '#39393A' : isDarkModeOn ? '#1c1c1e' : 'white', display: isAddOn ? 'none' : 'flex', marginHorizontal: 0}]}   activeOpacity={1} underlayColor={isDarkModeOn ? '#131314' : '#DDDCDF'}>
            
<View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', opacity: isSheetOn && isTasks ? .7 : 1}}>
    <Text style={[styles.cellWTextTxt1, {left: 10, color: isPremium ? '#f48c06' : 'white', color: isDarkModeOn ? 'white' : 'black'}]} >{title}</Text> 
    <TouchableOpacity onPress={onPressPlay} style={{right: 42, display: coosingTask ? 'flex' : 'none'}} >
        <Icon2 name={'play-circle'} size={20}/>
    </TouchableOpacity>
</View>

</View>
) 

export const WhatDay = ({coosingTask, onPressBack, onPressDate, date, onPressPlus}) => (
    <View style={[styles.whatDayCnt,{borderBottomWidth: .2, paddingBottom: 10, bottom: 0,}]}>
        <TouchableOpacity onPress={onPressBack} activeOpacity={.7} style={[styles.whatDayIconArrow]}>
            <Icon color={coosingTask ? '#5CB270' : '#f48c06'} name={coosingTask ? 'arrow-down' : 'arrow-back'} size={24}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressDate} activeOpacity={.7} style={{flexDirection: 'row'}}>
            <Text style={styles.whatDayTxt}>
                {date}
            </Text>
            <View style={styles.whatDayIcon}>
                <Icon2 name={'caret-down'} size={20}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressPlus} activeOpacity={.7} style={[styles.whatDayIconPlus, {display: coosingTask ? 'flex' : 'none', bottom: 10}]}>
            <Icon2 color={'#007AFF'} name={'plus'} size={20}/>
        </TouchableOpacity>
    </View>
)



export const styles = StyleSheet.create({
    pageSettings : {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        zIndex: 0,
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
    pageFocusLoading : {
        height: SCREEN_HEIGHT,
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingBottom: verticalScale(50),
        position: 'absolute'
    },
    pageProfile : {
        height: SCREEN_HEIGHT,
        width: SCREEN_WIDTH,
        backgroundColor: 'black',
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
        width: horizontalScale(100),
        backgroundColor: '#212121',
        height: verticalScale(50),
        borderRadius: horizontalScale(25),
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom:SCREEN_WIDTH/4,
    },
    focusButtonText: {
        fontSize: 18,
        fontWeight: 500,
        color: 'white',
        alignSelf: 'center'
    },
    focusButtonPauseCntCnt : {
        width: horizontalScale(100),
        height: verticalScale(50),
        justifyContent: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom:SCREEN_WIDTH/4,
        flexDirection: 'row',
        marginHorizontal: horizontalScale(40)
    },
    focusButtonPauseCnt1 : {
        width: horizontalScale(100),
        backgroundColor: '#F3F3F3',
        height: verticalScale(50),
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
        width: horizontalScale(100),
        backgroundColor: '#212121',
        height: verticalScale(50),
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
        flexDirection: 'row'
      },
      haederText1: {
        color: 'white',
        fontSize: 17,
        fontWeight: 600,
        alignSelf: 'center',
      },
      haederText2: {
        color: 'white',
        fontSize: 17,
        fontWeight: 600,
        alignSelf: 'center',
      },
      headerIconCnt : {
        position: 'absolute',
        left: 25,
        bottom: 9        
      },
      headerIconCnt2 : {
        position: 'absolute',
        right: 25,
        bottom: 9,
        right: -SCREEN_WIDTH/2.7
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
        right: 5,
        justifyContent: 'center',
        backgroundColor: 'white'
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
        height: horizontalScale(60),
        width: horizontalScale(60),
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
    cellWText: {
        backgroundColor: 'black',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 1,
        marginHorizontal: 20,
    },
    cellWTextTouch: {
        paddingVertical: 20,
        maxHeight: verticalScale(55),
        backgroundColor: '#1c1c1e',
        // flexDirection: 'row',
        alignItems: 'center',
        zIndex: 2,
        opacity: 2,
        width: '100%',
        height: 20,
        
    },
    cellWTextTxtCnt:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        bottom: 28,
        zIndex: 4,
        width: '30%',
        height: 20,
        left: 40,
        // backgroundColor: 'white'

    },
    cellWTextTxt1: {
        fontSize: 16,
        marginStart: 16,
        fontWeight: 400,
        color: 'white',
    },
    cellWTextTxt2: {
        fontSize: 14,
        opacity: .9,
        marginEnd: 15,
        color: '#EDEDEC'
    },
    title: {
        fontSize: 15,
        marginStart: 16,
        fontWeight: 500,
        flex: 1,
        color: 'white',
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
    appleBtnCnt: {
        height: 45,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 10,
        justifyContent: 'center',
        borderWidth: 1,
        flexDirection: 'row'
    },
    appleBtnTxt: {
        color: 'black',
        fontSize: 17,
        fontWeight: 500,
        alignSelf: 'center'
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
        width: '35%',
    },
    cellChangeSubtitleProfile : {
        fontSize: 18,
        opacity: .9,
        marginEnd: 25,
        color: 'white',
        width: '65%',
        maxWidth: '45%'
    },
    cellUpperText: {
        color: 'gray',
        fontSize: 13,
        marginLeft: 35,
        marginBottom: 5
    },
    taskInputCnt: {
        marginHorizontal: 20,
        height: 40,
        borderRadius: 10,
        width: '80%',
        backgroundColor: '#E7D1A9',
        alignSelf: 'center',
        top: SCREEN_HEIGHT / 3.1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    taskTitleCnt: {
        marginHorizontal: 20,
        height: 40,
        borderRadius: 10,
        width: '80%',
        // backgroundColor: '#E7D1A9',
        alignSelf: 'center',
        top: SCREEN_HEIGHT / 5,
        justifyContent: 'center',
        flexDirection: 'row',
        
    },
    tasksInputCnt: {
        marginHorizontal: 20,
        height: 40,
        borderRadius: 10,
        width: '80%',
        backgroundColor: '#E7D1A9',
        alignSelf: 'center',
        top: 0,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    tasksTitleCnt: {
        marginHorizontal: 20,
        height: 40,
        borderRadius: 10,
        width: '80%',
        // backgroundColor: '#E7D1A9',
        alignSelf: 'center',
        top: SCREEN_HEIGHT / 5,
        justifyContent: 'center',
        flexDirection: 'row',
        
    },
    taskInput: {
        fontSize: 18,
        // left: 50
        alignSelf: 'center',
    },
    tasksInput: {
        fontSize: 18,
        // left: 50,
        color: 'white',
        alignSelf: 'center',
    },
    taskTitleTxt: {
        fontSize: 24,
        // left: 50
        alignSelf: 'center'
    },
    inputIconCnt: {
        position: 'absolute',
        right: 30,
        top: 10
    },
    taskHeadCnt: {
        marginHorizontal: 20,
        height: 40,
        width: '80%',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        top: SCREEN_HEIGHT / 3.15,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    taskHeadTxt: {
        fontSize: 22,
        fontWeight: '400',
        color: 'white'
    },
    taskLeftCnt: {
        marginHorizontal: 20,
        height: 40,
        width: '80%',
        right: '15%',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        top: SCREEN_HEIGHT / 7.80,
        justifyContent: 'center',
    },
    taskLeftTxt: {
        fontSize: 14,
        fontWeight: '400',
        color: 'white',
        alignSelf: 'flex-end',
        opacity: .7
    },
    deleteBox: {
        justifyContent: 'center', 
        backgroundColor: '#EB0606', 
        alignItems: 'center',
        width: 120,
        height: 40,
        left: 20
    },
    taskCnt: {
        height: 40,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        alignContent: 'center',
        alignItems: 'center'
    },
    taskCntCnt: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        width: '100%'
        },
    taskCntIconPlay: {
        position: 'absolute',
        right: 20,
        alignSelf: 'flex-end',
    },
    taskTxt: {
        fontSize: 18,
        color: 'black',
    },
    whatDayCnt: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%'
    },
    whatDayTxt: {
        fontWeight: '500',
        color: 'black',
        fontSize: 20
    },
    whatDayIcon: {
        justifyContent: 'center',
        left: 5
    },
    whatDayIconPlus: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 45
    },
    whatDayIconArrow: {
        position: 'absolute',
        alignSelf: 'flex-start',
        left: 30
    }
    

})