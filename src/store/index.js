import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        //arr of obj from the backend
        loadedMeetups: [],
        user: null,
        loading: false,
        error: null,
        ImgKey: '',
        tmpImgUrl: ''

    },
    mutations,
    actions,
    getters
});