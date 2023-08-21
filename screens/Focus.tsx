import React, {
  Fragment,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  FocusButton,
  FocusButtonPause,
  FocusButtonTask,
  FocusSlide,
  FocusSlideTask,
  SCREEN_HEIGHT,
  SessionsLeft,
  SettingsCellwText,
  styles,
  TaskHead,
  TaskInput,
  TaskTitle,
} from '../components/Utilities/Utilities';
import {
  DefaultPickerSessionNumber,
  getRemaining,
} from '../components/Functions/Functions';
import {
  examples,
  getData,
  getDataNumber,
  getDataString,
  setData,
} from '../components/Storage/Data';
import {FlatList, ImageBackground, Vibration, View} from 'react-native';
import {
  AppleButton,
  AppleButtonWithHighlight,
  CaretIcon,
  CaretIcon2,
} from '../components/Utilities/Utilities3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {
  Doro,
  Task,
  User,
  UserRealmContext,
} from '../components/Storage/MongoDB';
import uuid from 'react-native-uuid';
import {ring, setAllData, vibrateFor} from '../components/Functions/Functions2';
import {TasksSheet, TasksSheetRefProps} from '../components/OfferSheet';
import {useColorScheme} from 'react-native';
import {useObject, useQuery, useRealm, useUser} from '@realm/react';

const Focus = ({navigation}) => {
  //hooks

  const [remainingInSecs, setRemainingInSecs] = useState(getDataNumber('pomodoroLength')*60);
  const [remainingSecs, setRemainingSecs] = useState(getDataNumber('pomodoroLength')*60);
  const [remainingBreakSecs, setRemainingBreakSecs] = useState(getDataNumber('breakShortLength')*60);
  const [remainingLongBreakSecs, setRemainingLongBreakSecs] = useState(getDataNumber('breakLongLength')*60);
  const [alarmWork, setAlarmWork] = useState(getDataNumber('alarmWork'));
  const [alarmBreak, setAlarmBreak] = useState(getDataNumber('alarmBreak'));
  const [defaultDoroInt, setDefaultDoroInt] = useState(getDataNumber('defaultDoroInt'))
  const [defaultDoroStr, setDefaultDoroStr] = useState(getDataString('defaultDoroStr'))
  const [longSession, setLongSession] = useState();
  const [hasTaskSessionEnded, setHasTaskSessionEnded] = useState(false);
  const [isChoosingTheTask, setIsChoosingTheTask] = useState(false);
  const [taskChosen, setTaskChosen] = useState(false);
  const [isWritingTaskInput, setIsWritingTaskInput] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [isTaskModeOn, setIsTaskModeOn] = useState(true);
  const [isDoroModeOn, setIsDoroModeOn] = useState(false);
  const [didClickWrite, setDidClickWrite] = useState(false);
  const [didClick, setDidClick] = useState(false);
  const [sessionEnded, setSessionEnded] = useState(false);
  const [isVibrate, setIsVibrate] = useState(false);
  const [consecutiveSession, setConsecutiveSession] = useState(1);
  const [doroId, setDoroId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isBreakOn, setIsBreakOn] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [breakAfterLongLengthInt, setBreakAfterLongLengthInt] = useState(getDataNumber('breakAfterLongLength'))
  const [breakAfterLongLength, setBreakAfterLongLength] = useState(getDataNumber('breakAfterLongLength'))
  const {mins, secs} = getRemaining(remainingSecs);

  const [isLogged, setIsLogged] = useState(getDataString('isLogged') === 'true');
  const [doroData, setDoroData] = useState(examples);
  const email = getDataString('email');
  const [workAlarm, setWorkAlarm] = useState(getDataNumber('workAlarm'));
  const [breakAlarm, setBreakAlarm] = useState(getDataNumber('breakAlarm'));
  const [vibrate, setVibrate] = useState(getDataString('vibrate') === 'true');
  const [autoNext, setAutoNext] = useState(getDataString('autoNext') === 'true');
  const [autoBreak, setAutoBreak] = useState(getDataString('autoBreak') === 'true');
  const [darkMode, setDarkMode] = useState(getDataString('darkMode') === 'true');
  const [dailyReminder, setDailyReminder] = useState(getDataString('dailyReminder') === 'true');

  
  const user = useUser();
  const mongodb = user.mongoClient('mongodb-atlas');
  const users = mongodb.db('reactapp').collection<User>('users');


  const realm = useRealm();
  const myTask = useObject(Task, taskId);


  setAllData();

  useEffect(() => {

  const checkAppData = async (users, email) => {
      const user = await users.findOne({_id: email});
  
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
        setData('defaultDoroStr', uiser.defaultDoroStr);
        setData('isPremium', user.isPremium);
  
      setData('name', user.username);
        setData('email', user.useremail);
      };
  isLogged ? checkAppData(users, getDataString('email')) : 
    setIsLoading(false);
  
    }, []);
  
  useEffect(() => {
      let interval = null;
      if (hasStarted) {
        if (breakAfterLongLength == 0 && remainingSecs == 0 && isTaskModeOn) {
          taskSessionEnd();
          return;
        } else if (isBreakOn && remainingSecs == 0 && isTaskModeOn) {
          endTaskBreak();
          vibrateFor(isVibrate, 2);
        } else if (isBreakOn && remainingSecs == 0) {
          endBreak();
          newDoro();
          vibrateFor(isVibrate, 2);
        } else if (remainingSecs == 0 && isTaskModeOn) {
          endTaskSession();
          vibrateFor(isVibrate, 5);
        } else if (hasStarted && remainingSecs == 0) {
          endSession();
          console.log('session ended')
          vibrateFor(isVibrate, 5);
        }
  
        interval = setInterval(() => {
          setRemainingSecs(remainingSecs => remainingSecs - 300);
        }, 1000);
      } else if (!hasStarted && remainingSecs !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [hasStarted, remainingSecs]);
  
  useFocusEffect(
      React.useCallback(() => {
        resetAll();
        ref?.current?.scrollTo(100);
        getAll()
      }, []),
    );

  const resetAll = () => {
    setRemainingSecs(remainingInSecs);
    setHasTaskSessionEnded(false);
    setIsChoosingTheTask(false);
    setTaskChosen(false);
    setIsWritingTaskInput(false);
    setTaskName('');
    // setIsTaskModeOn(true)
    setIsDoroModeOn(false);
    setBreakAfterLongLength(getDataNumber(
  
    ))
    setIsBreakOn(false);
    setIsActive2(false);
    setIsActive3(false);
    setConsecutiveSession(1)
  };

  const getAll = () => {
    setIsLoading(true)
    
    setRemainingSecs(getDataNumber('pomodoroLength')*60)
    setRemainingInSecs(getDataNumber('pomodoroLength')*60)
    setRemainingBreakSecs(getDataNumber('breakShortLength')*60)
    setRemainingLongBreakSecs(getDataNumber('breakLongLength')*60)
    setAlarmWork(getDataNumber('workAlarm'))
    setAlarmBreak(getDataNumber('breakAlarm'))
    setVibrate(getDataString('vibrate') === 'true')
    setBreakAfterLongLengthInt(getDataNumber('breakAfterLongLength'))
    setBreakAfterLongLength(getDataNumber('breakAfterLongLength'))
    setAutoNext(getDataString('darkMode') === 'true')
    setAutoBreak(getDataString('autoBreak') === 'true')
    setAutoNext(getDataString('autoNext') === 'true')

    setIsLoading(false)
  }

  const newDoro = async () => {
    const newId = uuid.v4();
    setDoroId(newId);

    const timestamp = new Date().getTime();
    const endtime = timestamp + remainingSecs * 1000;

    realm.write(() => {
      realm.create('Doro', {
        _id: newId,
        startDate: new Date(),
        startTime: new Date(),
        endTime: new Date(endtime),
        length: remainingSecs / 60,
        breakLength: remainingBreakSecs / 60,
      });
    });
  };

  const newTask = async () => {
    const newId = uuid.v4();
    setTaskId(newId);

    const timestamp = new Date().getTime();
    const endtime = timestamp + remainingSecs * 1000;

    realm.write(() => {
      realm.create('Task', {
        _id: newId,
        taskName: taskName,
        startDate: new Date(),
        startTime: new Date(),
        endTime: new Date(endtime),
        length: remainingSecs / 60,
        breakLength: remainingBreakSecs / 60,
        sessionLength: breakAfterLongLength,
      });
    });
  };

  const endSession = () => {
    // if (myDoro) {
    //   realm.write(() => {
    //     myDoro.didFinish = true;
    //   });
    // }
    setConsecutiveSession(consecutiveSession + 1);
    console.log(consecutiveSession, breakAfterLongLength)
    ring(alarmBreak, 3);
    setRemainingSecs(
      consecutiveSession == breakAfterLongLength
        ? remainingLongBreakSecs
        : remainingBreakSecs,
    );
    consecutiveSession == breakAfterLongLength ? setConsecutiveSession(1) : {}

    setHasStarted(false);
    setIsBreakOn(true);
    setSessionEnded(true);

    if (autoBreak) {
      setHasStarted(true);
    }
  };

  const endTaskSession = () => {
    if(!isLogged){
    if (myTask && breakAfterLongLength == 1) {
      realm.write(() => {
        myTask.didFinish = true;
      });
    }
  } else {

  }


    setBreakAfterLongLength(breakAfterLongLength - 1);
    ring(alarmBreak, 3);
    setRemainingSecs(
      consecutiveSession == breakAfterLongLengthInt && breakAfterLongLengthInt != 1
        ? remainingLongBreakSecs
        : remainingBreakSecs,
    );
    setHasStarted(false);
    setIsBreakOn(true);
    setSessionEnded(true);

    if (autoBreak) {
      setHasStarted(true);
    }
  };

  const endBreak = () => {


    ring(alarmWork, 3);
    setRemainingSecs(remainingInSecs);
    setIsBreakOn(false);

    setHasStarted(false);

    if (autoNext) {
      setHasStarted(true);
    }

    // if (myDoro) {
    //   realm.write(() => {
    //     myDoro.didFinish = true;
    //     myDoro.didBreakEnd = true;
    //   });
    // }
  };

  const endTaskBreak = () => {
    ring(alarmWork, 3);
    setRemainingSecs(remainingInSecs);
    setConsecutiveSession(consecutiveSession + 1);
    setIsBreakOn(false);
    setHasStarted(false);

    if (autoNext) {
      setHasStarted(true);
    }
  };

  const taskSessionEnd = () => {
    setHasTaskSessionEnded(true);
    setIsTaskModeOn(false);
    setRemainingSecs(remainingInSecs);
    setIsBreakOn(false);
    setHasStarted(false);
  };

  const Toggle = () => {
    // if(isBreakOn){
    //     setHasStarted(true)
    // }

    if (isActive2) {
      setIsActive3(true);
    } else if (hasStarted) {
      setIsActive2(true);
      setHasStarted(false);
    }

    // else if(isBreakOn && !hasStarted) {
    //     setHasStarted(true)
    // }
    else if (hasStarted == false && isTaskModeOn) {
      newTask();
      setHasStarted(true);
    } else if (hasStarted == false) {
      newDoro();
      setHasStarted(true);
    }
  };

  const Reset = () => {
    setHasStarted(false);
    setIsActive2(false);
    setIsActive3(false);
    setRemainingSecs(remainingInSecs);
    setDidClick(false);
    setDidClickWrite(false);

    resetAll();
  };

  const Continue = () => {
    setHasStarted(true);
    setIsActive2(false);
    setIsActive3(false);
  };

  const openTaskMode = () => {

    console.log(isTaskModeOn)

    if (!isTaskModeOn) {
      setIsTaskModeOn(true);
    } else {
      setIsTaskModeOn(false);
    }
  };

  const chooseTask = () => {
    setIsChoosingTheTask(true);
  };

  const setClickedFirst = value => {
    setDidClick(true);

    if (breakAfterLongLength == 0) {
    }

    if (breakAfterLongLength == 1) {
      setDidClickWrite(true);
    }
  };

  const ref = useRef<TasksSheetRefProps>(null);
  const openSheet = useCallback(() => {
    ref?.current?.reset()
    ref?.current?.scrollTo(-400);
  }, []);

  const clickedToPlay = item => {
    setClickedFirst(1);
    setTaskName(item);
    setIsChoosingTheTask(true);
  };

  const setStartedWriting = () => {
    setClickedFirst(1);
  };

  return (

    isTaskModeOn  ?

      <SafeAreaView style={[styles.pageFocus]}>
        <CaretIcon
          isTaskModeOn={isTaskModeOn}
          mode={2}
          icon={'menu'}
          onPress={() => {
            navigation.navigate('Settings', {isLogged: isLogged});
          }}
        />
        <CaretIcon2
          isTaskModeOn={isTaskModeOn}
          isDoroModeOn={isDoroModeOn}
          onPress={() => {
            console.log('clicked')
            openTaskMode();
            if (isTaskModeOn) {
              resetAll();
            } else {

            }
          }}
        />
        <ImageBackground
          style={styles.pageFocusImage}
          source={examples[3].source}
          >
          <SessionsLeft
            hasTaskSessionEnded={hasTaskSessionEnded}
            taskChosen={taskChosen}
            value={breakAfterLongLength}
          />
          <TaskHead
            isChoosingTheTask={isChoosingTheTask}
            txt={'How many sessions for?'}
          />
          <DefaultPickerSessionNumber
            onPress={() => {
              setTaskChosen(true);
              setIsChoosingTheTask(false);
            }}
            onValueChange={val => {
              setBreakAfterLongLength(val);
              setBreakAfterLongLengthInt(val);
            }}
            value={breakAfterLongLength}
            isChoosingTheTask={isChoosingTheTask}
            values={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          />
          <TaskInput
            didClickWrite={didClick ? true : didClickWrite}
            isChoosingTheTask={isChoosingTheTask}
            taskChosen={taskChosen}
            onPress={() => {
              chooseTask();
            }}
            isWritingTaskInput={isWritingTaskInput}
            onChangeText={txt => {
              if (txt) {
                setIsWritingTaskInput(true);
                setTaskName(txt);
              } else {
                setIsWritingTaskInput(false);
              }
            }}
            title={'Write Down Here..'}
          />
          <View
            style={{
              position: 'relative',
              top: SCREEN_HEIGHT / 3,
              flexDirection: 'column',
              width: '100%',
              zIndex: 100,
            }}>
            <AppleButtonWithHighlight
              onPress={() => {
                openSheet();
              }}
              color={'#f48c06'}
              isPrimary={false}
              txt={'Choose a Task'}
              didClick={didClick}
            />
            <AppleButtonWithHighlight
              onPress={() => {
                setClickedFirst(1);
              }}
              isOnTask={false}
              color={'#f48c06'}
              isPrimary={false}
              didClick={didClick}
              txt={'Write Down A Task'}
            />
          </View>

        <View style={{display: didClickWrite ? 'flex' : 'none'}}>
            <FocusSlideTask
              isChoosingTheTask={isChoosingTheTask}
              taskChosen={taskChosen}
              hide={true}
              // subMin={() => {if(remainingSecs>500) { setRemainingSecs(remainingSecs - 300); setCount2(count2-300)}}}
              // addMin={() => {if(remainingSecs<3600) { setRemainingSecs(remainingSecs + 300); setCount2(count2+300)}}}
              onPress={() => {
                alert(doroData[0].name);
                Reset();
              ;}}
              minute={mins}
              seconds={secs}
              mode={doroData[0].name}
            />
          </View>

        <TaskTitle taskChosen={taskChosen} txt={taskName}/>

        <FocusButtonTask taskChosen={taskChosen} txt={'Start Task'} onPress={Toggle} isAction2={hasStarted} isAction={isActive2}/>
          <FocusButtonPause
            onPress1={Continue}
            onPress2={Reset}
            isAction2={isActive2}
            isAction={isActive3}
          />
          <TasksSheet
             email={email}
            isLog={isLogged}
            setStartedWriting={setStartedWriting}
            clickedToPlay={clickedToPlay}
            ref={ref}
          />
        </ImageBackground>
      </SafeAreaView> 
  : 
        <SafeAreaView style={styles.pageFocus}>
        <CaretIcon
          isTaskModeOn={isTaskModeOn}
          isLeft={true}
          icon={'menu'}
          onPress={() => {
            navigation.navigate('Settings', {isLogged: isLogged});
          }}
        />
        <CaretIcon2
          isTaskModeOn={isTaskModeOn}
          isDoroModeOn={isDoroModeOn}
          onPress={() => {
            setIsTaskModeOn(!isTaskModeOn);
          }}
        />
        <ImageBackground
          style={styles.pageFocusImage}
          source={examples[3].source}>
          <FocusSlide
            hide={true}
            // subMin={() => {if(remainingSecs>500) { setRemainingSecs(remainingSecs - 300); setCount2(count2-300)}}}
            // addMin={() => {if(remainingSecs<3600) { setRemainingSecs(remainingSecs + 300); setCount2(count2+300)}}}
            onPress={() => {
              alert(doroData[0].name);
              Reset();
            ;}}
            minute={mins}
            seconds={secs}
            mode={doroData[0].name}
          />
          <FocusButton
            isLoading={isLoading}
            onPress={Toggle}
            isAction2={hasStarted}
            isAction={isActive2}
          />
          <FocusButtonPause
            onPress1={Continue}
            onPress2={() => {
              Reset();
              resetAll();
            }}
            isAction2={isActive2}
            isAction={isActive3}
          />
        </ImageBackground>
        <TasksSheet ref={ref} />
      </SafeAreaView>
);
};;

export default Focus;
