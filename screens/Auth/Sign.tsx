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

const Sign = ({route, navigation}) => {

    const {_dark} = route.params;
  const [isDarkModeOn, setIsDarkModeOn] = useState(_dark);;

  const app = useApp();

  const [email, setEmail] = useState('ahmettalha@gmail.com');;
  const [password, setPassword] = useState('12345678');;

  const user = useUser()
  const mongodb = user.mongoClient('mongodb-atlas');
  const users = mongodb.db('reactapp').collection<User>('users');

  

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
                  login(email, password, navigation, app, users);
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
    </SafeAreaView>
  );
};;

export default Sign;
