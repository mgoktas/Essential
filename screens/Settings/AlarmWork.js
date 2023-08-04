import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header, SettingsCellwText, styles} from '../../components/Utilities/Utilities';
import {Vibration, Platform} from 'react-native';
import {SetupPlayer, Vibrate} from '../../components/Functions';
import TrackPlayer, {State} from 'react-native-track-player';
import {songs, track1} from '../../components/Data';
import {FlashList} from '@shopify/flash-list';

const AlarmWork = ({navigation, route}) => {
  const {onSelectWork, selectedWork} = route.params;
  const [selectedId, setSelectedId] = useState(selectedWork);
  const {_dark} = route.params;
  const [isDarkModeOn, setIsDarkModeOn] = useState(_dark);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.add(songs);
    });
  }, []);

  const ring = async index => {
    await TrackPlayer.add(songs);
    const state = await TrackPlayer.getState();

    if (state === State.Playing) {
      let trackIndex = await TrackPlayer.getCurrentTrack();
      if (trackIndex == index) {
        TrackPlayer.pause();
      } else {
        await TrackPlayer.skip(index);
      }
    } else {
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.pageBreak,
        {backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'},
      ]}>
      <Header
        isDarkModeOn={isDarkModeOn}
        onPress={async () => {
          await TrackPlayer.reset();
          onSelectWork(selectedId);
          navigation.goBack();
        }}
        isSubtle={false}
        title={'Work Alarm'}
      />
      <FlashList
        renderItem={({item}) => {
          return (
            <>
              <SettingsCellwText
                isDarkModeOn={isDarkModeOn}
                mode={2}
                onPress={() => {
                  ring(item.id - 1);
                  setSelectedId(item.id);
                }}
                title={`Buzz ${item.id}`}
                icon={undefined}
                iconArrow={undefined}
                backColor={undefined}
                style={undefined}
                isFirst={item.id == 1 ? true : false}
                isLast={item.id == 5 ? true : false}
                isSelected={selectedId == item.id ? true : false}
              />

              <View style={{opacity: item.id == 5 ? 0 : 1}} />
            </>
          );
        }}
        estimatedItemSize={10}
        data={songs}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

export default AlarmWork;
