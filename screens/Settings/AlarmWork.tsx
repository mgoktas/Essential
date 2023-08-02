import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BreakCell, Header, LineBwCell, SettingsCellwText, styles } from '../../components/Utilities/Utilities';
import { BackButton, BackButtonAbsolute } from '../../components/Utilities/Utilities2';
import { Vibration, Platform } from "react-native";
import { SetupPlayer, Vibrate } from '../../components/Functions/Functions';
import TrackPlayer, { Event, State, useTrackPlayerEvents } from 'react-native-track-player';
import { songs, track1 } from '../../components/Storage/Data';
import { FlashList } from '@shopify/flash-list';

const AlarmWork = ({navigation, route}) => {

    const { onSelectWork, selectedWork, isDarkModeOn } = route.params;
    const [selectedId, setSelectedId] = useState(selectedWork)
    const [trackTitle, setTrackTitle] = useState<string>();

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const {title} = track || {};
            setTrackTitle(title);
        }
    });

    const ring = async (index) => {
        await TrackPlayer.add(songs)
        const state = await TrackPlayer.getState();
        
        if (state === State.Playing) {
            let trackIndex = await TrackPlayer.getCurrentTrack();
            if(trackIndex == index){
                TrackPlayer.pause();
            }
            else{
            await TrackPlayer.skip(index)
        }
        } else {
            await TrackPlayer.skip(index)
            await TrackPlayer.play();
        }
        }

    return (
        <SafeAreaView style={[styles.pageBreak, {backgroundColor: isDarkModeOn ? 'black' : '#f2f2f6'}]}>
            <Header 
            isDarkModeOn={isDarkModeOn}
            onPress={async () => {
                await TrackPlayer.reset()
                await onSelectWork(selectedId)
                await navigation.goBack()
            }}
            isSubtle={false} title={'Work Alarm'}/>
            <FlashList renderItem={({ item }) => {
                return  <>
                    <SettingsCellwText 
                    isDarkModeOn={isDarkModeOn}
                    onPress={() => {ring(item.id-1); setSelectedId(item.id)}}
                    title={`Buzz ${item.id}`}
                    icon={undefined} 
                    iconArrow={undefined} 
                    backColor={undefined} 
                    style={undefined} 
                    isFirst={item.id == 1 ? true : false} 
                    isLast={item.id == 5 ? true : false} 
                    isSelected={selectedId == item.id ? true : false}
                    />
    
                <View style={{opacity: item.id == 5 ? 0 : 1}}>
                            <LineBwCell />
                </View>

                </>



                return <BreakCell isSelected={selectedId == item.id ? true : false} title={`Buzz ${item.id}`} onPress={() => {ring(item.id-1); setSelectedId(item.id)}}  />;
            }}
            estimatedItemSize={10}
            data={songs}
            extraData={selectedId}
            >
            </FlashList> 
        </SafeAreaView>
    )}

export default AlarmWork;
