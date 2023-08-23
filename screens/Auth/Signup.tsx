// import AsyncStorage from '@react-native-async-storage/async-storage';
import {useApp, useUser} from '@realm/react';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header, Space, styles} from '../../components/Utilities/Utilities';
import {Input, TextButton} from '../../components/Utilities/Utilities2';
import {AppleButton} from '../../components/Utilities/Utilities3';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';
import { User } from '../../components/Storage/MongoDB';

const Signup = ({route, navigation}) => {
  const {_dark} = route.params;

  console.log(_dark)

  const [name, setName] = useState('Muhammet Rasit');
  const [email, setEmail] = useState('ahmettalha@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [password2, setPassword2] = useState('12345678');

  const app = useApp();
  const user = useUser();

  const signup = async () => {
    if (name.split(' ').length < 2) {
      Alert.alert('Security Error', 'Name should include your surname');
      return;
    }
  
    if (password != password2) {
      Alert.alert('Security Error', 'Password do not match');
      return;
    }
  
    try {
      console.log(email)
   
      await app.emailPasswordAuth.registerUser({email, password});
  
      const mongodb = user.mongoClient('mongodb-atlas');
      const users = mongodb.db('reactapp').collection<User>('users');
  
  
      const result = await users.insertOne({
        _id: email,
        name: name,
        useremail: email,
        username: name,
        userpassword: password,
        darkMode: 'false',
        vibrate: 'false',
        autoNext: 'false',
        autoBreak: 'false',
        dailyReminder: 'false',
        alarmWork: 1,
        alarmBreak: 1,
        pomodoroLength: 25,
        breakShortLength: 5,
        breakLongLength: 20,
        breakAfterLongLength: 4,
        defaultDoroInt: 1,
        defaultDoroStr: 'Monkdoro',
        isPremium: 'false',
      });
  
      console.log(result);
  
      await navigation.navigate('Sign', {_dark: _dark});
    } catch (err) {
      console.log('Security Error', err);
    }
  };

  const loginfb = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const credentials = Realm.Credentials.facebook(
              data.accessToken.toString(),
            );
            app.logIn(credentials).then(user => {
              console.log(`Logged in with id: ${user.id}`);
            });
          });
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const logingl = async () => {
    GoogleSignin.configure({
      iosClientId:
        '269523057437-ejs5tch3jtlv965n8bbvo3bi3ufkl9in.apps.googleusercontent.com',
    });

    try {
      // Sign into Google
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      // use Google ID token to sign into Realm
      const credential = Realm.Credentials.google({idToken});
      const user = await app.logIn(credential);
      console.log('signed in as Realm user', user.id);
    } catch (error) {
      // handle errors
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    } finally {
      setSigninInProgress(false);
    }

    // GoogleSignin.hasPlayServices().then((hasPlayService) => {
    //         if (hasPlayService) {
    //              GoogleSignin.signIn().then((userInfo) => {

    //                        console.log(JSON.stringify(userInfo))
    //              }).catch((e) => {
    //              console.log("ERROR IS: " + JSON.stringify(e));
    //              })
    //         }
    // }).catch((e) => {
    //     console.log("ERROR IS: " + JSON.stringify(e));
    // })
  };

  return (
    <SafeAreaView
      style={[
        styles.pageSign,
        {backgroundColor: _dark ? '#1c1c1e' : '#f2f2f6'},
      ]}>
      <Header
        _dark={_dark}
        onPress={() => {
          navigation.goBack();
        }}
        title={'Sign Up'}
        color={1}
        opacity={1}
        isSubtle={undefined}
        isBorderOk={false}
        mode={undefined}
        isSheetOn={undefined}
        isWriting={undefined}
        isOnChange={undefined}
        onPress2={undefined}
        isOnTask={undefined}
        isAddOn={undefined}
        isAddOn0={undefined}
      />
      <Space space={24} isDate={undefined} />

      <Input
        _dark={_dark}
        autoCap={'words'}
        icon={'person'}
        placeholder={'Name'}
        onChangeText={txt => setName(txt)}
        isPassword={undefined}
      />
      <Space space={12} isDate={undefined} />

      <Input
        _dark={_dark}
        autoCap={'none'}
        icon={'mail'}
        placeholder={'Email Address'}
        onChangeText={txt => setEmail(txt)}
        isPassword={undefined}
      />
      <Space space={12} isDate={undefined} />

      <Input
        _dark={_dark}
        icon={'lock-closed'}
        placeholder={'Password'}
        isPassword={true}
        onChangeText={txt => setPassword(txt)}
        autoCap={undefined}
      />
      <Space space={12} isDate={undefined} />

      <Input
        _dark={_dark}
        icon={'lock-closed'}
        placeholder={'Password Again'}
        isPassword={true}
        onChangeText={txt => setPassword2(txt)}
        autoCap={undefined}
      />
      <Space space={3} isDate={undefined} />

      <TextButton
        margin={10}
        onPress={() => {
          navigation.goBack();
        }}
        txt={'Already registered?'}
        _dark={undefined}
      />

      <AppleButton
        onPress={() => {
          signup(
            name,
            email,
            password,
            password2,
            navigation,
            app,
            user,
            _dark,
          );
        }}
        txt={'Sign Up'}
        isPrimary={true}
        color={'#007AFF'}
        _dark={undefined}
        isOnTask={undefined}
        mode={undefined}
      />

      <TextButton
        margin={10}
        onPress={() => {
          navigation.goBack();
        }}
        txt={'or?'}
        _dark={undefined}
      />

      <AppleButton
        onPress={() => {
          loginfb();
        }}
        txt={'Sign with Facebook'}
        isPrimary={false}
        color={'#007AFF'}
        _dark={undefined}
        isOnTask={undefined}
        mode={undefined}
      />

      <AppleButton
        onPress={() => {
          logingl();
        }}
        txt={'Sign with Google'}
        isPrimary={false}
        color={'#007AFF'}
        _dark={undefined}
        isOnTask={undefined}
        mode={undefined}
      />

      {/* <AppleButton onPress={onAppleButtonPress} txt={'Sign with Apple'} isPrimary={false} color={'#007AFF'}/> */}
    </SafeAreaView>
  );
};

export default Signup;
