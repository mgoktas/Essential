import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, Space, styles } from '../../components/Utilities/Utilities';
import { BackButton, BottomText, CustomButton, CustomButtonForget, Input, InputEm, InputPw, InputPwAgainNew, LineSeperator, Logo, TextButton } from '../../components/Utilities/Utilities2';
import { AppleButton } from '../../components/Utilities/Utilities3';

const ForgetNew = ({route, navigation}) => {
    
    const {_dark} = route.params
    const [isDarkModeOn, setIsDarkModeOn] = useState(_dark)
    

    return (
    <SafeAreaView style={styles.pageSign}>
        <Header 
        isDarkModeOn={isDarkModeOn}
        onPress={() => {
                navigation.goBack()
            } } title={'Reset Password'} color={1} opacity={1} isSubtle={undefined}  />
        
        <Space space={24}/>
        <Space space={24}/>
        <Input icon={'lock-closed'} placeholder={'New Password'}/>
        <LineSeperator/>
        <Input icon={'lock-closed'} placeholder={'New Password'}/>
        <LineSeperator/>
        <Space space={4}/>
        <AppleButton onPress={() => {navigation.navigate('Signup')}} txt={'Set New Password'} isPrimary={true} color={'gray'}/>
    </SafeAreaView>
)}

export default ForgetNew;
