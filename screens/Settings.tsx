import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {
  Header,
  ProfileRow,
  Space,
  styles,
  SettingsCell,
  SettingsCellwSwitch,
  SettingsCellwText,
  SettingsCellGold,
  SCREEN_HEIGHT,
  SettingsCellwSwitch2,
  SettingsCellLogout,
  LineBwCell,
  Textt,
  AppleButtonWithHighlight,
} from '../components/Utilities/Utilities';
import {
  DefaultPicker,
  LongBreakAfterPicker,
  LongBreakPicker,
  OpenURLButton,
  OpenURLButtonRefProps,
  PomodoroPicker,
  ShortBreakPicker,
  StorageAsync,
  StorageAsyncProps,
} from '../components/Functions/Functions';
// import { OpenURLButton} from '../components/Functions/Functions';
// import { StorageRealm} from '../components/Functions/Functions';
// import { StorageRefProps } from '../components/Functions/Functions';
import {
  examples,
  getData,
  getDataBoolean,
  getDataNumber,
  getDataString,
  merchantIdentifier,
  publishableKey,
  setData,
  urlAppStore,
  urlAppWeb,
  urlSite,
  urlSiteSupport,
  urlSiteWillDoro
} from '../components/Storage/Data';
// import { User, UserRealmContext } from '../components/Storage/MongoDB';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StripeProvider} from '@stripe/stripe-react-native';
// import { useApp } from '@realm/react';
import {OfferSheet, OfferSheetRefProps} from '../components/OfferSheet';
import {scrollTo} from 'react-native-reanimated';
import {useApp, useUser} from '@realm/react';
// import PaymentScreen from '../components/Functions/Stripe/Stripe';
import {
  BottomSheet,
  BottomSheetRefProps,
} from '../components/BottomSheetPayment';
import {useColorScheme} from 'react-native';
import Purchases from 'react-native-purchases';
import {useFocusEffect} from '@react-navigation/native';
import {User, useRealmContext} from '../components/Storage/MongoDB';

const Settings = ({route, navigation}) => {
  const [isLog, setIsLog] = useState(getDataString('isLogged') === 'true');
  const [isSheetOn, setIsSheetOn] = useState(false);

  const [isDarkModeOn, setIsDarkModeOn] = useState(
    getDataString('darkMode') === 'true',
  );
  const [isPomodoroSelected, setIsPomodoroSelected] = useState(false);
  const [isShortBreakSelected, setIsShortBreakSelected] = useState(false);
  const [isLongBreakSelected, setIsLongBreakSelected] = useState(false);
  const [isAfterLongBreakSelected, setIsAfterLongBreakSelected] =
    useState(false);
  const [isDefaultDoroSelected, setIsDefaultDoroSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [workAlarm, setWorkAlarm] = useState(getDataNumber('workAlarm'));
  const [breakAlarm, setBreakAlarm] = useState(getDataNumber('breakAlarm'));
  const [vibrate, setVibrate] = useState(getDataString('vibrate') === 'true');
  const [autoNext, setAutoNext] = useState(
    getDataString('autoNext') === 'true',
  );
  const [autoBreak, setAutoBreak] = useState(
    getDataString('autoBreak') === 'true',
  );
  const [darkMode, setDarkMode] = useState(
    getDataString('darkMode') === 'true',
  );
  const [dailyReminder, setDailyReminder] = useState(
    getDataString('dailyReminder') === 'true',
  );
  const [name, setName] = useState(getDataString('name'));

  // const {RealmProvider, useQuery, useRealm, useObject} = useRealmContext();

  // const user =
  //   getDataString('isLogged') === 'true'
  //     ? useObject(User, getDataString('email'))
  //     : ' ';

  // const realm = useRealm();

  const user2 = useUser();
  const mongodb = user2.mongoClient('mongodb-atlas');
  const users = mongodb.db('reactapp').collection<User>('users');

  useEffect(() => {
    ref3?.current?.scrollTo(60);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      setName(getDataString('name'));
    }, []),
  );

  const ref = useRef<OpenURLButtonRefProps>(null);
  const goTo = useCallback((urlSite: string) => {
    ref?.current?.handlePress(urlSite);
  }, []);

  const ref2 = useRef<StorageAsyncProps>(null);

  const ref3 = useRef<OfferSheetRefProps>(null);
  const openSheet = useCallback(() => {
    ref3?.current?.scrollTo(-SCREEN_HEIGHT / 1.1 - 30);
  }, []);

  const closeSheet = async () => {
    setTimeout(function () {
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      setIsSheetOn(false);
    }, 200);

    const myItem: any = await getItem2('dailyReminderr');
  };

  const openSheet2 = () => {
    setTimeout(function () {
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      setIsSheetOn(true);
    }, 50);
  };

  const ResetPickers = () => {
    setIsPomodoroSelected(false);
    setIsShortBreakSelected(false);
    setIsLongBreakSelected(false);
    setIsAfterLongBreakSelected(false);
    setIsDefaultDoroSelected(false);
  };

  const choosePomodoro = () => {
    ResetPickers();
    setIsPomodoroSelected(!isPomodoroSelected);
  };

  const chooseShortBreak = () => {
    ResetPickers();
    setIsShortBreakSelected(!isShortBreakSelected);
  };

  const chooseLongBreak = () => {
    ResetPickers();
    setIsLongBreakSelected(!isLongBreakSelected);
  };

  const chooseAfterLongBreak = () => {
    ResetPickers();
    setIsAfterLongBreakSelected(!isAfterLongBreakSelected);
  };

  const chooseDefaultDoro = () => {
    ResetPickers();
    setIsDefaultDoroSelected(!isDefaultDoroSelected);
  };

  const onSelectWork = async data => {
    setData('alarmWork', data);
    setWorkAlarm(data);
    const result12 = await users.updateOne(
      {_id: getDataString('email')},
      {$set: {alarmWork: data}},
    );
  };

  const onSelectBreak = async data => {
    setData('alarmBreak', data);
    setBreakAlarm(data);
    const result13 = await users.updateOne(
      {_id: getDataString('email')},
      {$set: {alarmBreak: data}},
    );
  };

  const onSelectName = data => {};

  const getItem2 = async (item: any) => {
    return await AsyncStorage.getItem(item);
  };

  const setLength = async (value, index) => {
    if (index == 1) {
      setData('pomodoroLength', value);
      setIsPomodoroSelected(false);
      const result = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {pomodoroLength: value}},
      );
    } else if (index == 2) {
      setData('breakShortLength', value);
      setIsShortBreakSelected(false);
      const result1 = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {breakShortLength: value}},
      );
    } else if (index == 3) {
      setData('breakLongLength', value);
      setIsLongBreakSelected(false);
      const result2 = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {breakLongLength: value}},
      );
    } else if (index == 4) {
      setData('breakAfterLongLength', value);
      setIsAfterLongBreakSelected(false);
      const result3 = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {breakAfterLongLength: value}},
      );
    } else if (index == 5) {
      const value2 = examples.filter(item => item.index == value)[0].name;
      setData('defaultDoroInt', value);
      setData('defaultDoroStr', value2);
      setIsDefaultDoroSelected(false);
      const result4 = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {defaultDoroInt: value}},
      );
      const result5 = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {defaultDoroStr: value2}},
      );
    }
  };

  const setSwitch = async (value, index) => {
    if (index == 1) {
      setData('vibrate', value.toString());
      const result6 = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {ranking: value.toString()}},
      );
    } else if (index == 2) {
      setData('autoNext', value.toString());
      const result7 = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {ranking: value.toString()}},
      );
    } else if (index == 3) {
      setData('autoBreak', value.toString());
      const result8 = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {ranking: value.toString()}},
      );
    } else if (index == 4) {
      setIsDarkModeOn(value);
      setData('darkMode', value.toString());
      const result9 = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {darkMode: value.toString()}},
      );
    } else if (index == 5) {
      setData('ranking', value.toString());
      const result10 = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {ranking: value.toString()}},
      );
    } else if (index == 6) {
      setData('dailyReminder', value.toString());
      const result11 = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {dailyReminder: value.toString()}},
      );
    }
  };

  const pay = async () => {
    try {
      // const {customerInfo, productIdentifier} = await Purchases.purchasePackage(package);
      // if (typeof customerInfo.entitlements.active.my_entitlement_identifier !== "undefined") {
      //   // Unlock that great "pro" content
      // }
    } catch (e) {
      if (!e.userCancelled) {
        // showError(e);
      }
    }
  };

  const try1 = async () => {
    // try {
    //     const offerings = await Purchases.getOfferings();
    //     if (offerings.current !== null) {
    //         console.log(offerings)
    //     }
    //   } catch (e) {
    //     console.log(offerings)
    //   }
  };

  try1();

  return (
    <SafeAreaView
      style={[
        styles.pageSettings,
        {
          backgroundColor:
            isSheetOn && isDarkModeOn
              ? '#212121'
              : isDarkModeOn
              ? 'black'
              : '#F2F2F6',
          zIndex: isSheetOn ? 0 : 1,
        },
      ]}>
      <Header
        isSheetOn={isSheetOn}
        opacity={isSheetOn ? 0.4 : 1}
        onPress={() => {
          if (!isSheetOn) {
            navigation.goBack();
          }
        }}
        title={'Settings'}
        color={
          isSheetOn && !isDarkModeOn
            ? '#F9F9FB'
            : isSheetOn
            ? '#212121'
            : isDarkModeOn
            ? 'black'
            : '#f2f2f6'
        }
        opacity={isSheetOn ? 0.7 : 1}
        isSubtle={undefined}
        isBorderOk={undefined}
        isWriting={undefined}
        isOnChange={undefined}
        isDarkModeOn={undefined}
        onPress2={undefined}
        isOnTask={undefined}
        isAddOn={undefined}
        isAddOn0={undefined}
      />
      <ScrollView>
        <ProfileRow
          isSheetOn={isSheetOn}
          avatar={'#A0A6BE'}
          opacity={isSheetOn ? 0.9 : 1}
          txt={isLog ? name : 'Sign In | Sign Up'}
          onPress={
            isLog && !isSheetOn
              ? () => {
                  navigation.navigate('Profile', {
                    onSelectName: onSelectName,
                    selectedName: name,
                    email: getDataString('email'),
                    isDarkModeOn: isDarkModeOn,
                  });
                }
              : () => {
                  if (!isSheetOn) {
                    navigation.navigate('Sign', {_dark: isDarkModeOn});
                  }
                }
          }
          isDarkModeOn={isDarkModeOn}
        />

        <Space space={12} isDate={undefined} />

        <SettingsCellwText
          isDarkModeOn={isDarkModeOn}
          isPremium={true}
          isFirst={true}
          isLast={true}
          onPress={() => {
            openSheet();
            openSheet2();
          }}
          title={'Get Premium'}
          iconArrow={isSheetOn ? 'angle-down' : 'angle-right'}
          isProfile={undefined}
          value={undefined}
          isTasksOn={undefined}
          isSelected={undefined}
          isAddOn={undefined}
          isTasks={undefined}
          isSheetOn={undefined}
          isTaskDone={undefined}
        />

        <Space space={12} isDate={undefined} />

        <SettingsCellwText
          isDarkModeOn={isDarkModeOn}
          isFirst={true}
          onPress={() => {
            navigation.navigate('Tasks', {
              isDarkModeOn,
              email: getDataString('email'),
              isLog,
            });
          }}
          title={'Tasks'}
          iconArrow={'angle-right'}
          backColor={undefined}
          style={undefined}
          isLast={undefined}
        />
        <LineBwCell
          isDarkModeOn={isDarkModeOn}
          isFull={undefined}
          isOnTask={undefined}
        />
        <SettingsCellwText
          isDarkModeOn={isDarkModeOn}
          isFirst={false}
          onPress={() => {
            navigation.navigate('AlarmWork', {
              onSelectWork: onSelectWork,
              selectedWork: workAlarm,
              isDarkModeOn,
            });
          }}
          title={'Work Alarm'}
          value={`Buzz ${getDataNumber('alarmWork')}`}
          iconArrow={'angle-right'}
          backColor={undefined}
          style={undefined}
          isLast={undefined}
        />
        <LineBwCell
          isDarkModeOn={isDarkModeOn}
          isFull={undefined}
          isOnTask={undefined}
        />

        <SettingsCellwText
          isDarkModeOn={isDarkModeOn}
          onPress={() => {
            navigation.navigate('AlarmBreak', {
              onSelectBreak: onSelectBreak,
              selectedBreak: breakAlarm,
              isDarkModeOn,
            });
          }}
          title={'Break Alarm'}
          value={`Buzz ${getDataNumber('alarmBreak')}`}
          iconArrow={'angle-right'}
          backColor={undefined}
          style={undefined}
          isLast={undefined}
          isFirst={undefined}
        />
        <LineBwCell
          isDarkModeOn={isDarkModeOn}
          isFull={undefined}
          isOnTask={undefined}
        />
        <SettingsCellwSwitch
          isDarkModeOn={isDarkModeOn}
          isLast={true}
          title={'Vibrate'}
          value={vibrate}
          onValueChange={val => {
            setSwitch(val, 1);
            setVibrate(val);
          }}
          icon={undefined}
          backColor={undefined}
          style={undefined}
          onPress={undefined}
          isFirst={undefined}
        />

        <Space space={12} isDate={undefined} />

        <SettingsCellwText
          isDarkModeOn={isDarkModeOn}
          isFirst={true}
          onPress={() => {
            choosePomodoro();
          }}
          title={'Pomodoro Length'}
          value={`${getDataNumber('pomodoroLength')} Minutes`}
          iconArrow={isPomodoroSelected ? 'angle-down' : 'angle-right'}
          icon={undefined}
          backColor={undefined}
          style={undefined}
          isLast={undefined}
        />
        <PomodoroPicker
          isDarkModeOn={isDarkModeOn}
          display={isPomodoroSelected ? 'flex' : 'none'}
          isClicked={isPomodoroSelected}
          margin={isPomodoroSelected ? 20 : 0}
          opacity={isPomodoroSelected ? 1 : 0}
          zIndex={isPomodoroSelected ? 2 : 0}
          value={getDataNumber('pomodoroLength')}
          onValueChange={val => {
            setLength(val, 1);
          }}
        />

        <LineBwCell
          isDarkModeOn={isDarkModeOn}
          isFull={undefined}
          isOnTask={undefined}
        />
        <SettingsCellwText
          isDarkModeOn={isDarkModeOn}
          onPress={() => {
            chooseShortBreak();
          }}
          title={'Short Break Length'}
          value={`${getDataNumber('breakShortLength')} Minutes`}
          iconArrow={isShortBreakSelected ? 'angle-down' : 'angle-right'}
          icon={undefined}
          backColor={undefined}
          style={undefined}
          isLast={undefined}
          isFirst={undefined}
        />
        <ShortBreakPicker
          isDarkModeOn={isDarkModeOn}
          display={isShortBreakSelected ? 'flex' : 'none'}
          height={isShortBreakSelected ? 48 : 0}
          margin={isShortBreakSelected ? 20 : 0}
          opacity={isShortBreakSelected ? 1 : 0}
          zIndex={isShortBreakSelected ? 2 : 0}
          value={getDataNumber('breakShortLength')}
          onValueChange={val => {
            setLength(val, 2);
          }}
        />

        <LineBwCell
          isDarkModeOn={isDarkModeOn}
          isFull={undefined}
          isOnTask={undefined}
        />
        <SettingsCellwText
          isDarkModeOn={isDarkModeOn}
          onPress={() => {
            chooseLongBreak();
          }}
          title={'Long Break Length'}
          value={`${getDataNumber('breakLongLength')} Minutes`}
          iconArrow={isLongBreakSelected ? 'angle-down' : 'angle-right'}
          icon={undefined}
          backColor={undefined}
          style={undefined}
          isLast={undefined}
          isFirst={undefined}
        />
        <LongBreakPicker
          isDarkModeOn={isDarkModeOn}
          display={isLongBreakSelected ? 'flex' : 'none'}
          height={isLongBreakSelected ? 48 : 0}
          margin={isLongBreakSelected ? 20 : 0}
          opacity={isLongBreakSelected ? 1 : 0}
          zIndex={isLongBreakSelected ? 2 : 0}
          value={getDataNumber('breakLongLength')}
          onValueChange={val => {
            setLength(val, 3);
          }}
        />

        <LineBwCell
          isDarkModeOn={isDarkModeOn}
          isFull={undefined}
          isOnTask={undefined}
        />
        <SettingsCellwText
          isDarkModeOn={isDarkModeOn}
          onPress={() => {
            chooseAfterLongBreak();
          }}
          title={'Long Break After'}
          value={`${getDataNumber('breakAfterLongLength')} Pomodoros`}
          iconArrow={isAfterLongBreakSelected ? 'angle-down' : 'angle-right'}
          icon={undefined}
          backColor={undefined}
          style={undefined}
          isLast={undefined}
          isFirst={undefined}
        />
        <LongBreakAfterPicker
          isDarkModeOn={isDarkModeOn}
          display={isAfterLongBreakSelected ? 'flex' : 'none'}
          height={isAfterLongBreakSelected ? 48 : 0}
          margin={isAfterLongBreakSelected ? 20 : 0}
          opacity={isAfterLongBreakSelected ? 1 : 0}
          zIndex={isAfterLongBreakSelected ? 2 : 0}
          value={getDataNumber('breakAfterLongLength')}
          onValueChange={val => {
            setLength(val, 4);
          }}
        />

        <LineBwCell
          isDarkModeOn={isDarkModeOn}
          isFull={undefined}
          isOnTask={undefined}
        />
        <SettingsCellwSwitch
          isDarkModeOn={isDarkModeOn}
          value={autoNext}
          onValueChange={val => {
            setSwitch(val, 2);
            setAutoNext(val);
          }}
          title={'Auto Start Next Pomodoro'}
          icon={undefined}
          backColor={undefined}
          style={undefined}
          onPress={undefined}
          isLast={undefined}
          isFirst={undefined}
        />

        <LineBwCell
          isDarkModeOn={isDarkModeOn}
          isFull={undefined}
          isOnTask={undefined}
        />
        <SettingsCellwSwitch
          isDarkModeOn={isDarkModeOn}
          isLast={true}
          value={autoBreak}
          onValueChange={val => {
            setSwitch(val, 3);
            setAutoBreak(val);
          }}
          title={'Auto Start of Break'}
          icon={undefined}
          backColor={undefined}
          style={undefined}
          onPress={undefined}
          isFirst={undefined}
        />

        <Space space={12} isDate={undefined} />

        <SettingsCellwText
          isFirst={true}
          isDarkModeOn={isDarkModeOn}
          onPress={() => {
            chooseDefaultDoro();
          }}
          title={'Default Pomodoro'}
          value={getDataString('defaultDoroStr')}
          iconArrow={isDefaultDoroSelected ? 'angle-down' : 'angle-right'}
          icon={undefined}
          backColor={undefined}
          style={undefined}
          isLast={undefined}
        />
        <DefaultPicker
          isDarkModeOn={isDarkModeOn}
          display={isDefaultDoroSelected ? 'flex' : 'none'}
          values={examples}
          isClicked={isDefaultDoroSelected}
          margin={isDefaultDoroSelected ? 20 : 0}
          opacity={isDefaultDoroSelected ? 1 : 0}
          zIndex={isDefaultDoroSelected ? 2 : 0}
          value={getDataNumber('defaultDoroInt')}
          onValueChange={val => {
            setLength(val, 5);
          }}
        />

        <LineBwCell
          isDarkModeOn={isDarkModeOn}
          isFull={undefined}
          isOnTask={undefined}
        />
        <SettingsCellwSwitch
          isDarkModeOn={isDarkModeOn}
          isFirst={false}
          value={darkMode}
          onValueChange={val => {
            setSwitch(val, 4);
            setDarkMode(val);
          }}
          title={'Dark Mode'}
          icon={undefined}
          backColor={undefined}
          style={undefined}
          onPress={undefined}
          isLast={undefined}
        />

        <LineBwCell
          isDarkModeOn={isDarkModeOn}
          isFull={undefined}
          isOnTask={undefined}
        />
        <SettingsCellwSwitch
          isDarkModeOn={isDarkModeOn}
          isLast={true}
          value={dailyReminder}
          onValueChange={val => {
            setSwitch(val, 6);
            setDailyReminder(val);
          }}
          title={'Daily Reminder'}
          icon={undefined}
          backColor={undefined}
          style={undefined}
          onPress={undefined}
          isFirst={undefined}
        />

        <Space space={12} isDate={undefined} />

        {/* <SettingsCell title={'Rate Now'}  onPress={() => {goTo(urlAppStore)}} /> */}

        <SettingsCellwText
          isDarkModeOn={isDarkModeOn}
          isFirst={true}
          title={'Help & Feedback'}
          onPress={() => {
            goTo(urlSiteSupport);
          }}
          icon={undefined}
          backColor={undefined}
          style={undefined}
          isLast={undefined}
          isLogout={undefined}
          isLogged={undefined}
        />

        <LineBwCell
          isDarkModeOn={isDarkModeOn}
          isFull={undefined}
          isOnTask={undefined}
        />
        {/* <SettingsCell title={'Share The App'} onPress={() => {goTo(urlAppWeb)}}/> */}
        <SettingsCellwText
          isDarkModeOn={isDarkModeOn}
          isLast={true}
          title={'Official Website'}
          onPress={() => {
            goTo(urlSiteWillDoro);
          }}
          isPremium={undefined}
          isProfile={undefined}
          iconArrow={undefined}
          value={undefined}
          isTasksOn={undefined}
          isFirst={undefined}
          isSelected={undefined}
          isAddOn={undefined}
          isTasks={undefined}
          isSheetOn={undefined}
          isTaskDone={undefined}
        />

        <Space space={10} isDate={undefined} />

        <OpenURLButton ref={ref} />

        <StorageAsync ref={ref2} />
      </ScrollView>

      <OfferSheet
        pay={pay}
        isDarkModeOn={isDarkModeOn}
        ref={ref3}
        closeSheet={closeSheet}
      />
      {/* <StripeProvider
  publishableKey={publishableKey}
  merchantIdentifier={merchantIdentifier} // required for Apple Pay
  urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
>
  <PaymentScreen />
</StripeProvider> */}
    </SafeAreaView>
  );
};

export default Settings;
