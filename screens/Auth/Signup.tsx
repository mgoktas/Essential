// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { User, UserRealmContext } from '../../components/Storage/MongoDB';
import { Header, HeaderButton, Space, styles } from '../../components/Utilities/Utilities';
import { Input, TextButton } from '../../components/Utilities/Utilities2';
import { AppleButton } from '../../components/Utilities/Utilities3';
import uuid from 'react-native-uuid';
import { AccessToken, LoginButton, LoginManager, Profile } from 'react-native-fbsdk-next';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';


const Signup = ({route, navigation}) => {

    const {_dark} = route.params
    const [isDarkModeOn, setIsDarkModeOn] = useState(_dark)
    const [signinInProgress, setSigninInProgress] = useState(false);

    const [name, setName] = useState('Muhammet Rasit')
    const [email, setEmail] = useState('ahmethkhkhk@gmail.com')
    const [password, setPassword] = useState('12345678')
    const [password2, setPassword2] = useState('12345678')

    const app = useApp();
    // const {useRealm, useQuery, useObject} = UserRealmContext;
    // const realm = useRealm()
    // const MyObject = useObject(User, 1);
    
    const createAccount = async () => {

        if(name.split(' ').length < 2){ 
            Alert.alert('Security Error','Name should include your surname')
            return
        }

        if(password != password2){
            Alert.alert('Security Error','Password do not match')
            return
        }
        
        try {
            await app.emailPasswordAuth.registerUser({email, password});
            // await AsyncStorage.setItem('email', email)
            // await AsyncStorage.setItem('name', name)
            // await AsyncStorage.setItem('password', password)
            // await realm.write(() => {
            //     realm.create('User', {
            //         _id: email,
            //         useremail: email,
            //         username: name,
            //         userpassword: password,
            //     });
            // });
            await navigation.navigate('Sign', {_dark : isDarkModeOn})
          } 
          catch (err) {
            console.log('Security Error',err)
          }
    }

    const currentProfile = Profile.getCurrentProfile().then(
        function(currentProfile) {
        if (currentProfile) {
            console.log("The current logged user is: " +
            currentProfile.name
            + ". His profile id is: " +
            currentProfile.userID
            );
        }
        }
    );

    const loginfb = () => {
      LoginManager.logInWithPermissions(["public_profile"]).then(
        function(result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                console.log(data.accessToken.toString())
                const credentials = Realm.Credentials.facebook(data.accessToken.toString());
                app.logIn(credentials).then(user => {
                  console.log(`Logged in with id: ${user.id}`);
                  });
              }
            )
            console.log(
              "Login success with permissions: " +
                result.grantedPermissions.toString()
                
            );
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
        }
      );
    }

    const logingl = async () => {
      setSigninInProgress(true);
      GoogleSignin.configure({
        iosClientId: '269523057437-ejs5tch3jtlv965n8bbvo3bi3ufkl9in.apps.googleusercontent.com',
    });

    try {
      // Sign into Google
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      // use Google ID token to sign into Realm
      const credential = Realm.Credentials.google({ idToken });
      const user = await app.logIn(credential);
      console.log("signed in as Realm user", user.id);
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


    }

    return (
        <SafeAreaView style={[styles.pageSign, {backgroundColor: isDarkModeOn ? '#1c1c1e' : '#f2f2f6'}]}>
        <Header
        isDarkModeOn={isDarkModeOn}
        onPress={() => {
                navigation.goBack()
            }} title={'Sign Up'} color={1} opacity={1} isSubtle={undefined} isBorderOk={false}  />
                    <Space space={24}/>
        
        <Input isDarkModeOn={isDarkModeOn} autoCap={'words'} icon={'person'} placeholder={'Name'} onChangeText={(txt) => setName(txt)}/>
        <Space space={12}/>
        
        <Input isDarkModeOn={isDarkModeOn} autoCap={'none'} icon={'mail'} placeholder={'Email Address'} onChangeText={(txt) => setEmail(txt)}/>
        <Space space={12}/>
        
        <Input isDarkModeOn={isDarkModeOn} icon={'lock-closed'} placeholder={'Password'} isPassword={true} onChangeText={(txt) => setPassword(txt)}/>
        <Space space={12}/>
        
        <Input isDarkModeOn={isDarkModeOn} icon={'lock-closed'} placeholder={'Password Again'} isPassword={true} onChangeText={(txt) => setPassword2(txt)}/>
        <Space space={3}/>
        
        <TextButton margin={10} onPress={() => {navigation.goBack()}} txt={'Already registered?'}/>
        
        <AppleButton onPress={createAccount} txt={'Sign Up'} isPrimary={true} color={'#007AFF'}/>
   
        <TextButton margin={10} onPress={() => {navigation.goBack()}} txt={'or?'}/>
   
        <AppleButton 
        onPress={() => {loginfb()}} 
        txt={'Sign with Facebook'} isPrimary={false} color={'#007AFF'}/>

        <AppleButton 
        onPress={() => {logingl()}} 
        txt={'Sign with Google'} isPrimary={false} color={'#007AFF'}/>

        {/* <AppleButton onPress={onAppleButtonPress} txt={'Sign with Apple'} isPrimary={false} color={'#007AFF'}/> */}
   
    </SafeAreaView>
    )
}

export default Signup;


