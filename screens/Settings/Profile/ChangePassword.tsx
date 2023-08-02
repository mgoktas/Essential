import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { User, UserRealmContext } from '../../../components/Storage/MongoDB';
import { ChangeWText, Header, HeaderButton, HeaderButtonRight, ProfileWText, SettingsCellProfile, SettingsCellwText, styles } from '../../../components/Utilities/Utilities';

const ChangePassword = ({route, navigation}) => {

    const [isWriting, setIsWriting] = useState(false)
    
    const { onSelectName, changeName, isDarkModeOn, email } = route.params;
    
    // const {useRealm, useQuery, useObject} = UserRealmContext;
    // const realm = useRealm()
    // const MyObject = useObject(User, 1)

    return  (
    <SafeAreaView style={[styles.pageProfile, {backgroundColor : isDarkModeOn ? 'black' : '#f2f2f6'}]}>
        
        <Header onPress={() => {
            navigation.goBack()
        }} title={'Password & Security'} color={1}  
        isOnChange={true}
        isWriting={isWriting}
        />
        {/* <HeaderButtonRight onPress={isWriting ? () => {handleText('txt', 2)} : () => {}} isWriting={isWriting} /> */}
        <ScrollView>
        <SettingsCellProfile type={'#007AFF'} isLogout={false}  isLogged={true} flexStart={true} isFirst={true} isLast={true}  onPress={() => {navigation.navigate('ChangePasswordChange', {isDarkModeOn: isDarkModeOn, email: email})}} isLogout={true} title={'Change Password'} />
        </ScrollView>
        

    </SafeAreaView>
)}

export default ChangePassword;
