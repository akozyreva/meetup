import * as firebase from 'firebase'


export const createMeetup = ({commit}, payload) => {
    const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'dsfdsfsdsd'
    };
    commit('createMeetup', meetup)
};
export const signUserUp = ({commit}, payload) => {
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
};
export const signUserIn = ({commit}, payload) => {
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
};
export const clearError = ({commit}) => {
    commit('clearError');
};