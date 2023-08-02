import TrackPlayer, { State } from "react-native-track-player";
import { Vibration } from "react-native";
import { songs } from "../Storage/Data";

export const setLength = async (value, index) => {

        if(index == 1){
        setInfo({ ...info, 
            pomodoroLength: value})
            if (MyObject) {
                realm.write(() => {
                    MyObject.pomodoroLength! = value;
                });
            }
        }

        else if(index == 2){
            setInfo({ ...info, 
                breakShortLength: value})
                if (MyObject) {
                    realm.write(() => {
                        MyObject.breakShortLength! = value;
                    });
                }
        }

        else if(index == 3){
            setInfo({ ...info, 
                breakLongLength: value})
                if (MyObject) {
                    realm.write(() => {
                        MyObject.breakLongLength! = value;
                    });
                }
        }

        else if(index == 4){
            setInfo({ ...info, 
                breakAfter: value})
                if (MyObject) {
                    realm.write(() => {
                        MyObject.breakAfter! = value;
                    });
                }
        }

        else if(index == 5){

            let filterObj = examples.filter((item) => item.index == value);
            const value2 = filterObj[0].name


            setInfo({ ...info, 
                defaultDoroInt: value,
                defaultDoroStr: value2
            })
                if (MyObject) {
                    realm.write(() => {
                        MyObject.defaultDoroInt! = value;
                        MyObject.defaultDoroStr! = value2;
                    });
                }
        }


}

export const setSwitch = (value, index) => {
    
    if(index == 1){
        setInfo({ ...info, 
            vibrate: !info?.vibrate})
            if (MyObject) {
                realm.write(() => {
                    MyObject.vibrate! = !value;
                });
            }
    } 

    else if(index == 2){
        setInfo({ ...info, 
            autoNext: !info?.autoNext})
            if (MyObject) {
                realm.write(() => {
                    MyObject.autoNext! = !value;
                });
            }
    } 

    else if(index == 3){
        setInfo({ ...info, 
            autoBreak: !info?.autoBreak})
            if (MyObject) {
                realm.write(() => {
                    MyObject.autoBreak! = !value;
                });
            }
    } 

    else if(index == 4){
        setInfo({ ...info, 
            darkMode: !info?.darkMode})
            if (MyObject) {
                realm.write(() => {
                    MyObject.darkMode! = !value;
                });
            }
    } 
    
    else if(index == 5){
        setInfo({ ...info, 
            ranking: !info?.ranking})
            if (MyObject) {
                realm.write(() => {
                    MyObject.ranking! = !value;
                });
            }
    } 

    else if(index == 6){
        setInfo({ ...info, 
            dailyReminder: !info?.dailyReminder})
            if (MyObject) {
                realm.write(() => {
                    MyObject.dailyReminder! = !value;
                });
            }
    } 

}

export const ring = async (index, sec) => {
    // await TrackPlayer.add(songs)
    const state = await TrackPlayer.getState();
    
        await TrackPlayer.skip(index)
        await TrackPlayer.play();

        setTimeout(()=> {
            TrackPlayer.pause()
         }
         ,sec * 1000)
    
    }

export const vibrateFor = (isVibrate: boolean, sec: number) => {
        if(isVibrate){
        Vibration.vibrate(sec * 1000)}
    }