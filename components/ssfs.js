<ScrollView>
            <ProfileRow  onPress={() =>{navigation.navigate('Sign')}}/>
            <Space space={12}/>
            <SettingsCellGold onPress={() => {navigation.navigate('Payment')}} title={'Get Premium'} value={'25 Minutes'} />
            <Space space={12}/>
            <SettingsCellwText onPress={() => {navigation.navigate('AlarmWork')}} title={'Work Alarm'} value={'Buzz 1'} />
            <SettingsCellwText onPress={() => {navigation.navigate('AlarmBreak')}} title={'Break Alarm'} value={'Buzz 2'} />
            <SettingsCellwSwitch title={'Vibrate'} />
            <Space space={12}/>
            <SettingsCellwText title={'Pomodoro Length'} value={'25 Minutes'} />
            <SettingsCellwText title={'Short Break Length'} value={'5 Minutes'} />
            <SettingsCellwText title={'Long Break Length'} value={'15 Minutes'} />
            <SettingsCellwText title={'Long Break After'} value={'4 Pomodoros'} />
            <SettingsCellwSwitch title={'Auto Start Next Pomodoro'} />
            <SettingsCellwSwitch title={'Auto Start of Break'} />
            <Space space={12}/>
            <SettingsCellwSwitch title={'Dark Mode'} />
            <SettingsCellwSwitch title={'Ranking'} />
            <SettingsCellwSwitch title={'Daily Reminder'} />
            <Space space={12}/>
            {/* <SettingsCell title={'Rate Now'}  onPress={() => {goTo(urlAppStore)}} /> */}
            <SettingsCell title={'Help & Feedback'} onPress={() => {goTo(urlSiteSupport)}}/>
            {/* <SettingsCell title={'Share The App'} onPress={() => {goTo(urlAppWeb)}}/> */}
            <SettingsCell title={'Official Website'} onPress={() => {goTo(urlSite)}} />
            <OpenURLButton ref={ref} />
            <Storage ref={ref2}/>
        </ScrollView>