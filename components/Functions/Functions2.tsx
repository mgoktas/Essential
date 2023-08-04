import TrackPlayer, {State} from 'react-native-track-player';
import {Alert, Vibration} from 'react-native';
import {
  examples,
  getDataNumber,
  getDataString,
  setData,
  songs,
} from '../Storage/Data';
import {useApp} from '@realm/react';
import {User} from '../Storage/MongoDB';
import { Dispatch } from 'react';

export const ring = async (index: number, sec: number) => {
  // await TrackPlayer.add(songs)
  const state = await TrackPlayer.getState();

  await TrackPlayer.skip(index);
  await TrackPlayer.play();

  setTimeout(() => {
    TrackPlayer.pause();
  }, sec * 1000);
};

export const vibrateFor = (isVibrate: boolean, sec: number) => {
  if (isVibrate) {
    Vibration.vibrate(sec * 1000);
  }
};

export const setAllData = () => {
  if (getDataNumber('isFirstTime') !== 1) {
    setData('isFirstTime', 1);

    setData('alarmWork', 1);
    setData('alarmBreak', 1);
    setData('vibrate', 'false');
    setData('pomodoroLength', 25);
    setData('breakShortLength', 5);
    setData('breakLongLength', 20);
    setData('breakAfterLongLength', 4);
    setData('autoNext', 'false');
    setData('autoBreak', 'false');
    setData('darkMode', 'false');
    setData('dailyReminder', 'false');
    setData('defaultDoroInt', 0);
    setData('defaultDoroStr', examples[0].name);
    setData('isLogged', 'false');
    setData('isPremium', 'false');
  }

  console.log(getDataNumber('isFirstTime'));
};

export const login = async (em: string, pw: string, navigation: { navigate: (arg0: string) => void; }, app: Realm.App<Realm.DefaultFunctionsFactory, Record<string, unknown>>, users: User | null) => {
  const credentials = Realm.Credentials.emailPassword(em, pw);
  try {
    await app.logIn(credentials);

    const oneuser = await users.findOne({ _id: em });
    console.log("venusFlytrap", oneuser);

    setRealmData(oneuser);

    setData('isLogged', 'true');
    navigation.navigate('Focus');
  } catch (err) {
    Alert.alert('Security Error', err.message);
  }
};

export const setRealmData = (user: { alarmWork: any; alarmBreak: any; vibrate: any; pomodoroLength: any; breakShortLength: any; breakLongLength: any; breakAfterLongLength: any; autoNext: any; autoBreak: any; darkMode: any; dailyReminder: any; defaultDoroInt: any; defaultDoroStr: any; isPremium: any; username: any; useremail: any; }) => {
  setData('alarmWork', user.alarmWork);
  setData('alarmBreak', user.alarmBreak);
  setData('vibrate', user.vibrate);
  setData('pomodoroLength', user.pomodoroLength);
  setData('breakShortLength', user.breakShortLength);
  setData('breakLongLength', user.breakLongLength);
  setData('breakAfterLongLength', user.breakAfterLongLength);
  setData('autoNext', user.autoNext);
  setData('autoBreak', user.autoBreak);
  setData('darkMode', user.darkMode);
  setData('dailyReminder', user.dailyReminder);
  setData('defaultDoroInt', user.defaultDoroInt);
  setData('defaultDoroStr', user.defaultDoroStr);
  setData('isPremium', user.isPremium);

  setData('name', user.username);
  setData('email', user.useremail);
};

export const checkRealmData = async (users, email) => {
  
  const user = await users.findOne({ _id: email });

  setData('alarmWork', user.alarmWork);
  setData('alarmBreak', user.alarmBreak);
  setData('vibrate', user.vibrate);
  setData('pomodoroLength', user.pomodoroLength);
  setData('breakShortLength', user.breakShortLength);
  setData('breakLongLength', user.breakLongLength);
  setData('breakAfterLongLength', user.breakAfterLongLength);
  setData('autoNext', user.autoNext);
  setData('autoBreak', user.autoBreak);
  setData('darkMode', user.darkMode);
  setData('dailyReminder', user.dailyReminder);
  setData('defaultDoroInt', user.defaultDoroInt);
  setData('defaultDoroStr', user.defaultDoroStr);
  setData('isPremium', user.isPremium);

  setData('name', user.username);
  setData('email', user.useremail);
};

export const ChangeName = () => {};
