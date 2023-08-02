import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, UserRealmContext } from '../../../components/Storage/MongoDB';
// import { User, UserRealmContext } from '../../../components/Storage/MongoDB';
import { AppleInput, ChangeWText, Header, HeaderButtonRight, Space, styles } from '../../../components/Utilities/Utilities';

const ChangePasswordChange = ({route, navigation}) => {
    const [isWriting, setIsWriting] = useState(false)

    const [oldPassword, setOldPassword] = useState()
    const [password, setNewPassword1] = useState('12345')
    const [newPassword2, setNewPassword2] = useState('12345')

    const {isDarkModeOn, email} = route.params
    
    const {useRealm, useQuery, useObject} = UserRealmContext;
    const user = useObject(User, email);

    // const realm = useRealm()
    // const MyObject = useObject(User, 1)

    const app = useApp()

    const handleText = () => {
            if(oldPassword && password && newPassword2){
                setIsWriting(true)
            }
    }  

    const changePassword = async() => {
        try{
            if(user){

            if(password == newPassword2 && password == user.userpassword ){
                await app.emailPasswordAuth.callResetPasswordFunction({email, password}).then((msg) => {
                    console.log(msg)
                })
            }}
        }
        catch(err){
            Alert.alert('Security Error', err.message)
        }



 
    }



    return  (
    <SafeAreaView style={[styles.pageProfile, {backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'}]}>
        
        <Header 
        onPress={() => {
            navigation.goBack()
        }} title={'Change Password'} color={1}  
        isOnChange={true}
        isWriting={isWriting}
        onPress2={() => {changePassword()}}
        />
        {/* <HeaderButtonRight
        isDarkModeOn={isDarkModeOn} 
        onPress={isWriting ? () => {handleText('txt', 2)} : () => {}}
        isWriting={isWriting} /> */}
        <ScrollView>

            <AppleInput onChangeText={(txt) => {setOldPassword(txt); handleText()}} isSecure={true} txt={'Old Password'}/>

            <Space space={20}/>

            <ChangeWText 
            onChangeTextFirstname={(txt) => {setNewPassword1(txt); handleText()}}
            onChangeTextSurname={(txt) => {setNewPassword2(txt); handleText()}}
            isSecure={true}
            isCp={false}
            txt1={'New Password'}
            txt2={'New Password'}
            // onChangeTextSurname={(txt) => {handleText(txt, 0)}}
            // onChangeTextFirstname={(txt) => {handleText(txt, 1)}}
            // iconArrow={'angle-right'} firstname={''} lastname={''}
            />
        </ScrollView>
        

    </SafeAreaView>
)}

export default ChangePasswordChange;
