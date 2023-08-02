import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../../components/Functions/Functions';
// import { User, UserRealmContext } from '../../components/Storage/MongoDB';
import { Header, HeaderButton, Space, styles } from '../../components/Utilities/Utilities';
import { BottomText, Input, Logo, TextButton } from '../../components/Utilities/Utilities2';
import { AppleButton } from '../../components/Utilities/Utilities3';

const Sign = ({route, navigation}) => {
    
    const {_dark} = route.params
    const [isDarkModeOn, setIsDarkModeOn] = useState(_dark)

    console.log(isDarkModeOn, 'isDarkModeOn')

    const app = useApp()
    const myemail = 'mgoktashk@gmail.com'
    const mypass = '123456'
    const [email, setEmail] = useState(myemail)
    const [password, setPassword] = useState(mypass)

    const login = async () => {
        const credentials = Realm.Credentials.emailPassword(
            email,
            password
          )
          try {
            await app.logIn(credentials);
            await AsyncStorage.setItem('isLogged', 'true')
            await AsyncStorage.removeItem('isSet')
            await navigation.navigate('Focus')
          } catch (err) {
              Alert.alert('Security Error', err.message)
          }

}

console.log(isDarkModeOn)
    
    return (
    <SafeAreaView style={[styles.pageSign, {backgroundColor: isDarkModeOn ? '#1c1c1e' : '#f2f2f6'}]}>
        <Header 
        isDarkModeOn={isDarkModeOn}
        onPress={() => {
                navigation.goBack()
            }} title={'Sign In'} color={1} opacity={1} isSubtle={undefined} isBorderOk={false}  />
            
            <Space space={24}/>
        <Logo />
        <Space space={24}/>



        <Input isDarkModeOn={isDarkModeOn} onChangeText={(txt) => {setEmail(txt)}} icon={'mail'} autoCap={'none'}  placeholder={'Email address'}/>
        <Space space={6}/>
        <Input isDarkModeOn={isDarkModeOn} onChangeText={(txt) => {setPassword(txt)}} isPassword={true} autoCap={'none'} icon={'lock-closed'} placeholder={'Password'}/>
        <Space space={4}/>



        <Space space={5}/>
        <TextButton isDarkModeOn={isDarkModeOn} onPress={() => {navigation.navigate('Forget', {_dark: isDarkModeOn})}} txt={'Forget password?'}/>
        <Space space={5}/>
        <AppleButton onPress={login} txt={'Sign In'} isPrimary={true} color={'#007AFF'}/>
        <Space space={5}/>
        <BottomText isDarkModeOn={isDarkModeOn} txt={'Not registered yet?'}/>
        <Space space={5}/>
        <AppleButton mode={2} onPress={() => {navigation.navigate('Signup', {_dark: isDarkModeOn})}} txt={'Sign Up'} isPrimary={false} color={'#007AFF'}/>
        <Space space={5}/>
    </SafeAreaView>
)}

export default Sign;
