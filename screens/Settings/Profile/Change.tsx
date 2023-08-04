import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, UserRealmContext } from '../../../components/Storage/MongoDB';
import { ChangeWText, Header, HeaderButtonRight, styles } from '../../../components/Utilities/Utilities';

const Change = ({route, navigation}) => {

    const [isWriting, setIsWriting] = useState(false)
    
    const { onSelectName, changeName, name } = route.params;
    const [newName, setNewName] = useState(name)
    
    const len = name.split(' ').length
    const firstname = len == 2 ? name.split(' ')[0] : name.split(' ')[0] + ' ' + name.split(' ')[1]
    const lastname = name.split(' ')[len - 1]
    
    const [firstName, setFirstName] = useState(firstname)
    const [lastName, setLastName] = useState(lastname)
   
    const {useRealm, useQuery, useObject} = UserRealmContext;
    const realm = useRealm()
    const MyObject = useObject(User, 1)

    const handleText = (txt: string, num: number) => {
        if(num == 0){
            if(lastname != txt){
                setIsWriting(true)
                setLastName(txt)
            } else {
                setIsWriting(false)
            }
        }
        else if(num == 1){
            if(firstname != txt){
                setIsWriting(true)
                setFirstName(txt)
            } else {
                setIsWriting(false)
            }
        }
        else if(num == 2){
                if (MyObject) {
                    realm.write(() => {
                        MyObject.username! = firstName + ' ' + lastName
                    });
                }
                onSelectName(firstName + ' ' + lastName)
                changeName(firstName + ' ' + lastName)
        }  
    }

    return  (
    <SafeAreaView style={styles.pageProfile}>
        
        <Header onPress={() => {
            navigation.goBack()
        }} title={'Name'} color={'gray'}  />
        <HeaderButtonRight onPress={isWriting ? () => {handleText('txt', 2)} : () => {}} isWriting={isWriting} />
        <ScrollView>
            <ChangeWText 
            onChangeTextSurname={(txt) => {handleText(txt, 0)}}
            onChangeTextFirstname={(txt) => {handleText(txt, 1)}}
            iconArrow={'angle-right'} firstname={firstname} lastname={lastname}/>
        </ScrollView>
        

    </SafeAreaView>
)}

export default Change;
