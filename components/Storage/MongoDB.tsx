import Realm from 'realm';
import {createRealmContext} from '@realm/react';

export class User extends Realm.Object<User> {
  _id!: string;
  name!: string;
  useremail!: string;
  userpassword!: string;
  username!: string;
  dailyReminder: boolean = false;
  ranking: boolean = false;
  darkMode: boolean = false;
  autoBreak: boolean = false;
  autoNext: boolean = false;
  vibrate: boolean = false;
  premium: boolean = false;
  alarmWork: number = 1;
  alarmBreak: number = 2;
  pomodoroLength: number = 25;
  breakShortLength: number = 5;
  breakLongLength: number = 15;
  breakAfterLongLength: number = 25;
  breakAfter: number = 4;
  defaultDoroStr: string = 'monkdoro';
  defaultDoroInt: number = 1;
  avatarType: number = 0;

  static schema = {
    name: 'User',
    properties: {
      _id: 'string',
      useremail: 'string',
      userpassword: 'string',
      username: 'string',
      dailyReminder: {type: 'bool', default: false},
      ranking: {type: 'bool', default: false},
      darkMode: {type: 'bool', default: false},
      autoBreak: {type: 'bool', default: false},
      autoNext: {type: 'bool', default: false},
      vibrate: {type: 'bool', default: false},
      premium: {type: 'bool', default: false},
      alarmWork: {type: 'int', default: 1},
      alarmBreak: {type: 'int', default: 2},
      pomodoroLength: {type: 'int', default: 25},
      breakShortLength: {type: 'int', default: 5},
      breakLongLength: {type: 'int', default: 15},
      breakAfterLongLength: {type: 'int', default: 25},
      breakAfter: {type: 'int', default: 4},
      defaultDoroStr: {type: 'string', default: 'monkdoro'},
      defaultDoroInt: {type: 'int', default: 1},
      avatarType: {type: 'int', default: 0},
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
  schemaVersion: 12
};

const {RealmProvider, useRealm, useObject, useQuery} = 
createRealmContext(realmUserConfig);

export const UserRealmContext = createRealmContext({
  schema: [User, Doro, Task],
  schemaVersion: 12
})


