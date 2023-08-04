// import { useApp } from '@realm/react';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, HeaderButton, Space, styles } from '../../components/Utilities/Utilities';
import { BackButton, BottomText, CustomButton, CustomButtonForget, Input, InputEm, InputPw, LineSeperator, Logo, TextButton } from '../../components/Utilities/Utilities2';
import { AppleButton } from '../../components/Utilities/Utilities3';

const Forget = ({route, navigation}) => {
    
    const {_dark} = route.params
    const [isDarkModeOn, setIsDarkModeOn] = useState(_dark)
    const [email, setEmail] = useState('')


    return (
    <SafeAreaView style={[styles.pageSign, {backgroundColor: isDarkModeOn ? '#1c1c1e' : '#f2f2f6'}]}>
        <Header 
        isDarkModeOn={isDarkModeOn}
        onPress={() => {
                navigation.goBack()
            }} 
            title={'Forget My Password'} color={1} opacity={1} isSubtle={undefined} isBorderOk={false}  />
        <Space space={24}/>        
        <Logo />
        <Space space={24}/>
        <Input isDarkModeOn={isDarkModeOn} autoCap={'none'} icon={'mail'} placeholder={'Email address'} isPassword={false} onChangeText={(txt: any) => setEmail(txt)}/>
        <Space space={4}/>
        <AppleButton txt={'Send Email'} isPrimary={true} color={'#007AFF'}/>
        
    </SafeAreaView>
)}

export default Forget;
