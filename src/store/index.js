import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
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
        user: null,
        loading: false,
        error: null

    },
    mutations: {
        createMeetup (state, payload) {
            // payload is arr, ready to be in state
            state.loadedMeetups.push(payload)
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        createMeetup ({commit}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 'dsfdsfsdsd'
            };
            commit('createMeetup', meetup)
        },
        signUserUp ({commit}, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false);
                        const newUser = {
                            id: user.user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser);
                    }

                )
                .catch(err => {
                    commit('setLoading', false);
                    commit('setError', err);
                })
        },
        signUserIn ({commit}, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false);
                        const newUser = {
                            id: user.user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser);
                    }

                )
                .catch(err => {
                    commit('setLoading', false);
                    commit('setError', err);
                })
        },
        clearError ({commit}) {
            commit('clearError');
        }
    },
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
        },
        getUserOnPage: state => {
            return state.user
        },
        getLoading: state => {
            return state.loading
        },
        getError: state => {
            return state.error
        }
    }
})