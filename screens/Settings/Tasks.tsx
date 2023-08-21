import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BreakCell,
  Header,
  LineBwCell,
  renderLeftActions,
  renderRightActions,
  SettingsCellwText,
  styles,
  Swipe,
  TaskInput,
  TasksInput,
} from '../../components/Utilities/Utilities';
import {FlashList} from '@shopify/flash-list';
import DatePicker from 'react-native-date-picker';
import {Task, UserRealmContext, useRealmContext} from '../../components/Storage/MongoDB';
import uuid from 'react-native-uuid';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import {ConfirmSheet} from '../../components/OfferSheet';
import {useApp, useQuery, useRealm, useUser} from '@realm/react';
import { useObject} from '@realm/react';
import { getDataString } from '../../components/Storage/Data';

const Tasks = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const {isDarkModeOn, email} = route.params;
  const [taskName, setTaskName] = useState('');
  const [isAddOn, setIsAddOn] = useState(false);
  const [isAddOn0, setIsAddOn0] = useState(false);
  const [isDateAdding, setIsDateAdding] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(true);
  const [isSheetOn, setIsSheetOn] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedId, setSelectedId] = useState(0);

  const [isLog, setIsLog] = useState(false)
  const getIs = () => {
    try{
      setIsLog(getDataString('isLogged') === 'true')
    }catch(err){
      console.log(err)
    }
  }

  const [sortedItems, setSortedItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // const getTaskss = async () => {
    //   // sortItems()
    // };
    getIs()
    
    isLog ? getTasksApp : getTasksRealm();

  }, []);

  // const user = isLog ? useUser() : 'AS'


  const getTasksApp = async () => {
    // const mongodb = user.mongoClient('mongodb-atlas');
    // const alltasks = mongodb.db('reactapp').collection<Task>('tasks');
    
    // if (mytasks.length > 0) {
    //   mytasks.map(item => {
   
    // timeNow >  item.startDate.getTime() ? setItems(arr => [
    //   ...arr,
    //   {
    //     id: arr.length + 1,
    //     _id: item._id,
    //     name: item.taskName,
    //     date: getDate(item.startDate),
    //     didFinish: item.didFinish,
    //     ms: date.getTime(),
    //   },
    // ]) : {}

    // if(item){
    //   setIsLoading(false)
    // }

    //   });
    // }

    // const sorted = [...items].sort((a, b) => a.ms - b.ms);
    // setSortedItems(sorted);
  };

  const setDone = () => {
    setIsSheetOn(false);
  };

  const ref = useRef(null);
  const row: Array<any> = [];
  let prevOpenedRow;

  const Add = () => {
    setIsAddOn(true);

    if (isAddOn) {
      // setIsAddOn(false)
      setOpen(true);
      setIsDateAdding(true); 
    } else {
      setIsAddOn(true);
    }
  };

  const realm = useRealm()

  const addToApp = async (name, date) => {
      // try {
      //   const result = await alltasks.insertOne({
      //     _id: uuid.v4(),
      //     taskName: name,
      //     // isForFuture: true,
      //     length: 0,
      //     breakLength: 0,
      //     sessionLength: 0,
      //     startTime: date,
      //     endTime: date,
      //     createdBy: email,
      //   });

      //   console.log(result);

      //   await navigation.navigate('Sign', {_dark: isDarkModeOn});
      // } catch (err) {
      //   console.log('Security Error', err);
      // }
  };

  const getTime = async (date: Date) => {
    const today = new Date();

    const today2 = new Date();
    today2.setDate(today.getDate() + 1);
    today2.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 2);
    tomorrow.setHours(0, 0, 0, 0);

    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDay = new Date(
      today.setDate(today.getDate() - today.getDay() + 6),
    );

    const dayName = date.toLocaleString('default', {month: 'long'});

    if (
      today.getDay() + today.getMonth() ==
      date.getDay() + 1 + date.getMonth()
    ) {
      if (taskName != '') {
        setItems(arr => [
          ...arr,
          {id: arr.length + 1, name: taskName, date: 'Today'},
        ]);
      }

      isLog ? addToApp(taskName, date) : addToRealm(taskName, date);
    } else if (
      today2.getTime() < date.getTime() &&
      date.getTime() < tomorrow.getTime()
    ) {
      if (taskName != '') {
        setItems(arr => [
          ...arr,
          {id: arr.length + 1, name: taskName, date: 'Tomorrow'},
        ]);
      }

      isLog ? addToApp(taskName, date) : addToRealm(taskName, date);
    } else if (
      firstDay.getTime() <= date.getTime() &&
      date.getTime() <= lastDay.getTime()
    ) {
      if (taskName != '') {
        setItems(arr => [
          ...arr,
          {id: arr.length + 1, name: taskName, date: 'This Week'},
        ]);
      }

      isLog ? addToApp(taskName, date) : addToRealm(taskName, date);
    } else if (date.getTime() > today.getTime()) {
      if (taskName != '') {
        setItems(arr => [
          ...arr,
          {
            id: arr.length + 1,
            name: taskName,
            date: dayName + ' ' + date.getDate(),
          },
        ]);
      }

      isLog ? addToApp(taskName, date) : addToRealm(taskName, date);
    }
  };

  const getDate = (date: Date) => {
    const today = new Date();
    const today3 = new Date();
    today.setDate(today.getDate());

    const today2 = new Date();
    today2.setDate(today.getDate() + 1);
    today2.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 2);
    tomorrow.setHours(0, 0, 0, 0);

    const firstDay = new Date(
      today3.setDate(today3.getDate() - today3.getDay()),
    );
    const lastDay = new Date(
      today3.setDate(today3.getDate() - today3.getDay() + 6),
    );

    const dayName = date.toLocaleString('default', {month: 'long'});

    if (date.getFullYear() > today.getFullYear()) {
      return dayName + ' ' + date.getDate() + ' ' + date.getFullYear();
    } else if (
      today.getDate() + today.getMonth() ==
      date.getDate() + date.getMonth()
    ) {
      return 'Today';
    } else if (
      today2.getTime() < date.getTime() &&
      date.getTime() < tomorrow.getTime()
    ) {
      return 'Tomorrow';
    } else if (
      firstDay.getTime() <= date.getTime() &&
      date.getTime() <= lastDay.getTime()
    ) {
      return 'This Week';
    } else if (date.getTime() > today.getTime()) {
      return dayName + ' ' + date.getDate();
    }
  };

  const ref2 = useRef();
  const openLogoutSheet = useCallback(() => {
    setIsSheetOn(true);
    ref2?.current?.scrollTo(-40);
  }, []);

  const closeSheet2 = async () => {
    setTimeout(function () {
      //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
      setIsSheetOn(false);
      setSelectedIndex(1000);
    }, 200);
  };

  const tasks = useQuery(Task)
  const getTasksRealm = async () => {

    const timeNow = new Date()
    console.log(timeNow)
    timeNow.setDate(timeNow.getDate())
    console.log(timeNow)
    timeNow.setHours(0,0,0,0)
    console.log(timeNow)

    
    try{
      
      const tasksForFuture = tasks.filtered('isForFuture == true');
      
      setItems([])
      
      if (tasksForFuture.length > 0) {
        
        
        tasksForFuture.map(item => {
          console.log(timeNow, item.startDate)
          timeNow.getTime() <  item.startDate.getTime() ? setItems(arr => [
            ...arr,
            {
              id: arr.length + 1,
              _id: item._id,
              name: item.taskName,
              date: getDate(item.startDate),
              didFinish: item.didFinish,
              ms: date.getTime(),
            },
          ]) : 

            // realm.write(() => {
            //   realm.delete(item);
            // })
          
            console.log(item)

  
          if(item){
            setIsLoading(false)
          }
  
        });
      }
    }catch(err){
      console.log('er',err)
    }


    // const sorted = [...items].sort((a, b) => a.ms - b.ms);
    // setSortedItems(sorted);
  };

  const addToRealm = async (name, date) => {

    console.log('name',name)

    try {
        
      realm.write(() => {
        realm.create('Task', {
          _id: uuid.v4(),
          taskName: name,
          isForFuture: true,
          length: 0,
          breakLength: 0,
          sessionLength: 0,
          startDate: date,
          startTime: date,
          endTime: date,
          createdBy: email,
                  });
      });


    } catch (err) {
      console.log('Security Error', err);
    }
  }

  const deleteTaskRealm = () => {
    try{

      const taskwillbedeleted = useObject(Task, selectedId);

      realm.write(() => {
        realm.delete(taskwillbedeleted);
      });
  
      items.map(item => {});
  
      setItems(items.filter(item => `${item._id}` !== `${selectedId}`));
    }
    catch(err){
      console.log(err)
    }

  };

  const deleteTaskApp = async () => {

    const mongodb = user.mongoClient('mongodb-atlas');
    const alltasks = mongodb.db('reactapp').collection<Task>('tasks');
    const result = await alltasks.deleteOne({ _id: selectedId });

    setItems(items.filter(item => `${item._id}` !== `${selectedId}`));
  };

  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  const renderItem = ({item, index}, onClick) => {
    const closeRow = index => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      prevOpenedRow = row[index];
    };

    return !isAddOn && !isLoading ? (
      <GestureHandlerRootView>
        <Swipeable
          ref={ref => (row[index] = ref)}
          renderLeftActions={(progress, dragX) =>
            renderLeftActions(progress, dragX, onClick, item, items)
          }
          onSwipeableOpen={() => closeRow(index)}>
          <SettingsCellwText
            // isSelected={selectedIndex}
            isSheetOn={isSheetOn}
            onPress={() => {
              openLogoutSheet();
              setSelectedIndex(index);
              setSelectedId(item._id);
            }}
            isTasks={true}
            isAddOn={false}
            isDarkModeOn={isDarkModeOn}
            // onPress={() => {ring(item.id-1); setSelectedId(item.id)}}
            title={`${item.name}`}
            value={`${item.date}`}
            isFirst={item.id == 1 ? true : false}
            isLast={index + 1 == items.length ? true : false}
            isSelected={index == selectedIndex ? true : false}
            isTaskDone={item.didFinish}
            isPremium={undefined}
            isProfile={undefined}
            iconArrow={undefined}
            isTasksOn={undefined}
          />

          <View style={{opacity: item.id == items.length ? 0 : 1}}>
            <LineBwCell
              isOnTask={true}
              isSheetOn={isSheetOn}
              isDarkModeOn={isDarkModeOn}
            />
          </View>
        </Swipeable>
      </GestureHandlerRootView>
    ) : (
      <View></View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.pageBreak,
        {
          backgroundColor:
            isDarkModeOn && !isSheetOn
              ? 'black'
              : isSheetOn && isDarkModeOn
              ? '#1c1c1e'
              : isSheetOn
              ? 'gray'
              : '#f2f2f6',
        },
      ]}>
      <Header
        isAddOn0={isAddOn0}
        isAddOn={isAddOn}
        isWriting={true}
        isOnChange={true}
        isOnTask={true}
        isDarkModeOn={isDarkModeOn}
        isSheetOn={isSheetOn}
        onPress={async () => {
          await navigation.goBack();
        }}
        onPress2={() => {
          Add();
          setIsAddOn0(true);
          // getTasks()
        }}
        isSubtle={false}
        title={'Tasks'}
        color={undefined}
        opacity={undefined}
        isBorderOk={undefined}
      />
      <TasksInput
        open={open}
        isDateAdding={isDateAdding}
        isAddOn={isAddOn}
        title={'Enter task name.'}
        onChangeText={txt => {
          if (txt) {
            setTaskName(txt);
            if (txt.trim()) {
              setIsAddOn0(false);
            }
          } else {
            setIsAddOn0(true);
          }
        }}
        isOnTask={true}
        isWritingTaskInput={undefined}
        taskChosen={undefined}
        onPress={undefined}
      />
      <DatePicker
        theme={isDarkModeOn ? 'dark' : 'light'}
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setIsAddOn(false);
          setIsAddOn0(false);
          setIsDateAdding(false);
          setDate(date);
          getTime(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <FlashList
        renderItem={v =>
          renderItem(v, () => {
            closeRow(v.item.id);

            // isLog ? deleteTaskApp(v.item._id) : deleteTaskRealm(v.item._id)
          })
        }
        estimatedItemSize={10}
        data={items}
        extraData={`${selectedIndex} + ${isAddOn} + ${items.length} + ${open}`}></FlashList>

      <ConfirmSheet
        deleteTask={isLog ? deleteTaskApp : deleteTaskRealm}
        deleteAccount={setDone}
        logordelete={2}
        isDarkModeOn={isDarkModeOn}
        ref={ref2}
        closeSheet2={closeSheet2}
      /> 
    </SafeAreaView>
  );
};

export default Tasks;
