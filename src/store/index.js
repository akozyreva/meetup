import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

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
        user: null,
        loading: false,
        error: null

    },
    mutations,
    actions,
    getters
});