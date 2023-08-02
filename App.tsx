// import 'react-native-gesture-handler'
//native
import React, { useEffect } from 'react';
import {  Text } from 'react-native';

//icons
import Icon from 'react-native-vector-icons/Ionicons'

//navigators
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { UserRealmContext} from './components/Storage/MongoDB';
const {RealmProvider} = UserRealmContext;    

//database
import { AppProvider } from '@realm/react';

//navigators
const Stack  = createNativeStackNavigator()
const Tab = createBottomTabNavigator();

//screens
import Focus from './screens/Focus';
import Settings from './screens/Settings';  

import AlarmBreak from './screens/Settings/AlarmBreak';
import AlarmWork from './screens/Settings/AlarmWork';
import Forget from './screens/Auth/Forget';
import ForgetNew from './screens/Auth/ForgetNew';
import Change from './screens/Settings/Profile/Change';
import Profile from './screens/Settings/Profile';
import Sign from './screens/Auth/Sign';
import Signup from './screens/Auth/Signup';
import Tasks from './screens/Settings/Tasks';
import FBLogin from './screens/Auth/FBLogin';
import { GoogleLogin } from './screens/Auth/GoogleLogin';
import { Platform } from 'react-native';

const Tabs = ({route}: { route: any}) => {

  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle:{backgroundColor: 'transparent',position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0},
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color, size }) => {

            if (route.name === 'Focus') {
              return <Icon name='home-outline' size={size} color={
                focused
                  ? 'white'
                  : '#6C6A66'
              } />;
            } 
            else if (route.name === 'Settings') {
              return <Icon name='settings-outline' size={size} color={
                focused
                  ? 'black'
                  : '#6C6A66'
              } />;}
          },
          // tabBarStyle:{backgroundColor: route.name === 'Home' || 'Settings' ? 'white' : 'white'},

        })}
      >
    
    <Tab.Screen  name='Focus' component={Focus}
      options={{
      tabBarLabel: 'Focus', 
      tabBarStyle:{backgroundColor: 'transparent',position: 'absolute',
      left: 0,
      bottom: 0,
      right: 0},
      headerShown:false, 
      headerStyle:{backgroundColor: 'white'}, 
      headerTitleStyle:{color:'black'},
      tabBarLabelStyle:{fontWeight: '800', fontSize: 10}}}
      />
    
    <Tab.Screen  name='Settings' component={Settings}
      options={{
      tabBarStyle:{backgroundColor: '#212121',position: 'absolute'},
      tabBarLabel: 'Settings', 
      headerShown:false, 
      headerStyle:{backgroundColor: 'white'}, 
      headerTitleStyle:{color:'black'},
      tabBarLabelStyle:{fontWeight: '800', fontSize: 10}}}
      />

    
  </Tab.Navigator>
  )
}


const linking = {
  prefixes: [
    /* your linking prefixes */
    'https://resetwill.netlify.app'
  ],
  config: {
    /* configuration for matching screens with paths */
  },
};

import {Settings as Settings2} from 'react-native-fbsdk-next';
import Purchases from 'react-native-purchases';

function App(): JSX.Element {

  // useEffect(() => {
  //   if(Platform.OS == 'android'){
  //     // SplashScreen2.hide()
  //   }
  // },[])

  useEffect(() => {
    Settings2.setAdvertiserTrackingEnabled(true);
    Settings2.initializeSDK();

    const purchase = async () => {
      Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

      if (Platform.OS === 'ios') {
        Purchases.configure({ apiKey: 'appl_FnomgowtKOPwOnmlRQyXjUzsSJW' });
      } 

      purchase()


    }


    
    {/* else if (Platform.OS === 'android') {
    	await Purchases.configure({ apiKey: <public_google_api_key> });

      OR: if building for Amazon, be sure to follow the installation instructions then:
    	await Purchases.configure({ apiKey: <public_amazon_api_key>, useAmazon: true });
    } */}

    
  }, []);

  return (
    <NavigationContainer  linking={linking} fallback={<Text>Loading...</Text>}>
      <AppProvider id={'willdoro-xhauo'}>
      <RealmProvider>
      <Stack.Navigator initialRouteName='Focus' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Focus' component={Focus}  />
        <Stack.Screen name='Settings' component={Settings}/>
        <Stack.Screen name='Profile' component={Profile}/>
        <Stack.Screen name='Sign' component={Sign} /> 
        <Stack.Screen name='Signup' component={Signup} />
        <Stack.Screen name='Forget' component={Forget} />
        <Stack.Screen name='ForgetNew' component={ForgetNew} />
        <Stack.Screen name='AlarmWork' component={AlarmWork} />
        <Stack.Screen name='AlarmBreak' component={AlarmBreak} />
        <Stack.Screen name='Change' component={Change}/>
        <Stack.Screen name='Tasks' component={Tasks}/>
        <Stack.Screen name='FBLogin' component={FBLogin}/>
        <Stack.Screen name='GoogleLogin' component={GoogleLogin}/>
      </Stack.Navigator>
      </RealmProvider>
      </AppProvider>
    </NavigationContainer>
    );
}





export default App;

