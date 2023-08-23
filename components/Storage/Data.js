import { MMKV } from 'react-native-mmkv'

export const examples = [
    {name: 'Monkdoro', index: 1, source : require('../images/pomodoros/monk.jpeg')},
    {name: 'Classicdoro', index: 2, source : require('../images/pomodoros/classic.jpg')},
    {name: 'Animedoro', index: 3, source : require('../images/pomodoros/anime.jpeg')},
    {name: 'Moviedoro', index: 4, source : require('../images/pomodoros/movie.jpg')},
    {name: 'Showdoro', index: 5, source : require('../images/pomodoros/show.jpg')},
    {name: 'Musicdoro', index: 6, source : require('../images/pomodoros/music.jpg')},
    {name: 'Freedoro', index: 7, source : require('../images/pomodoros/free.jpg')},
    {name: 'Restdoro', index: 8, source : require('../images/pomodoros/rest.jpg')},
]

export const examples2 = [
    {name: 'Study', index: 1, source : require('../images/study/study.jpg')},
    {name: 'Study2', index: 2, source : require('../images/dark/study/study.jpg')},
]

export const examplesDark = [
    {name: 'Monkdoro', index: 1, source : require('../images/dark/monk.jpg')},
    {name: 'Classicdoro', index: 2, source : require('../images/dark/classic.jpg')},
    {name: 'Animedoro', index: 3, source : require('../images/dark/anime.jpg')},
    {name: 'Moviedoro', index: 4, source : require('../images/dark/movie.jpg')},
    {name: 'Showdoro', index: 5, source : require('../images/dark/show.jpg')},
    {name: 'Musicdoro', index: 6, source : require('../images/dark/music.jpg')},
    {name: 'Freedoro', index: 7, source : require('../images/dark/free.jpg')},
    {name: 'Restdoro', index: 8, source : require('../images/dark/rest.jpg')},
    {name: 'break', index: 9, source : require('../images/dark/study.jpg')},
]
 
 
export const songs = [
    {id: 1, url: require('../voices/1.mp3')},
    {id: 2, url: require('../voices/2.mp3')},
    {id: 3, url: require('../voices/3.mp3')},
    {id: 4, url: require('../voices/4.mp3')},
    {id: 5, url: require('../voices/5.mp3')},
]

export const track1 = {
    url: require('../voices/1.mp3'), // Load media from the network
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork: 'http://example.com/cover.png', // Load artwork from the network
    duration: 402 // Duration in seconds
};


export const urlSite = 'https://qrtally.netlify.app'

export const urlOfApp = 'https://resetwill.netlify.app'

export const urlSiteSupport = 'https://qrtally.netlify.app/support.html'

export const urlAppStore = 'itms-apps://apps.apple.com/us/app/how-much-days/id6447752303';

export const urlAppWeb = 'httpss://apps.apple.com/us/app/how-much-days/id6447752303';

export const publishableKey = 'pk_test_51MzWeiEYzAPwGPE1qRbdfpoT5kpuxtkTCSuJoREQq0hpnBnVOF0aBfJIqjPz06WyYL2bauVqXecnP3Ak3KJNV7zL00DzsWBTfX'

export const urlScheme = 'https://buy.stripe.com/dR69Dr95w6pEb968ww'

export const merchantIdentifier = 'merchant.com.willdoro'

export const privacypolicy = 'https://www.termsfeed.com/live/ad2065fe-dc76-48a0-a121-592991d8ed08'

export const termsofservice = 'https://www.app-privacy-policy.com/live.php?token=84MRr4GNrWG85JqKR7OvT3d4RMK3Y5qd'

const userId = 0 

export const storage = new MMKV()

export const setData = (key, value) => {
    const keyIntitial = 'user.' + key
    storage.set(keyIntitial, value)
}

export const getDataNumber = (key) => { 
    const keyIntitial = 'user.' + key
    const value = storage.getNumber(keyIntitial)
    return value
}

export const getDataString = (key) => {
    const keyIntitial = 'user.' + key
    const value = storage.getString(keyIntitial)
    return value
}

export const getDataBoolean = (key) => {
    const keyIntitial = 'user.' + key
    const value = storage.getBoolean(keyIntitial)
    return value
}
