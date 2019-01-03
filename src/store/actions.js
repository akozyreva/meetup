import * as firebase from 'firebase'

export const loadMeetups = ({commit}) => {
    commit('setLoading', true);
    // when page reloads, recieve new meetups
    firebase.database().ref('meetups').once('value')
        .then(
            data => {
                const meetups = [];
                // firebase method, which provides key-obj property
                const obj = data.val();
                Object.keys(obj).forEach(key => {
                    //console.log(key, obj[key]);
                    meetups.push(obj[key]);
                });
                commit('setLoading', false);
                commit('setLoadedMeetups', meetups)
            }
        )
        .catch(
            err => {
                commit('setLoading', true);
                console.log(err);
            }
        )
};

export const createMeetup = ({commit}, payload) => {
    const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        uid: payload.uid
    };
    // ref('meetups') -name of node, in wich we wil collect data about meetups
    firebase.database().ref('meetups').push(meetup)
        .then(
            data => {
                // special param from firebase, which provides to receive id
                const key = data.key;
                commit('createMeetup', {
                    ...meetup,
                    id: key
                })
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        )

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