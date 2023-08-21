import AsyncStorage from '@react-native-async-storage/async-storage';
import {useApp, useUser} from '@realm/react';
import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import { User, UserRealmContext } from '../../components/Storage/MongoDB';
import {
  Header,
  HeaderButton,
  Space,
  styles,
} from '../../components/Utilities/Utilities';
import {
  BottomText,
  Input,
  Logo,
  TextButton,
} from '../../components/Utilities/Utilities2';
import {AppleButton} from '../../components/Utilities/Utilities3';
import {login} from '../../components/Functions/Functions2';
import {User, useRealmContext} from '../../components/Storage/MongoDB';
import Dialog from "react-native-dialog";

const Sign = ({route, navigation}) => {

    const {_dark} = route.params;
  const [isDarkModeOn, setIsDarkModeOn] = useState(_dark);;

  const app = useApp();

  const [email, setEmail] = useState('ahmettalha@gmail.com');
  const [password, setPassword] = useState('12345678');
  const [visible, setVisible] = useState(false)
  const [visible2, setVisible2] = useState(false)

  const [putOldDevData, setPutOldDevData] = useState(false)
  const [putThisDevData, setPutThisDevData] = useState(false)

  const user = useUser()
  const mongodb = user.mongoClient('mongodb-atlas');
  const users = mongodb.db('reactapp').collection<User>('users');

  const handleCancel = () => {
    setVisible(false);
  };

  const handleYes = () => {
    setVisible(false);
    setPutOldDevData(true)
  };
  
  const handleCancel2 = () => {
    setVisible2(false);

    login(email, password, navigation, app, users, putOldDevData, putThisDevData);
  };
  
  const handleYes2 = () => {
    setVisible(false);
    setPutOldDevData(true)

    login(email, password, navigation, app, users, putOldDevData, putThisDevData);
  };


  return (
    <SafeAreaView
      style={[
        styles.pageSign,
        {backgroundColor: isDarkModeOn ? '#1c1c1e' : '#f2f2f6'},
      ]}>
      <Header
              isDarkModeOn={isDarkModeOn}
              onPress={() => {
                  navigation.goBack();;
              } }
              title={'Sign In'}
              color={1}
              opacity={1}
              isSubtle={undefined}
              isBorderOk={false} mode={undefined} isSheetOn={undefined} isWriting={undefined} isOnChange={undefined} onPress2={undefined} isOnTask={undefined} isAddOn={undefined} isAddOn0={undefined}
      /><Space space={24} isDate={undefined} />
      <Logo />
      <Space space={24} isDate={undefined} />

      <Input
              isDarkModeOn={isDarkModeOn}
              onChangeText={txt => {
                  setEmail(txt);
              } }
              icon={'mail'}
              autoCap={'none'}
              placeholder={'Email address'} isPassword={undefined}      />
      <Space space={6} isDate={undefined} />
      <Input
        isDarkModeOn={isDarkModeOn}
        onChangeText={txt => {
          setPassword(txt);
        }}
        isPassword={true}
        autoCap={'none'}
        icon={'lock-closed'}
        placeholder={'Password'}
      />
      <Space space={4} isDate={undefined} />

      <Space space={5} isDate={undefined} />
      <TextButton
              isDarkModeOn={isDarkModeOn}
              onPress={() => {
                  navigation.navigate('Forget', { _dark: isDarkModeOn });
              } }
              txt={'Forget password?'} margin={undefined}      />
      <Space space={5} isDate={undefined} />
      <AppleButton
              onPress={() => {
                  setVisible(true)
              } }
              txt={'Sign In'}
              isPrimary={true}
              color={'#007AFF'} isDarkModeOn={undefined} isOnTask={undefined} mode={undefined}      />
      <Space space={5} isDate={undefined} />
      <BottomText isDarkModeOn={isDarkModeOn} txt={'Not registered yet?'} />
      <Space space={5} isDate={undefined} />
      <AppleButton
              mode={2}
              onPress={() => {
                  navigation.navigate('Signup', { _dark: isDarkModeOn });
              } }
              txt={'Sign Up'}
              isPrimary={false}
              color={'#007AFF'} isDarkModeOn={undefined} isOnTask={undefined}      />
      <Space space={5} isDate={undefined} />

      <Dialog.Container visible={visible}>
      <Dialog.Title>Account delete</Dialog.Title>
      <Dialog.Description>
        Do you want to save this account's data? You cannot undo this action.
      </Dialog.Description>
      <Dialog.Button onPress={handleCancel} label="Cancel" />
      <Dialog.Button onPress={handleYes} label="Yes" />
    </Dialog.Container>

    <Dialog.Container visible={visible}>
      <Dialog.Title>Account delete</Dialog.Title>
      <Dialog.Description>
        Do you want to delete this account? You cannot undo this action.
      </Dialog.Description>
      <Dialog.Button onPress={handleCancel2} label="Cancel" />
      <Dialog.Button onPress={handleYes2} label="Yes" />
    </Dialog.Container>
    </SafeAreaView>
  );
};;

export default Sign;
