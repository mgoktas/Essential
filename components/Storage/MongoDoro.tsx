import React from 'react';
import Realm, {BSON} from 'realm';
import {createRealmContext} from '@realm/react';

export class Doro extends Realm.Object<Doro> {
  _id!: string;
  name!: string;
  useremail!: string;
  length!: number;
  mode!: string;
  date!: Date;
  startTime!: string;
  endTime!: string;

  static schema = {
    name: 'User',
    properties: {
      _id: 'string',
      useremail: 'string',
      length: 'int',
      mode: 'string',
      date: 'date',
      startTime: 'string',
      endTime: 'string'
    },
  };
}

export const realmConfig: Realm.Configuration = {
  schema: [Doro],
  schemaVersion: 1,
};

const {RealmProvider, useRealm, useObject, useQuery} = 
createRealmContext(realmConfig);

export const DoroRealmContext = createRealmContext({
  schema: [Doro],
  schemaVersion: 1
});

