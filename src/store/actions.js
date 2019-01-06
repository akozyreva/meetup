import * as firebase from 'firebase'
import * as getters from './getters'

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
                    meetups.push({...obj[key], id: key});
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

export const createMeetup = ({commit, getters}, payload) => {
    const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        uid: payload.uid
    };
    let key;
    let imageUrl;
    // ref('meetups') -name of node, in wich we wil collect data about meetups
    firebase.database().ref('meetups').push(meetup)
        .then(
            data => {
                // special param from firebase, which provides to receive id
                const key = data.key;
                commit('SaveKey', key);
                return key
            }
        )
        //in order to receive key, we call another then
        .then( key => {
            const fileName = payload.image.name
            const extension = fileName.slice(fileName.lastIndexOf('.'))
            return firebase.storage().ref('meetup/' + key  + extension).put(payload.image);
        })
        .then(uploadTaskSnapshot => {
            return uploadTaskSnapshot.ref.getDownloadURL();
        })
        .then( url => {
            let key = getters.tmpMeetupKey;
            commit('tmpImgUrl', url);
            // add imageUrl to info about meetup
            return firebase.database().ref('meetups').child(key).update({imageUrl: url})
        })
        .then( () => {
            //execute getters
            let key = getters.tmpMeetupKey;
            let imageUrl = getters.tmpImgUrl;
            commit('createMeetup', {
                    ...meetup,
                    imageUrl: imageUrl,
                    id: key
                })
        } )
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

export const autoSignIn = ({commit}, payload) => {
    commit('setUser', {id: payload.uid, registeredMeetups: []})
};
export const logout = ({commit}) => {
    firebase.auth().signOut();
    commit('setUser', null);
};
export const clearError = ({commit}) => {
    commit('clearError');
};