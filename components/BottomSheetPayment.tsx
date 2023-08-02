import React, { useCallback, useImperativeHandle, useRef } from "react"
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "./Utilities"
import { TouchableOpacity, GestureDetector } from 'react-native-gesture-handler';
import { GestureHandlerRootView, Gesture } from 'react-native-gesture-handler';
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { SheetTitle, BackButton } from "./Utilities3";

export type OfferSheetRefProps = {
    openSheet: () => void
  }
  
export const OfferSheet = React.forwardRef<OfferSheetRefProps, OfferSheetProps>(({}, ref) => {
  
    const translateY = useSharedValue(0)
    const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.2
    
    const openSheet = useCallback(() => {
      'worklet';
      translateY.value = withSpring(-SCREEN_HEIGHT*1.65, { damping: 2000 })
    }, [])
    
    useImperativeHandle(ref, () => ({ openSheet }), [openSheet])
  
    const context = useSharedValue({ y: 0 })
    const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value }
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y
      translateY.value = Math.max(translateY.value, - MAX_TRANSLATE_Y)
    })
    .onEnd(() => {
      if(translateY.value > -SCREEN_HEIGHT ) {
        openSheet(0)
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        openSheet(MAX_TRANSLATE_Y)
      }
    })
    
    useFocusEffect(
      React.useCallback(() => {
        openSheet(0)
      }, [])
    );
    
    const rBottomSheetStyle = useAnimatedStyle(() => {
        const borderRadius = interpolate(
        translateY.value,
        [-MAX_TRANSLATE_Y + 100, -MAX_TRANSLATE_Y],
        [40, 15],
        Extrapolate.CLAMP
        )
        
        return {
            borderRadius,
            transform: [{translateY: translateY.value}]
        }
        })   
      
    return (
          <GestureHandlerRootView>
            <GestureDetector gesture={gesture}>
              <Animated.View style={[styles.bottomSheet, rBottomSheetStyle]}>
                <View style={{height: '%100'}}>

                  <BackButton />
                
                <SheetTitle />

                </View>
              </Animated.View>
            </GestureDetector>
          </GestureHandlerRootView>
          )
})
  
   
  const styles = StyleSheet.create({
      bottomSheet : {
        height: SCREEN_HEIGHT * .8,
        width: SCREEN_WIDTH * .96, 
        position: 'absolute',
        bottom: -SCREEN_HEIGHT * .1, 
        backgroundColor: 'white', 
        alignSelf: 'center', 
        zIndex: 2,
        opacity: 2
    },
      })