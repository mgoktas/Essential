import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, UserRealmContext, useRealmContext } from '../../../components/Storage/MongoDB';
// import { User, UserRealmContext } from '../../../components/Storage/MongoDB';
import { AppleInput, ChangeWText, Header, HeaderButtonRight, Space, styles } from '../../../components/Utilities/Utilities';
import { getDataString } from '../../../components/Storage/Data';

const ChangePasswordChange = ({route, navigation}) => {
    const [isWriting, setIsWriting] = useState(false)

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')
    const blank = ''

    const {isDarkModeOn, email} = route.params

    const {RealmProvider, useQuery, useRealm, useObject} = useRealmContext();
    const user = useObject(User, getDataString('email'));
   
    const realm = useRealm()

    const app = useApp()

    const handleText = () => {
            
            console.log(oldPassword !== blank)
            console.log(newPassword1 !== blank)
            console.log(newPassword2 !== blank)

            if(oldPassword !== blank && newPassword1 !== blank && newPassword2 !== blank){
                setIsWriting(true)
            } else{
                setIsWriting(false)
            }
    }  

    const changePassword = async() => {
        try{
            if(user){

            if(newPassword1 == newPassword2 && newPassword1 == user.userpassword ){
                await app.emailPasswordAuth.callResetPasswordFunction({email, newPassword1}).then((msg) => {
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
                    navigation.goBack();
                } } title={'Change Password'} color={1}
                isOnChange={true}
                mode={'pwc'}
                isWriting={isWriting}
                onPress2={() => { changePassword(); } } isSubtle={undefined} opacity={undefined} isBorderOk={undefined} isSheetOn={undefined} isDarkModeOn={undefined} isOnTask={undefined} isAddOn={undefined} isAddOn0={undefined}        />
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
