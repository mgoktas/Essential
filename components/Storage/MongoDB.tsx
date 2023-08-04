import Realm from 'realm';
import {createRealmContext} from '@realm/react';

export class User extends Realm.Object<User> {
  _id!: string;
  name!: string;
  useremail!: string;
  userpassword!: string;
  username!: string;
  alarmWork: number = 1;
  alarmBreak: number = 2; 
  vibrate: string = 'false';
  pomodoroLength: number = 25;
  breakShortLength: number = 5;
  breakLongLength: number = 15;
  breakAfterLongLength: number = 4;
  autoNext: string = 'false';
  autoBreak: string = 'false';
  darkMode: string = 'false'; 
  dailyReminder: string = 'false';
  defaultDoroInt: number = 1;
  defaultDoroStr: string = 'Monkdoro';
  isPremium: string = 'false';
  
  static schema = {
    name: 'User',
    properties: {
      _id: 'string',
      useremail: 'string',
      userpassword: 'string',
      username: 'string',
      alarmWork: {type: 'int', default: 1},
      alarmBreak: {type: 'int', default: 2},
      vibrate: {type: 'string', default: 'false'},
      pomodoroLength: {type: 'int', default: 25},
      breakShortLength: {type: 'int', default: 5},
      breakLongLength: {type: 'int', default: 15},
      breakAfterLongLength: {type: 'int', default: 4},
      autoNext: {type: 'string', default: 'false'},
      autoBreak: {type: 'string', default: 'false'},
      darkMode: {type: 'string', default: 'false'},
      dailyReminder: {type: 'string', default: 'false'},
      defaultDoroInt: {type: 'int', default: 1},
      defaultDoroStr: {type: 'string', default: 'Monkdoro'},
      isPremium: {type: 'string', default: 'false'},
    },
    primaryKey: '_id',
  };
}

export class Doro extends Realm.Object<Doro> {
  _id!: string;
  name!: string;
  startDate!: Date;
  startTime!: Date;
  endTime!: Date;
  length!: number;
  breakLength!: number;
  didFinish: boolean = false;
  didBreakEnd: boolean = false;

  static schema = {
    name: 'Doro',
    properties: {
      _id: 'string',
      startDate: 'date',
      startTime: 'date',
      endTime: 'date',
      length: 'int',
      breakLength: 'int',
      didFinish: {type: 'bool', default: false},
      didBreakEnd: {type: 'bool', default: false},
    },
    primaryKey: '_id'
}}

export class Task extends Realm.Object<Doro> {
  _id!: string;
  name!: string;
  taskName!: string;
  startDate!: Date;
  startTime!: Date;
  endTime!: Date;
  length!: number;
  breakLength!: number;
  didFinish: boolean = false;
  sessionLength!: number 
  isForFuture: boolean = false;

  static schema = {
    name: 'Task',
    properties: {
      _id: 'string',
      taskName: 'string',
      startDate: 'date',
      startTime: 'date',
      endTime: 'date',
      length: 'int',
      sessionLength: 'int',
      breakLength: 'int',
      didFinish: {  type: 'bool', default: false  },
      isForFuture: {  type: 'bool', default: false  },
    },
    primaryKey: '_id'
}}

export const realmUserConfig: Realm.Configuration = {
  schema: [User, Doro, Task],
  schemaVersion: 15
};

// export const {RealmProvider, useRealm, useObject, useQuery} = 
// createRealmContext(realmUserConfig);

//  const UserRealmContext = createRealmContext({
//   schema: [User, Doro, Task],
//   schemaVersion: 15
// })

const realmContext = createRealmContext(realmUserConfig);

export const useRealmContext = () => realmContext;
