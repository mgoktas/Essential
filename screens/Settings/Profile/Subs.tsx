import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { User, UserRealmContext } from '../../../components/Storage/MongoDB';
import { AppleInput, CellUpperText, ChangeWText, Header, Space, styles } from '../../../components/Utilities/Utilities';
import { SubsBoxProfile } from '../../../components/Utilities/Utilities3';

const Subs = ({route, navigation}) => {

    const [isWriting, setIsWriting] = useState(false)

    const {isDarkModeOn} = route.params
    
    
    return  (
    <SafeAreaView style={[styles.pageProfile, {backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'}]}>
        
        <Header onPress={() => {
            navigation.goBack()
        }} title={'Subscriptions'} 
        isOnChange={true}
        isWriting={isWriting}
        isDarkModeOn={isDarkModeOn}
        />
        {/* <HeaderButtonRight onPress={isWriting ? () => {handleText('txt', 2)} : () => {}} isWriting={isWriting} /> */}
        <ScrollView>

            <CellUpperText isDarkModeOn={isDarkModeOn} txt={'ACTIVE'}/>

            <SubsBoxProfile isDarkModeOn={isDarkModeOn} txt1={'WillDoro'} txt2={'Premium'} txt3={'Expires on 18 June'}/>            

            <Space space={20}/>

        </ScrollView>
        

    </SafeAreaView>
)}

export default Subs;
