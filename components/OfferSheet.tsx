import React, {useState, useCallback, useEffect, useRef, useImperativeHandle, createContext, Component} from 'react';
import { Text, View, Dimensions, StyleSheet, TextInput, Image, Share, Linking, Alert, TouchableOpacity, PermissionsAndroid, FlatList } from 'react-native';
import {  GestureDetector } from 'react-native-gesture-handler';
import { GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';
import { horizontalScale, verticalScale, moderateScale, verticalScaleAnti } from '../components/Metrics';
import { useFocusEffect } from '@react-navigation/native';
import { SheetTitle, BackButton, FeaturesBox, SubsBox, AppleButton, BottomTexts, TextButtonSh, ButtonWSheet } from './Utilities/Utilities3';
import { LineBwCell, Space, TaskCnt, TaskCntCnt, WhatDay } from './Utilities/Utilities';
import { privacypolicy, termsofservice } from './Storage/Data';
import { FlashList } from '@shopify/flash-list';
import { Task, UserRealmContext } from './Storage/MongoDB';
import { dates, getDate } from './Data';
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window')

export type OfferSheetRefProps = {
    scrollTo: (destination: number)=> void
}

interface ChildProps {
    closeSheet: Function
    isDarkModeOn: boolean
    pay: Function
}

export const OfferSheet = React.forwardRef<OfferSheetRefProps, BottomSheetProps>( (props: ChildProps, ref) => {

  const translateY = useSharedValue(0)
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2

  const [isActiveSub1, setIsActiveSub1] = useState(true)
  const [isActiveSub2, setIsActiveSub2] = useState(false)
  
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, { damping: 2000 })
  }, [])
  
  useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo])

  const context = useSharedValue({ y: 0 })
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: translateY.value }
  })
  .onUpdate((event) => {
    // translateY.value = event.translationY + context.value.y
    // translateY.value = Math.max(translateY.value, - MAX_TRANSLATE_Y)
  })
  .onEnd(() => {
    // if(translateY.value > -SCREEN_HEIGHT ) {
    //   scrollTo(60)
    // } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
    //   scrollTo(MAX_TRANSLATE_Y)
    // }
  })
  
  const initialValue = '';
  const reference = useRef(initialValue);
  const reference2 = useRef(initialValue);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [-MAX_TRANSLATE_Y + 1000, -MAX_TRANSLATE_Y/1.5],
      [40, 15],  
      Extrapolate.CLAMP
      )
      
      return {
        borderRadius,
        transform: [{translateY: translateY.value}]
      }
    })   

  const goTo = useCallback(async (url) => {
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log(`Don't know how to open this URL: ${url}`);
      }
    }, [])


    const measureView = (event) => {
      console.log('event peroperties: ', event);
      // setState({
      //         x: event.nativeEvent.layout.x,
      //         y: event.nativeEvent.layout.y,
      //         width: event.nativeEvent.layout.width,
      //         height: event.nativeEvent.layout.height
      //     })
      }
    
      

      return (
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.offerSheet, rBottomSheetStyle, {backgroundColor: props.isDarkModeOn ? 'black' : '#f2f2f6', }]}>

                <BackButton onPress={() => {scrollTo(60); props.closeSheet()}} />
                <SheetTitle isDarkModeOn={props.isDarkModeOn}/>
                <Space space={5}/>
                <FeaturesBox  isDarkModeOn={props.isDarkModeOn}/>
                <SubsBox isDarkModeOn={props.isDarkModeOn} txt1={'Annual'} txt2={'SAVE 31%'} txt21={'$8.33 / month'} txt31={'Billed as one payment of $99.99'} isActive={isActiveSub1} onPress={() => {setIsActiveSub1(true); setIsActiveSub2(false)}} isThirdRowDisabled={false}/>
                <SubsBox isDarkModeOn={props.isDarkModeOn} txt1={'Monthly'} txt21={'$9.99 / month'} isActive={isActiveSub2} onPress={() => {setIsActiveSub2(true); setIsActiveSub1(false)}} isBorderDisabled={true} isThirdRowDisabled={true}/>
                <AppleButton onPress={() => {props.pay()}} isDarkModeOn={props.isDarkModeOn} color={'#007AFF'} txt={'Start Free Trial (7 Days)'} isPrimary={true}/>
                <AppleButton onPress={() => {scrollTo(60); props.closeSheet()}} isDarkModeOn={props.isDarkModeOn} color={'#007AFF'} txt={'Decline Free Trial'} isPrimary={false}/>
                <BottomTexts isRestore={true} txt1={'Restore Purchases'} txt2={'Privacy Policy'} txt3={'Terms of Service'} onPress2={() => {goTo(privacypolicy)}} onPress3={() => {goTo(termsofservice)}} />
                <Space space={15}/>

            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
        )
      })

export type ButtonSheetRefProps = {
    scrollTo: (destination: number)=> void
}

interface ChildPropsEdit {
    closeSheet: Function
    isDarkModeOn: boolean
}

export const ButtonSheet = React.forwardRef<OfferSheetRefProps, BottomSheetProps>( (props: ChildPropsEdit, ref) => {

  const translateY = useSharedValue(0)
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2

  const [isActiveSub1, setIsActiveSub1] = useState(true)
  const [isActiveSub2, setIsActiveSub2] = useState(false)
  
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, { damping: 10000 })
  }, [])
  
  useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo])

  const context = useSharedValue({ y: 0 })
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: translateY.value }
  })
  .onUpdate((event) => {
    // translateY.value = event.translationY + context.value.y
    // translateY.value = Math.max(translateY.value, - MAX_TRANSLATE_Y)
  })
  .onEnd(() => {
    // if(translateY.value > -SCREEN_HEIGHT ) {
    //   scrollTo(60)
    // } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
    //   scrollTo(MAX_TRANSLATE_Y)
    // }
  })
  
  const initialValue = '';
  const reference = useRef(initialValue);
  const reference2 = useRef(initialValue);
  
    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [-MAX_TRANSLATE_Y + 1000, -MAX_TRANSLATE_Y/1.5],
        [40, 15],
        Extrapolate.CLAMP
        )
        
        return {
          borderRadius,
          transform: [{translateY: translateY.value}]
        }
      }) 
      
      useEffect(() => {
        scrollTo(100)
      }, [])
      
      const optionsCamera = {

    //   storageOptions: {
    //   skipBackup: true,
    //   path: 'images',

    // },

      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      quality: 0.8,
      presentationStyle: 'pageSheet', 
      selectionLimit: 1
  };
      const launchCamera = async () => {
    
            await ImagePicker.launchCamera(optionsCamera,
            (response) => {
              console.log(response);
            },
          )
  }

  const optionsLibrary = {


    storageOptions: {
    skipBackup: true,
    path: 'images',

  },

};

    const launchLibrary = async () => {
  
      ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
      },
      (response) => {
        console.log(response);
        
      },
    )
  
}
  
  return (
        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.buttonSheet, rBottomSheetStyle]}>
              <View style={{justifyContent: 'space-between', flexDirection: 'column', height: SCREEN_HEIGHT / 3}}>
              <Space space={5}/>
              <TextButtonSh isDarkModeOn={props.isDarkModeOn} title1={'Take Photo'} title2={'Choose Photo'} title3={'Browse...'}  title4={'Cancel'}  isFirst={true} isLast={true} onPress1={() => {launchCamera()}} onPress2={() => {launchLibrary()}}  onPress4={() => {scrollTo(60);  props.closeSheet()}}/>
              </View>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
        )
      })

export type   ConfirmSheetRefProps = {
  scrollTo: (destination: number)=> void
}

interface ChildPropsLogout {
  closeSheet2: Function
  isDarkModeOn: boolean
  logordelete: number
  deleteAccount: Function
  logout: Function
  delete: Function
  deleteTask: Function
}

export const ConfirmSheet = React.forwardRef<ConfirmSheetRefProps>( (props: ChildPropsLogout, ref2) => {

const translateY = useSharedValue(0)
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2

const [isActiveSub1, setIsActiveSub1] = useState(true)
const [isActiveSub2, setIsActiveSub2] = useState(false)

const scrollTo = useCallback((destination: number) => {
  'worklet';
  translateY.value = withSpring(destination, { damping: 10000 })
}, [])

useImperativeHandle(ref2, () => ({ scrollTo }), [scrollTo])

const context = useSharedValue({ y: 0 })
const gesture = Gesture.Pan()
.onStart(() => {
  context.value = { y: translateY.value }
})
.onUpdate((event) => {
  // translateY.value = event.translationY + context.value.y
  // translateY.value = Math.max(translateY.value, - MAX_TRANSLATE_Y)
})
.onEnd(() => {
  // if(translateY.value > -SCREEN_HEIGHT ) {
  //   scrollTo(60)
  // } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
  //   scrollTo(MAX_TRANSLATE_Y)
  // }
})

const initialValue = '';
const reference = useRef(initialValue);
const reference2 = useRef(initialValue);

  const rBottomSheetStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      translateY.value,
      [-MAX_TRANSLATE_Y + 1000, -MAX_TRANSLATE_Y/1.5],
      [15, 15],
      Extrapolate.CLAMP
      )
      
      return {
        borderRadius,
        transform: [{translateY: translateY.value}]
      }
    })   

    useEffect(() => {
      scrollTo(100)
    },[])

    const logOrDelete = (value) => {
      if(value == 0) {
        props.logout()
      } else if(value == 1) {
        props.deleteAccount()
      }
    }
    

return (
      <GestureHandlerRootView>
        <GestureDetector gesture={gesture}>
          <Animated.View style={[styles.confirmSheet, rBottomSheetStyle, {backgroundColor: props.isDarkModeOn ? '#1c1c1e' : 'white'}]}>
            <View style={{justifyContent: 'center', flexDirection: 'column'}}>
            <Space space={5}/>
            <ButtonWSheet isDarkModeOn={props.isDarkModeOn} onPress1={() => {scrollTo(100); props.closeSheet2()}} onPress2={() => {props.deleteTask(); scrollTo(100); props.closeSheet2(); logOrDelete(props.logordelete)}} btn1={'Cancel'} btn2={props.logordelete == 0 ? 'Sign Out' : props.logordelete == 2 ? 'Delete Task' :  'Delete Account'} />
            </View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
      )
    })

export type   TasksSheetRefProps = {
  scrollTo: (destination: number)=> void
}

interface ChildPropsFocusSheet {
  closeSheet: Function
  isDarkModeOn: boolean
  clickedToPlay: Function
  setStartedWriting: Function
}

export const TasksSheet = React.forwardRef<TasksSheetRefProps>( (props: ChildPropsFocusSheet, ref2) => {

  const translateY = useSharedValue(0)
  const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2
  
  
  const [isDate, setIsDate] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [items, setItems] = useState([])
  const {useRealm, useQuery, useObject} = UserRealmContext;
  const allTasks = useQuery(Task)
  const realm = useRealm()
  const savedTasks = allTasks.filtered('isForFuture == true')
  const [isActiveSub1, setIsActiveSub1] = useState(true)
  const [isActiveSub2, setIsActiveSub2] = useState(false)
  const [choosingTask, setCoosingTask] = useState(true)
  const [currentDate, setCurrentDate] = useState(dates[0].name)
  
  const scrollTo = useCallback((destination: number) => {
    'worklet';
    translateY.value = withSpring(destination, { damping: 10000 })
  }, [])
  
  useImperativeHandle(ref2, () => ({ scrollTo }), [scrollTo])
  
  const context = useSharedValue({ y: 0 })
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: translateY.value }
  })
  .onUpdate((event) => {
    // translateY.value = event.translationY + context.value.y
    // translateY.value = Math.max(translateY.value, - MAX_TRANSLATE_Y)
  })
  .onEnd(() => {
    // if(translateY.value > -SCREEN_HEIGHT ) {
    //   scrollTo(60)
    // } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
    //   scrollTo(MAX_TRANSLATE_Y)
    // }
  })

  useEffect(() => {
    const getTaskss = async () => {
        await getTasks()
     };
     getTasks(currentDate)
     getTaskss()
    }, [])

  const initialValue = '';
  const reference = useRef(initialValue);
  const reference2 = useRef(initialValue);
  
    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [-MAX_TRANSLATE_Y + 1000, -MAX_TRANSLATE_Y/1.5],
        [15, 15],
        Extrapolate.CLAMP
        )
        
        return {
          borderRadius,
          transform: [{translateY: translateY.value}]
        }
      }) 
      
      function containsNumbers(str) {
        return /\d/.test(str);
      }  
  
    useEffect(() => {
      scrollTo(1000)
    },[])

    const getTasks = async (date) => {
      const savedTasks = allTasks.filtered('isForFuture == true')
      savedTasks.map((item) => {

        console.log(date, 'currentDate')
        console.log(getDate(item.startDate), 'getDate(item.startDate)')
        if(getDate(item.startDate) == date) {
          setItems(arr => [...arr, {id: arr.length + 1, _id: item._id, name: item.taskName, date: getDate(item.startDate), didFinish: item.didFinish}])
          if(item){
              setIsLoading(false)
          }
        } else if (containsNumbers(getDate(item.startDate)) && currentDate == 'Planned'){
          setItems(arr => [...arr, {id: arr.length + 1, _id: item._id, name: item.taskName, date: getDate(item.startDate), didFinish: item.didFinish}])
        }
  })
      

      

    }

    // const getDate = (date: Date) => {
    //   const today = new Date();

    //   const today2 = new Date();
    //   today2.setDate(today.getDate() + 1)
    //   today2.setHours(0,0,0,0)

    //   const tomorrow = new Date(today)
    //   tomorrow.setDate(today.getDate() + 2)
    //   tomorrow.setHours(0,0,0,0)
      
      
    //   const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    //   const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    //   const dayName = date.toLocaleString('default', { month: 'long' })
      

    //   if((today.getDay() + today.getMonth()) == date.getDay() + 1 + date.getMonth()){
    //       return 'Today'
    //   }

    //   else if(today2.getTime() < date.getTime() && date.getTime() < tomorrow.getTime()){

    //       return 'Tomorrow'

    //   }

    //   else if(firstDay.getTime() <= date.getTime() && date.getTime() <= lastDay.getTime() ){


    //       return 'This Week'

    //   }

    //   else if(date.getTime() > today.getTime()) {
          

    //       return dayName + ' ' + date.getDate()
          
      
    //   }
      
    // }
    
   
    
    const renderItem = ({ item, index }, onClick) => {

          return (

               !isLoading && index !== items.length-1 ? 

              <View>
                <TaskCntCnt onPressPlay={() => {props.clickedToPlay(item.name); scrollTo(100);}} coosingTask={choosingTask} onPress={() =>{}} isDate={true} title={item.name} />
              </View>
              
              :
              !isLoading 
              ?
              
              <View>
              <TaskCntCnt onPressPlay={() => {props.clickedToPlay(item.name); scrollTo(100);}} coosingTask={choosingTask} onPress={() =>{}} isDate={true} title={item.name} />
            </View>
              
      :
  <View></View>
          
          );
    };
        
    const renderItem2 = ({ item, index }, onClick) => {
        
      return (
        index !== 3 ? 
            <View>
              <TaskCnt isSelected={item.name == currentDate ? true : false} coosingTask={choosingTask} onPress={() => { setTimeout(function() { flatlistRef.current.scrollToIndex({ index: 0, animated: true }); },400); setCurrentDate(item.name); setCoosingTask(true); setItems([]); getTasks(item.name); }}isDate={true} title={item.name} />
              <LineBwCell  isOnTask={true} isDarkModeOn={false} isFull={true} />
            </View>
:
          <View>
          <TaskCnt isSelected={item.name == currentDate ? true : false} coosingTask={choosingTask} onPress={() => {  setCurrentDate(item.name); setCoosingTask(true); setItems([]); getTasks(item.name); setTimeout(function() { flatlistRef.current.scrollToIndex({ index: 0, animated: true }); },200);}} isDate={true} title={item.name} />
          </View>
        );

      };

    const DateList = () => {
      return (
        <View style={{height: 280, width: Dimensions.get("screen").width}}>
          <FlashList renderItem={(v) =>renderItem2(v, () => {})} estimatedItemSize={10} data={dates} extraData={`${isLoading}`}>
          </FlashList>
        </View>
      )
    }

    const TaskList = () => {
      return (
        <View style={{height: 280, width: Dimensions.get("screen").width}}>
          <FlashList renderItem={(v) =>renderItem(v, () => {})} estimatedItemSize={10}data={items}extraData={`${isLoading} + ${items.length} + ${currentDate}`}>
          </FlashList> 
        </View>
      )
    }

    const twoLists = [1,2]

    const renderItems = ({ item, index }) => {


      if(index == 0) {
        return (
          <TaskList />
        )
      }

      if(index == 1) {
        return (
          <DateList />
        )
      }

      
    }

    currentFlatlistIndex = useRef(null)
    const flatlistRef = useRef()

  return  (

        <GestureHandlerRootView>
          <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.tasksSheet, rBottomSheetStyle, {backgroundColor: props.isDarkModeOn ? '#1c1c1e' : 'white'}]}>
              <View style={{justifyContent: 'center', flexDirection: 'column', opacity: 20, zIndex: 20}}>
              {/* <BackButton onPress={() => {scrollTo(60)}} /> */}
              <Space isDate={isDate} space={6}/>
              <WhatDay onPressPlus={() => {scrollTo(100); props.setStartedWriting()}} coosingTask={choosingTask} date={currentDate} onPressDate={() => {setCoosingTask(false); flatlistRef.current.scrollToIndex({ index: 1, animated: true })}} onPressBack={() => {if(choosingTask){scrollTo(100)} else {flatlistRef.current.scrollToIndex({ index: 0, animated: true }); setCoosingTask(true); setItems([]); getTasks()}}} isDate={isDate} />
            <View style={{height: SCREEN_HEIGHT/2, width: SCREEN_WIDTH}}>
              <FlashList estimatedItemSize={306} ref={flatlistRef}  pagingEnabled={true} data={twoLists} renderItem={renderItems} horizontal={true} keyExtractor={(item) => item} extraData={`${items.length}`} showsHorizontalScrollIndicator={false}>
              </FlashList>
            </View>
              
              </View>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>

        )

      })

const styles =  StyleSheet.create({
  bottomSheet : {
    width: '96%', 
    backgroundColor: 'black', 
    alignSelf: 'center', 
    opacity: 3,
    zIndex: 2,
    position: 'absolute',
    bottom: -SCREEN_HEIGHT + 30
  },
  buttonSheet : {
    width: '96%', 
    backgroundColor: 'transparent', 
    alignSelf: 'center', 
    opacity: 3,
    zIndex: 2,
    position: 'absolute',
    height: SCREEN_HEIGHT / 5,
  },
  confirmSheet : {
    width: '96%', 
    backgroundColor: '#1c1c1e', 
    alignSelf: 'center', 
    opacity: 3,
    zIndex: 2,
    position: 'absolute',
    height: SCREEN_HEIGHT / 10,
  },
  tasksSheet : {
    width: '100%', 
    backgroundColor: 'black', 
    alignSelf: 'center', 
    opacity: 300,
    zIndex: 200,
    position: 'absolute',
    top : SCREEN_HEIGHT - 40,
    paddingBottom: 200 ,
  },    
  offerSheet : {
    width: '96%', 
    backgroundColor: 'black', 
    alignSelf: 'center', 
    opacity: 3,
    zIndex: 2,
    position: 'absolute',
    bottom: -SCREEN_HEIGHT + 15 
  }
})