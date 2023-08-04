import React, {useState} from 'react';
import {Alert, ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import { User, UserRealmContext } from '../../../components/Storage/MongoDB';
import {
  ChangeWText,
  Header,
  styles,
} from '../../../components/Utilities/Utilities';
import {User, useRealmContext} from '../../../components/Storage/MongoDB';
import {getDataString, setData} from '../../../components/Storage/Data';
import {useUser} from '@realm/react';

const ChangeName = ({route, navigation}) => {
  const [isWriting, setIsWriting] = useState(false);

  const {onSelectName, changeName, isDarkModeOn} = route.params;
  const [name, setNewName] = useState(getDataString('name'));

  const len = name.split(' ').length;
  const firstname =
    len == 2
      ? name.split(' ')[0]
      : name.split(' ')[0] + ' ' + name.split(' ')[1];
  const lastname = name.split(' ')[len - 1];

  const [firstName, setFirstName] = useState(firstname);
  const [lastName, setLastName] = useState(lastname);

  const user2 = useUser();
  const mongodb = user2.mongoClient('mongodb-atlas');
  const users = mongodb.db('reactapp').collection<User>('users');

  const handleText = (txt: string, num: number) => {
    if (num == 0) {
      if (lastname != txt) {
        setIsWriting(true);
        setLastName(txt);
      } else {
        setIsWriting(false);
      }
    } else if (num == 1) {
      if (firstname != txt) {
        setIsWriting(true);
        setFirstName(txt);
      } else {
        setIsWriting(false);
      }
    } else if (num == 2) {
      // if (MyObject) {
      //     realm.write(() => {
      //         MyObject.username! = firstName + ' ' + lastName
      //     });
      // }
      onSelectName(firstName + ' ' + lastName);
      changeName(firstName + ' ' + lastName);
    }
  };

  const applyChanges = async () => {
    const fullName = firstName + ' ' + lastName;
    console.log(fullName);

    try {
      const result = await users.updateOne(
        {_id: getDataString('email')},
        {$set: {name: fullName}},
      );
      setData('name', fullName);
    } catch (err) {
      Alert.alert('Security Error', err.message);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.pageProfile,
        {backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'},
      ]}>
      <Header
        onPress={() => {
          navigation.goBack();
        }}
        title={'Name'}
        color={1}
        isOnChange={true}
        isWriting={isWriting}
        onPress2={async () => {
          await applyChanges();
          await navigation.goBack();
        }}
        mode={undefined}
        isSubtle={undefined}
        opacity={undefined}
        isBorderOk={undefined}
        isSheetOn={undefined}
        isDarkModeOn={undefined}
        isOnTask={undefined}
        isAddOn={undefined}
        isAddOn0={undefined}
      />
      <ScrollView>
        <ChangeWText
          isDarkModeOn={isDarkModeOn}
          txt1={'Last'}
          txt2={'First'}
          onChangeTextSurname={(txt: string) => {
            handleText(txt, 0);
          }}
          onChangeTextFirstname={(txt: string) => {
            handleText(txt, 1);
          }}
          iconArrow={'angle-right'}
          firstname={firstname}
          lastname={lastname}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeName;
