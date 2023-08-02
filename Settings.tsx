import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Linking, SafeAreaView, ScrollView, StatusBar, Text, TouchableHighlight, View } from 'react-native';
import { Header, ProfileRow, Space, styles, SettingsCell, SettingsCellwSwitch, SettingsCellwText, SettingsCellGold, SCREEN_HEIGHT, SettingsCellwSwitch2, SettingsCellLogout, LineBwCell, Textt, AppleButtonWithHighlight } from '../components/Utilities/Utilities';
import {  DefaultPicker, LongBreakAfterPicker, LongBreakPicker, OpenURLButtonRefProps, PomodoroPicker, ShortBreakPicker, StorageAsync, StorageAsyncProps } from '../components/Functions/Functions';
// import { OpenURLButton} from '../components/Functions/Functions';
// import { StorageRealm} from '../components/Functions/Functions';
// import { StorageRefProps } from '../components/Functions/Functions';
import { examples, merchantIdentifier, publishableKey, urlAppStore, urlAppWeb, urlSite, urlSiteSupport } from '../components/Storage/Data';
// import { User, UserRealmContext } from '../components/Storage/MongoDB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StripeProvider } from '@stripe/stripe-react-native';
// import { useApp } from '@realm/react';
// import { OfferSheet, OfferSheetRefProps } from '../components/OfferSheet';
import { scrollTo } from 'react-native-reanimated';
import { useApp } from '@realm/react';
// import PaymentScreen from '../components/Functions/Stripe/Stripe';
// import { BottomSheet, BottomSheetRefProps } from '../components/BottomSheetPayment';

const Settings = ({route, navigation}) => {

    // const tabBarHeight = useBottomTabBarHeight();
    const [info, setInfo] = useState({})

    const {isLogged} = route.params

    const [isLog, setIsLog] = useState(isLogged)
    const [isSheetOn, setIsSheetOn] = useState(false)

    const [isDarkModeOn, setIsDarkModeOn] = useState(false)
    const [isPomodoroSelected, setIsPomodoroSelected] = useState(false)
    const [isShortBreakSelected, setIsShortBreakSelected] = useState(false)
    const [isLongBreakSelected, setIsLongBreakSelected] = useState(false)
    const [isAfterLongBreakSelected, setIsAfterLongBreakSelected] = useState(false)
    const [isDefaultDoroSelected, setIsDefaultDoroSelected] = useState(false)

    // const {useRealm, useQuery, useObject} = UserRealmContext;
    // const realm = useRealm()
    // const MyObject = useObject(User, 1);
    // const userinfo = useQuery(User)

    useEffect(() => {
        getLogData()
        ref3?.current?.scrollTo(60)
        setItemsFirstTime()
        getItems()
},[])

    const ref = useRef<OpenURLButtonRefProps>(null)
    const goTo = useCallback((urlSite: string) => {
        ref?.current?.handlePress(urlSite)
    }, [])

    // const create = useCallback(() => {
    //     ref2?.current?.createData()
    // }, [])

    // const getData = useCallback(async () => {
    // }, [])
    
    // const writeData = () => {
    //     setInfo(ref2?.current?.info2[0])
    // }
   
    const ref2 = useRef<StorageAsyncProps>(null)
    
    // const ref3 = useRef<OfferSheetRefProps>(null)
    // const openSheet = useCallback(() => {
    //     ref3?.current?.scrollTo(-SCREEN_HEIGHT / 1.3)
    // }, [])

    const closeSheet =async ()=>{
 
        setTimeout(function(){
     
          //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
          setIsSheetOn(false)


        }, 200);

        const myItem: any = await getItem2('dailyReminderr')
        console.log(await JSON.parse(myItem))

    }

    const openSheet2 =()=>{

    setTimeout(function(){
    
        //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
        setIsSheetOn(true)


    }, 50);
    
    
    }

    const ResetPickers = () => {
        setIsPomodoroSelected(false)
        setIsShortBreakSelected(false)
        setIsLongBreakSelected(false)
        setIsAfterLongBreakSelected(false)
        setIsDefaultDoroSelected(false)
    }

    const getLogData = async () => {
        const value = await AsyncStorage.getItem('isLogged')

        if(value == null) {
            setIsLog(isLogged)
        } else if (value == 'false') {
            setIsLog(false)
        }  else if(value == 'true')  {
            setIsLog(true)
        }

    }
    
    const choosePomodoro = () => {
        ResetPickers()
        setIsPomodoroSelected(!isPomodoroSelected)
    }

    const chooseShortBreak = () => {
        ResetPickers()
        setIsShortBreakSelected(!isShortBreakSelected)
    }

    const chooseLongBreak = () => {
        ResetPickers()
        setIsLongBreakSelected(!isLongBreakSelected)
    }

    const chooseAfterLongBreak = () => {
        ResetPickers()
        setIsAfterLongBreakSelected(!isAfterLongBreakSelected)
    }

    const chooseDefaultDoro = () => {
        ResetPickers()
        setIsDefaultDoroSelected(!isDefaultDoroSelected)
    }

    const onSelectWork = async data => {
        let updatedValue = {}
            updatedValue ={
                alarmWork: data
            }
            setInfo(obj => ({
                ...obj,
                ...updatedValue
                    }));
            
                    await setItem('alarmWork', data.toString())
    };

    const onSelectBreak = async data => {
        let updatedValue = {}
            updatedValue ={
                alarmBreak: data
            }
            setInfo(obj => ({
                ...obj,
                ...updatedValue
                    }));
            
                    await setItem('alarmBreak', data.toString())
    };

    const onSelectName = (data) => {
        setInfo({ ...info, 
            name: data})
            }
    
            //    value, index) => {

    //     if(index == 1){
    //     setInfo({ ...info, 
    //         pomodoroLength: value})
    //         if (MyObject) {
    //             realm.write(() => {
    //                 MyObject.pomodoroLength! = value;
    //             });
    //         }
    //     }

    //     else if(index == 2){
    //         setInfo({ ...info, 
    //             breakShortLength: value})
    //             if (MyObject) {
    //                 realm.write(() => {
    //                     MyObject.breakShortLength! = value;
    //                 });
    //             }
    //     }

    //     else if(index == 3){
    //         setInfo({ ...info, 
    //             breakLongLength: value})
    //             if (MyObject) {
    //                 realm.write(() => {
    //                     MyObject.breakLongLength! = value;
    //                 });
    //             }
    //     }

    //     else if(index == 4){
    //         setInfo({ ...info, 
    //             breakAfter: value})
    //             if (MyObject) {
    //                 realm.write(() => {
    //                     MyObject.breakAfter! = value;
    //                 });
    //             }
    //     }

    //     else if(index == 5){

    //         let filterObj = examples.filter((item) => item.index == value);
    //         const value2 = filterObj[0].name


    //         setInfo({ ...info, 
    //             defaultDoroInt: value,
    //             defaultDoroStr: value2
    //         })
    //             if (MyObject) {
    //                 realm.write(() => {
    //                     MyObject.defaultDoroInt! = value;
    //                     MyObject.defaultDoroStr! = value2;
    //                 });
    //             }
    //     }


    // }

    // const setSwitch = (value, index) => {
        
    //     if(index == 1){
    //         setInfo({ ...info, 
    //             vibrate: !info?.vibrate})
    //             if (MyObject) {
    //                 realm.write(() => {
    //                     MyObject.vibrate! = !value;
    //                 });
    //             }
    //     } 

    //     else if(index == 2){
    //         setInfo({ ...info, 
    //             autoNext: !info?.autoNext})
    //             if (MyObject) {
    //                 realm.write(() => {
    //                     MyObject.autoNext! = !value;
    //                 });
    //             }
    //     } 

    //     else if(index == 3){
    //         setInfo({ ...info, 
    //             autoBreak: !info?.autoBreak})
    //             if (MyObject) {
    //                 realm.write(() => {
    //                     MyObject.autoBreak! = !value;
    //                 });
    //             }
    //     } 

    //     else if(index == 4){
    //         setInfo({ ...info, 
    //             darkMode: !info?.darkMode})
    //             if (MyObject) {
    //                 realm.write(() => {
    //                     MyObject.darkMode! = !value;
    //                 });
    //             }
    //     } 
        
    //     else if(index == 5){
    //         setInfo({ ...info, 
    //             ranking: !info?.ranking})
    //             if (MyObject) {
    //                 realm.write(() => {
    //                     MyObject.ranking! = !value;
    //                 });
    //             }
    //     } 

    //     else if(index == 6){
    //         setInfo({ ...info, 
    //             dailyReminder: !info?.dailyReminder})
    //             if (MyObject) {
    //                 realm.write(() => {
    //                     MyObject.dailyReminder! = !value;
    //                 });
    //             }
    //     } 

    // }

    const getItem2 = async (item: any) => {
        return await AsyncStorage.getItem(item)
    }

    const setItemsFirstTime = async () => {
        const isSet = await AsyncStorage.getItem('isSet')

        if(isSet != null) {
            return
        }

        await AsyncStorage.setItem('premium', 'false')
        await AsyncStorage.setItem('vibrate', 'false')
        await AsyncStorage.setItem('autoNext', 'false')
        await AsyncStorage.setItem('autoBreak', 'false')
        await AsyncStorage.setItem('darkMode', 'false')
        await AsyncStorage.setItem('ranking', 'false')
        await AsyncStorage.setItem('dailyReminder', 'false')

        await AsyncStorage.setItem('alarmWork', '1')
        await AsyncStorage.setItem('alarmBreak', '2')
        await AsyncStorage.setItem('pomodoroLength', '25')
        await AsyncStorage.setItem('breakShortLength', '5')
        await AsyncStorage.setItem('breakLongLength', '15')
        await AsyncStorage.setItem('breakAfterLongLength', '4')
        await AsyncStorage.setItem('defaultDoroInt', '1')
        await AsyncStorage.setItem('defaultDoroStr', 'ClassicDoro')
        await AsyncStorage.setItem('isSet', '1')

    } 

    const getItems = async () => {
                
        const item6 = await AsyncStorage.getItem('premium')
        const item06 = await JSON.parse(item6)
        
        const item5 = await AsyncStorage.getItem('vibrate')
        const item05 = await JSON.parse(item5)
        
        const item4 = await AsyncStorage.getItem('autoNext')
        const item04 = await JSON.parse(item4)
        
        const item3 = await AsyncStorage.getItem('autoBreak')
        const item03 = await JSON.parse(item3)
        
        const item2 = await AsyncStorage.getItem('darkMode')
        const item02 = await JSON.parse(item2)

        const item1 = await AsyncStorage.getItem('ranking')
        const item01 = await JSON.parse(item1)

        const item0: any = await AsyncStorage.getItem('dailyReminder')
        const item00 = await JSON.parse(item0)
        
        const item7 = await AsyncStorage.getItem('alarmWork')
        const item07 = Number(item7)
        
        const item8 = await AsyncStorage.getItem('alarmBreak')
        const item08 = Number(item8)
        
        const item9 = await AsyncStorage.getItem('pomodoroLength')
        const item09 = Number(item9)
        
        const item10 = await AsyncStorage.getItem('breakShortLength')
        const item010 = Number(item10)
        
        const item11 = await AsyncStorage.getItem('breakLongLength')
        const item011 = Number(item11)
        
        const item12 = await AsyncStorage.getItem('breakAfterLongLength')
        const item012 = Number(item12)

        const item13 = await AsyncStorage.getItem('defaultDoroInt')
        const item013 = Number(item13)

        const item14 = await AsyncStorage.getItem('defaultDoroStr')
        const item014 = item14

        const item15 = await AsyncStorage.getItem('name')

        const item16 = await AsyncStorage.getItem('email')

        setIsDarkModeOn(item02)



        let updatedValue = {};
        updatedValue = {
            premium:item06, 
            'vibrate': item05, 
            'autoNext': item04, 
            'autoBreak': item03,
            'darkMode': item02,
            'ranking': item01,
            'dailyReminder': item00,
            'alarmWork': item07,
            'alarmBreak': item08,
            'pomodoroLength': item09,
            'breakShortLength': item010,
            'breakLongLength': item011,
            'breakAfterLongLength': item012,
            'defaultDoroInt': item013,
            'defaultDoroStr': item014,
            'name': item15,
            'email': item16
        };
        setInfo(obj => ({
        ...obj,
        ...updatedValue
            }));

    }

    const setItem = async (item: any, value: any) => {
        await AsyncStorage.setItem(item, value)
    }

    const setLength = async (value, index) => {

        if(index == 1){
            let updatedValue = {}
            updatedValue ={
                pomodoroLength: value
            }
            setInfo(obj => ({
                ...obj,
                ...updatedValue
                    }));
            
            await setItem('pomodoroLength', value.toString())
            setIsPomodoroSelected(false)
            
        }

        else if(index == 2){
            let updatedValue = {}
            updatedValue ={
                breakShortLength: value
            }
            setInfo(obj => ({
                ...obj,
                ...updatedValue
                    }));
                    await setItem('breakShortLength', value.toString())
                    setIsShortBreakSelected(false)
            
        }

        else if(index == 3){
            let updatedValue = {}
            updatedValue ={
                breakLongLength: value
            }
            setInfo(obj => ({
                ...obj,
                ...updatedValue
                    }));
            
                    await setItem('breakLongLength', value.toString())
                    setIsLongBreakSelected(false)
                }

        else if(index == 4){
            let updatedValue = {}
            updatedValue ={
                breakAfterLongLength: value
            }
            setInfo(obj => ({
                ...obj,
                ...updatedValue
                    }));
            
                    await setItem('breakAfterLongLength', value.toString())
                    setIsAfterLongBreakSelected(false)
                }

        else if(index == 5){

            let filterObj = examples.filter((item) => item.index == value);
            const value2 = filterObj[0].name


                    let updatedValue = {}
                    updatedValue ={
                        defaultDoroInt: value,
                        defaultDoroStr: value2
                    }

                    console.log(updatedValue)

                    setInfo(obj => ({
                        ...obj,
                        ...updatedValue
                            }));
                    
                            await setItem('defaultDoroInt', value.toString())
                            await setItem('defaultDoroStr', value2)
                            setIsDefaultDoroSelected(false)
                        }


    }

    const setSwitch = async (value, index) => {

    if(index == 1){


        const reverse = !value
        
        
        let updatedValue = {}
        updatedValue ={
            vibrate: !value
        }
        console.log(updatedValue)
                    setInfo(obj => ({
                        ...obj,
                        ...updatedValue
                            }));
                            await setItem('vibrate', reverse.toString())
                        } 

    else if(index == 2){
   
        const reverse = !value

        let updatedValue = {}
                    updatedValue ={
                        autoNext: !value
                    }
                    setInfo(obj => ({
                        ...obj,
                        ...updatedValue
                            }));

                            await setItem('autoNext', reverse.toString())
                        }
    else if(index == 3){
      
        const reverse = !value

           let updatedValue = {}
                    updatedValue ={
                        autoBreak: !value
                    }
                    setInfo(obj => ({
                        ...obj,
                        ...updatedValue
                            }));
                            await setItem('autoBreak', reverse.toString())
                        } 

    else if(index == 4){

        
        const reverse = !value
        setIsDarkModeOn(reverse)

        let updatedValue = {}
                    updatedValue ={
                        darkMode: !value
                    }
                    setInfo(obj => ({
                        ...obj,
                        ...updatedValue
                            }));
                            await setItem('darkMode', reverse.toString())
                        } 

    else if(index == 5){
         
        const reverse = !value

         let updatedValue = {}
                    updatedValue ={
                        ranking: !value
                    }
                    setInfo(obj => ({
                        ...obj,
                        ...updatedValue
                            }));
                            await setItem('ranking', reverse.toString())
                        } 

    else if(index == 6){
        
        const reverse = !value

          let updatedValue = {}
                    updatedValue ={
                        dailyReminder: !value,
                    }
                    setInfo(obj => ({
                        ...obj,
                        ...updatedValue
                            }));
                            await setItem('dailyReminder', reverse.toString())
                        } 

    }

    return (
    <SafeAreaView style={[styles.pageSettings, {backgroundColor: isSheetOn && isDarkModeOn  ? '#212121' : isDarkModeOn ? 'black' : '#F2F2F6', zIndex: isSheetOn ? 0 : 1, }]}>
        <Header 
        isSheetOn={isSheetOn}
        opacity={isSheetOn ? .4 : 1}
        onPress={() => {
            if(!isSheetOn){
                navigation.goBack()}
            } } title={'Settings'} color={isSheetOn && !isDarkModeOn ? '#F9F9FB' : isSheetOn ? '#212121' : isDarkModeOn ? 'black' : '#f2f2f6'} opacity={isSheetOn ? .7 : 1} isSubtle={undefined}  />
        <ScrollView>
          
            <ProfileRow isSheetOn={isSheetOn} isDarkModeOn={isDarkModeOn} avatar={'#A0A6BE'} opacity={isSheetOn ? .4 : 1} txt={isLog ? info?.name : 'Sign In | Sign Up'} onPress={isLog && !isSheetOn ? () => {navigation.navigate('Profile', { onSelectName: onSelectName, selectedName: info?.name, email: info?.email, isDarkModeOn: isDarkModeOn })} : () => {if(!isSheetOn){navigation.navigate('Sign')}}}/>
          
            <Space space={12}/>

            <SettingsCellwText isDarkModeOn={isDarkModeOn} isPremium={true} isFirst={true} isLast={true} onPress={() => {openSheet(); openSheet2()}} title={'Get Premium'} iconArrow={isSheetOn ? 'angle-down' : 'angle-right'} />
          

            <Space space={12}/>


            <SettingsCellwText  isDarkModeOn={isDarkModeOn} isFirst={true} onPress={() => { navigation.navigate("Tasks", {isDarkModeOn}); } } title={'Tasks'} iconArrow={'angle-right'} backColor={undefined} style={undefined} isLast={undefined} />
            <SettingsCellwText  isDarkModeOn={isDarkModeOn} isFirst={false} onPress={() => { navigation.navigate("AlarmWork", { onSelectWork: onSelectWork, selectedWork: info?.alarmWork, isDarkModeOn}); } } title={'Work Alarm'} value={`Buzz ${info?.alarmWork}`} iconArrow={'angle-right'} backColor={undefined} style={undefined} isLast={undefined} />
            <LineBwCell isDarkModeOn={isDarkModeOn}  />

            <SettingsCellwText isDarkModeOn={isDarkModeOn} onPress={() => { navigation.navigate('AlarmBreak', { onSelectBreak: onSelectBreak, selectedBreak: info?.alarmBreak, isDarkModeOn }); } } title={'Break Alarm'} value={`Buzz ${info?.alarmBreak}`} iconArrow={'angle-right'} backColor={undefined} style={undefined} isLast={undefined} isFirst={undefined} />
            <LineBwCell isDarkModeOn={isDarkModeOn}  />
            <SettingsCellwSwitch isDarkModeOn={isDarkModeOn} isLast={true} title={'Vibrate'} value={info?.vibrate} onValueChange={() => { setSwitch(info?.vibrate, 1); } } icon={undefined} backColor={undefined} style={undefined} onPress={undefined} isFirst={undefined} />


            <Space space={12}/>


            <SettingsCellwText isDarkModeOn={isDarkModeOn} isFirst={true}
                onPress={() => { choosePomodoro(); } } title={'Pomodoro Length'} value={`${info?.pomodoroLength} Minutes`} iconArrow={isPomodoroSelected ? 'angle-down' : 'angle-right'} icon={undefined} backColor={undefined} style={undefined} isLast={undefined}/>
            <PomodoroPicker isDarkModeOn={isDarkModeOn} display={isPomodoroSelected ? 'flex' : 'none'} isClicked={isPomodoroSelected} margin={isPomodoroSelected ? 20 : 0} opacity={isPomodoroSelected ? 1 : 0} zIndex={isPomodoroSelected ? 2 : 0}
            value={info?.pomodoroLength} onValueChange={(val) => {setLength(val, 1)}}/>
            
            <LineBwCell isDarkModeOn={isDarkModeOn}  />
            <SettingsCellwText isDarkModeOn={isDarkModeOn}
                    onPress={() => { chooseShortBreak(); } } title={'Short Break Length'} value={`${info?.breakShortLength} Minutes`} iconArrow={isShortBreakSelected ? 'angle-down' : 'angle-right'} icon={undefined} backColor={undefined} style={undefined} isLast={undefined} isFirst={undefined}/>
            <ShortBreakPicker isDarkModeOn={isDarkModeOn} display={isShortBreakSelected ? 'flex' : 'none'} height={isShortBreakSelected ? 48 : 0} margin={isShortBreakSelected ? 20 : 0} opacity={isShortBreakSelected ? 1 : 0} zIndex={isShortBreakSelected ? 2 : 0}
            value={info?.breakShortLength} onValueChange={(val) =>{setLength(val, 2)}}/>
            
            <LineBwCell isDarkModeOn={isDarkModeOn}  />
            <SettingsCellwText isDarkModeOn={isDarkModeOn}
                    onPress={() => { chooseLongBreak(); } } title={'Long Break Length'} value={`${info?.breakLongLength} Minutes`} iconArrow={isLongBreakSelected ? 'angle-down' : 'angle-right'} icon={undefined} backColor={undefined} style={undefined} isLast={undefined} isFirst={undefined}/>
            <LongBreakPicker isDarkModeOn={isDarkModeOn} display={isLongBreakSelected ? 'flex' : 'none'} height={isLongBreakSelected ? 48 : 0} margin={isLongBreakSelected ? 20 : 0} opacity={isLongBreakSelected ? 1 : 0} zIndex={isLongBreakSelected ? 2 : 0}
            value={info?.breakLongLength} onValueChange={(val) =>{setLength(val, 3)}}/>
            
            <LineBwCell isDarkModeOn={isDarkModeOn}  />
            <SettingsCellwText isDarkModeOn={isDarkModeOn}
                    onPress={() => { chooseAfterLongBreak(); } } title={'Long Break After'} value={`${info?.breakAfterLongLength} Pomodoros`} iconArrow={isAfterLongBreakSelected ? 'angle-down' : 'angle-right'} icon={undefined} backColor={undefined} style={undefined} isLast={undefined} isFirst={undefined}/>
            <LongBreakAfterPicker isDarkModeOn={isDarkModeOn} display={isAfterLongBreakSelected ? 'flex' : 'none'} height={isAfterLongBreakSelected ? 48 : 0} margin={isAfterLongBreakSelected ? 20 : 0} opacity={isAfterLongBreakSelected ? 1 : 0} zIndex={isAfterLongBreakSelected ? 2 : 0}
            value={info?.breakAfterLongLength} onValueChange={(val) =>{setLength(val, 4)}}/>
            

            <LineBwCell isDarkModeOn={isDarkModeOn}  />
            <SettingsCellwSwitch isDarkModeOn={isDarkModeOn} value={info?.autoNext} onValueChange={() => { setSwitch(info?.autoNext, 2); } } title={'Auto Start Next Pomodoro'} icon={undefined} backColor={undefined} style={undefined} onPress={undefined} isLast={undefined} isFirst={undefined} />
     
            <LineBwCell isDarkModeOn={isDarkModeOn}  />
            <SettingsCellwSwitch isDarkModeOn={isDarkModeOn} isLast={true} value={info?.autoBreak} onValueChange={() => { setSwitch(info?.autoBreak, 3); } } title={'Auto Start of Break'} icon={undefined} backColor={undefined} style={undefined} onPress={undefined} isFirst={undefined} />
            

            <Space space={12}/>


            <SettingsCellwText isFirst={true} isDarkModeOn={isDarkModeOn}
                onPress={() => { chooseDefaultDoro(); } } title={'Default Pomodoro'} value={info?.defaultDoroStr} iconArrow={isDefaultDoroSelected ? 'angle-down' : 'angle-right'} icon={undefined} backColor={undefined} style={undefined} isLast={undefined}/>
            <DefaultPicker isDarkModeOn={isDarkModeOn} display={isDefaultDoroSelected ? 'flex' : 'none'} values={examples} isClicked={isDefaultDoroSelected} margin={isDefaultDoroSelected ? 20 : 0} opacity={isDefaultDoroSelected ? 1 : 0} zIndex={isDefaultDoroSelected ? 2 : 0}
            value={info?.defaultDoroInt} onValueChange={(val) =>{setLength(val, 5)}}/>


            
            <LineBwCell isDarkModeOn={isDarkModeOn}  />
            <SettingsCellwSwitch isDarkModeOn={isDarkModeOn} isFirst={false} value={info?.darkMode} onValueChange={() => { setSwitch(info?.darkMode, 4); } } title={'Dark Mode'} icon={undefined} backColor={undefined} style={undefined} onPress={undefined} isLast={undefined} />

            {/* <LineBwCell isDarkModeOn={isDarkModeOn}  />
            <SettingsCellwSwitch isDarkModeOn={isDarkModeOn} value={info?.ranking} onValueChange={() => { setSwitch(info?.ranking, 5); } } title={'Ranking'} icon={undefined} backColor={undefined} style={undefined} onPress={undefined} isLast={undefined} isFirst={undefined} /> */}

            <LineBwCell isDarkModeOn={isDarkModeOn}  />
            <SettingsCellwSwitch isDarkModeOn={isDarkModeOn} isLast={true} value={info?.dailyReminder} onValueChange={() => { setSwitch(info?.dailyReminder, 6); } } title={'Daily Reminder'} icon={undefined} backColor={undefined} style={undefined} onPress={undefined} isFirst={undefined} />

            
            <Space space={12}/>


            {/* <SettingsCell title={'Rate Now'}  onPress={() => {goTo(urlAppStore)}} /> */}
           
            <SettingsCellwText isDarkModeOn={isDarkModeOn} isFirst={true} title={'Help & Feedback'} onPress={() => { goTo(urlSiteSupport); } } icon={undefined} backColor={undefined} style={undefined} isLast={undefined} isLogout={undefined} isLogged={undefined}/>
           
            {/* <SettingsCell title={'Share The App'} onPress={() => {goTo(urlAppWeb)}}/> */}
            <SettingsCellwText isDarkModeOn={isDarkModeOn} isLast={true} title={'Official Website'} onPress={() => {goTo('https://resetwill.netlify.app/supportWillDoro.html')}} />
           
           
            <Space space={10}/>
           

            {/* <OpenURLButton ref={ref} /> */}
           
            <StorageAsync ref={ref2}/>
        
        
        </ScrollView>
        
            {/* <OfferSheet isDarkModeOn={isDarkModeOn}  ref={ref3} closeSheet={closeSheet} /> */}
        {/* <BottomSheet ref={ref3}/> */}
        {/* <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier={merchantIdentifier} // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <PaymentScreen />
    </StripeProvider> */}
    </SafeAreaView>)
}

export default Settings;
