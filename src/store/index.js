import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        //arr of obj from the backend
        loadedMeetups: [
            {
                imageUrl: 'https://www.history.com/.image/t_share/MTU3ODc5MDgyNjY5OTc1MjYz/new-york-city.jpg',
                id: '1',
                title:'Meetup in New York',
                date: '2019-07-18'
            },
            {
                imageUrl: 'https://boston-consulting-group-res.cloudinary.com/image/fetch/http://image-src.bcg.com/Images/Moscow_1050x590_tcm-33802.jpg',
                id: '2',
                title:'Meetup in Moscow',
                date: '2019-07-19'
            }
        ],
        user: {
            id: 'dsdsds',
            // arr of ids of meetups, which user is registered
            registeredMeetups: ['1', '2']
        }
    },
    mutations: {},
    actions: {},
    getters: {
        getLoadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                // sort meetings by the date by comparing them
                return meetupA.date > meetupB.date
            })
        },
        getFeaturedMeetaps(state, getters){
          return getters.getLoadedMeetups.slice(0,5)
        },
        getLoadedOneMeetup(state) {
            return (meetUpId) => {
                //return meetup, which id of meetup will be equal to passing meetUpId
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetUpId
                })
            }
        }
    }
})