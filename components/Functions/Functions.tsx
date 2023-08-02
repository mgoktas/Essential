import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Alert, Animated, Linking, Vibration, View } from "react-native";
import TrackPlayer, { State } from "react-native-track-player";
import { songs, track1, urlSite } from "../Storage/Data";
import { User, UserRealmContext } from '../Storage/MongoDB';
import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@realm/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCREEN_HEIGHT } from "../Utilities/Utilities";
import Icon3 from 'react-native-vector-icons/Entypo'
import { TouchableOpacity, GestureHandlerRootView } from "react-native-gesture-handler";

export const Clicked = (a: boolean) => {return !a}

export const formatNumber = (number: any )=> `0${number}`.slice(-2);

export const getRemaining = (time: any) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
}

export const Vibrate = () => {
    const interval = setInterval(() => Vibration.vibrate(), 1000);
    setTimeout(() => clearInterval(interval), 5000);
}

export const setupPlayer = async () => {


    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
        console.log('The player is playing');
    };
    
    try {
        await TrackPlayer.setupPlayer()
        await TrackPlayer.add(track1)
        await TrackPlayer.play()
    } catch (err) {
        console.log(err)
    }
}


export const togglePlay = async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack()
}

const supportedURL = 'https://google.com';

const unsupportedURL = 'slack://open?team=123456';


export type OpenURLButtonRefProps = {
    handlePress: (url: string) => void
}

export const OpenURLButton = React.forwardRef<OpenURLButtonRefProps, OpenURLButtonProps>(({}, ref) => {
  const handlePress = useCallback(async (url) => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  }, [])

  useImperativeHandle(ref, () => ({ handlePress }), [handlePress])

})

export type StorageRefProps = {
    createData: () => void
    getData: () => void
    info2: Object
}

export const StorageRealm = React.forwardRef<StorageRefProps, StorageProps>(({}, ref) => {

    const [info, setInfo] = useState({dailyReminder: false, ranking: false, darkMode: false, autoBreak: false, autoNext: false, vibrate: false, premium: false, alarmWork: 0, alarmBreak: 2, pomodoroLength: 25, breakShortLength : 5, breakLongLength: 19, breakAfterLongLength: 4})
    const [info2, setInfo2] = useState({});

    const {useRealm, useQuery, useObject} = UserRealmContext;
    const realm = useRealm()
    const user = useQuery(User)

const createData = useCallback( async () => {
    if(user.length == 0){
        realm.write(() => {
            realm.create('User', {
                _id: 1,
                name: '',
                useremail: '',
            });
        });
    }
}, [])

const getData = useCallback( async () => {
    await createData()

    try{
        user.map(async (item, index) => {
                const result : any[] =[{dailyReminder: item.dailyReminder, name: item.username, email: item.useremail, defaultDoroStr: item.defaultDoroStr, defaultDoroInt: item.defaultDoroInt, ranking: item.ranking, breakAfter: item.breakAfter, darkMode: item.darkMode, autoBreak: item.autoBreak, autoNext: item.autoNext, vibrate: item.vibrate, premium: item.premium, alarmWork: item.alarmWork, alarmBreak: item.alarmBreak, pomodoroLength: item.pomodoroLength, breakShortLength : item.breakShortLength, breakLongLength: item.breakLongLength, breakAfterLongLength: item.breakAfterLongLength}]
                setInfo2(result)
        })
    } 
    
    catch (err){
        console.log(err)
    }
    
    },[])

  useImperativeHandle(ref, () => ({ createData, getData, info2 }), [createData, getData, info2])

})

export const PomodoroPicker = ({margin, opacity, isClicked, onValueChange, value, display, isDarkModeOn}) => {
        
        return (
                <Picker style={{width: '80%', backgroundColor: isDarkModeOn ? 'gray' : "transparent", borderRadius: 10, height: isClicked ? 48 : 0, justifyContent: 'center', alignSelf: 'center', marginVertical: margin, marginHorizontal: 0, opacity: opacity, zIndex: isClicked ? 1 : 0, display: display}}
                        selectedValue={value}
                        onValueChange={onValueChange}>
                        <Picker.Item label="15" value={15} />
                        <Picker.Item label="20" value={20} />
                        <Picker.Item label="25" value={25} />
                        <Picker.Item label="30" value={30} />
                        <Picker.Item label="35" value={35} />
                        <Picker.Item label="40" value={40} />
                        <Picker.Item label="45" value={45} />
                        <Picker.Item label="50" value={50} />
                        <Picker.Item label="55" value={55} />
                        <Picker.Item label="60" value={60} />
                </Picker>
        );
        }

export const DefaultPicker = ({margin, opacity, isClicked, onValueChange, value, values, display, isDarkModeOn}) => {

    return (
            <Picker style={{width: '80%', backgroundColor: isDarkModeOn ? 'gray' : "transparent", borderRadius: 10, height: isClicked ? 48 : 0, justifyContent: 'center', alignSelf: 'center', margin: margin, opacity: opacity, zIndex: isClicked ? 1 : 0, display: display}}
                    selectedValue={value}
                    onValueChange={onValueChange}>
                {
                    values.map(item =>
                            <Picker.Item key={item.index} label={item.name} value={item.index} />
                    )
                }
            </Picker>
    );
    }

export const ShortBreakPicker = ({height, margin, opacity, zIndex, onValueChange, value, display, isDarkModeOn}) => {

  return (
    <Picker style={{width: '80%', backgroundColor: isDarkModeOn ? 'gray' : "transparent", borderRadius: 10, height: height, justifyContent: 'center', alignSelf: 'center', margin: margin, opacity: opacity, zIndex: zIndex,  display: display}}
            selectedValue={value}
            onValueChange={onValueChange}>
        <Picker.Item label="3" value={3} />
        <Picker.Item label="4" value={4} />
        <Picker.Item label="5" value={5} />
        <Picker.Item label="6" value={6} />
        <Picker.Item label="7" value={7} />
    </Picker>)}

export const LongBreakPicker = ({height, margin, opacity, zIndex, onValueChange, value, display, isDarkModeOn}) => {
  return ( 
    <Picker style={{width: '80%', backgroundColor: isDarkModeOn ? 'gray' : "transparent", borderRadius: 10, height: height, justifyContent: 'center', alignSelf: 'center', margin: margin, opacity: opacity, zIndex: zIndex,  display: display}}
            selectedValue={value}
            onValueChange={onValueChange}  >
        <Picker.Item label="10" value={10} />
        <Picker.Item label="15" value={15} />
        <Picker.Item label="20" value={20} />
        <Picker.Item label="25" value={25} />
        <Picker.Item label="30" value={30} />
    </Picker>)}

export const LongBreakAfterPicker = ({height, margin, opacity, zIndex, onValueChange, value, display, isDarkModeOn}) => {

    return (
    <Picker style={{width: '80%', backgroundColor: isDarkModeOn ? 'gray' : "transparent", borderRadius: 10, height: height, justifyContent: 'center', alignSelf: 'center', margin: margin, opacity: opacity, zIndex: zIndex, display: display}}
            selectedValue={value}
            onValueChange={onValueChange}
            >
                
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
        <Picker.Item label="4" value={4} />
        <Picker.Item label="5" value={5} />
        <Picker.Item label="6" value={6} />

    </Picker>)}

export const DefaultPickerSessionNumber = ({onValueChange, value, values, onPress, isChoosingTheTask, isDarkModeOn}) => {

    return (
        <View style={{display: isChoosingTheTask ? 'flex' : 'none', he: 0}}>
            
            <Picker style={{width: '80%', backgroundColor: isDarkModeOn ? 'gray' : "transparent", borderRadius: 10, height: isChoosingTheTask ? 40 : 0, justifyContent: 'center', alignSelf: 'center', top: SCREEN_HEIGHT / 3.1, display: isChoosingTheTask ? 'flex' : 'none'}}
            selectedValue={value}
            numberOfLines={2}
            onValueChange={onValueChange}>
                {
                    values.map(item =>
                        <Picker.Item key={item} label={item} value={Number(item)} />
                        )
                    }
            </Picker>
            <View style={{ top: SCREEN_HEIGHT / 3.47, alignSelf: 'flex-end', zIndex: 100, right: '15%'}}>
                <GestureHandlerRootView>
                    <TouchableOpacity onPress={onPress} >
                        <Icon3  name={'arrow-with-circle-right'} color={'#f5c41a'} size={20}/>
                    </TouchableOpacity>
                </GestureHandlerRootView>
            </View>

        </View>

    );
    }


export const login = async (email: string,password: any, app) => {
    Alert.alert('Security Error',err.message)
    
    const credentials = Realm.Credentials.emailPassword(
        email,
        password
      );

      try{
          await app.logIn(credentials);
        }catch (err: any) {
            Alert.alert('Security Error',err)
        }
    }


export type StorageAsyncProps = {
    getItem: (item: any) => void
    setItem: (item: any, value: any) => void
    data: Object
}

export const StorageAsync = React.forwardRef<StorageAsyncProps>(({}, ref) => {

    const getItem = async (item: any) => {
        return await AsyncStorage.getItem(item)
    }

    const setItem = async (item: any, value: any) => {
        await AsyncStorage.setItem(item, value)
    }

    const [info, setInfo] = useState({
        dailyReminder: false, 
        ranking: false, 
        darkMode: false, 
        autoBreak: false, 
        autoNext: false, 
        vibrate: false, 
        premium: false, 
        alarmWork: 0, 
        alarmBreak: 2, 
        pomodoroLength: 25, 
        breakShortLength : 5, 
        breakLongLength: 19, 
        breakAfterLongLength: 4
    })

    // const getData = useCallback( async () => {
    // },[])

    useImperativeHandle(ref, () => ({ getItem, setItem }), [getItem, setItem])

})
