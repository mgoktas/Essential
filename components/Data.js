export const examples = [
    {name: 'Monkdoro', index: 1, source : require('../components/images/monk.jpeg')},
    {name: 'Classicdoro', index: 2, source : require('../components/images/classic.jpg')},
    {name: 'Animedoro', index: 3, source : require('../components/images/anime.jpeg')},
    {name: 'Moviedoro', index: 4, source : require('../components/images/movie.jpg')},
    {name: 'Showdoro', index: 5, source : require('../components/images/show.jpg')},
    {name: 'Musicdoro', index: 6, source : require('../components/images/music.jpg')},
    {name: 'Freedoro', index: 7, source : require('../components/images/free.jpg')},
    {name: 'Restdoro', index: 8, source : require('../components/images/rest.jpg')},
]
 
export const songs = [
    {id: 1, url: require('../components/voices/1.mp3')},
    {id: 2, url: require('../components/voices/2.mp3')},
    {id: 3, url: require('../components/voices/3.mp3')},
    {id: 4, url: require('../components/voices/4.mp3')},
    {id: 5, url: require('../components/voices/5.mp3')},
]

export const track1 = {
    url: require('../components/voices/1.mp3'), // Load media from the network
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork: 'http://example.com/cover.png', // Load artwork from the network
    duration: 402 // Duration in seconds
};


export const urlSite = 'https://qrtally.netlify.app'

export const urlSiteSupport = 'https://qrtally.netlify.app/support.html'

export const urlAppStore = 'itms-apps://apps.apple.com/us/app/how-much-days/id6447752303';

export const urlAppWeb = 'httpss://apps.apple.com/us/app/how-much-days/id6447752303';

export const publishableKey = 'pk_live_51MzWeiEYzAPwGPE13wscXu5RF5KI12zxxPgLcDS4fMW6T1DOlAjNqREMP2g5SIfDeZVSGtvQuAj8bpQMIGmYrt5U00ZHCar5IV'

export const urlScheme = 'https://buy.stripe.com/dR69Dr95w6pEb968ww'

export const merchantIdentifier = 'merchant.com.willdoro'

export const dates = [
    {id: 1, name: 'Today'},
    {id: 1, name: 'Tomorrow'},
    {id: 1, name: 'This Week'},
    {id: 1, name: 'Planned'},
  ]

export const getDate = (date: Date) => {
    const today = new Date();
    const today3 = new Date();
    today.setDate(today.getDate())

    const today2 = new Date();
    today2.setDate(today.getDate() + 1)
    today2.setHours(0,0,0,0)

    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 2)
    tomorrow.setHours(0,0,0,0)
    
    
    const firstDay = new Date(today3.setDate(today3.getDate() - today3.getDay()));
    const lastDay = new Date(today3.setDate(today3.getDate() - today3.getDay() + 6));

    console.log(today.getDate())
    console.log(today2.getMonth())

    console.log(date.getDate())
    console.log(date.getMonth())
    

    const dayName = date.toLocaleString('default', { month: 'long' })
    
    if(date.getFullYear() > today.getFullYear()) {
        
        return dayName + ' ' + date.getDate() + ' ' + date.getFullYear()
    
    }

    else if((today.getDate() + today.getMonth()) == date.getDate() + date.getMonth()){
        return 'Today'
    }

    else if(today2.getTime() < date.getTime() && date.getTime() < tomorrow.getTime()){

        return 'Tomorrow'

    }

    else if(firstDay.getTime() <= date.getTime() && date.getTime() <= lastDay.getTime() ){


        return 'This Week'

    }

    else if(date.getTime() > today.getTime()) {
        

        return dayName + ' ' + date.getDate()
        
    
    }
    
}
