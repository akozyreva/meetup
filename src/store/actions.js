import * as firebase from 'firebase'

export const registerUserForMeetup = ({commit, getters}, payload) => {
    commit('setLoading', true);
    const user = getters.getUserOnPage
    firebase.database().ref('/users/' + user.id).child('/registration/').push(payload)
        .then( key => {
            commit('setLoading', false);

            commit('registerUserForMeetup', {
                id: payload,
                fbKey: key.key
            })
        })
        .catch( err =>{
            console.log(err)
            commit('setLoading', false);
        })

};

export const unregisterUserForMeetup = ({commit, getters}, payload) => {
    commit('setLoading', true);
    const user = getters.getUserOnPage;
    const fbkey = user.registeredMeetups.find(meetup => meetup.id === payload);
    firebase.database().ref('/users/' + user.id + /registration/).child(fbkey.fbKey).remove()
        .then( () => {
            commit('setLoading', false);
            commit('unregisterUserForMeetup', payload)
        })
        .catch( err => {
            console.log(err);
            commit('setLoading', false);
        })
};


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
                alert(err);
            }
        )
};

export const createMeetup = ({commit}, payload) => {
    const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        uid: payload.uid
    };
    async function PostMeetup(meetupData) {
        let promise = firebase.database().ref('meetups').push(meetup)
            .then(
                data => {
                    // special param from firebase, which provides to receive id
                    const key = data.key;
                    return key
                }
            )
        let key = await promise;
        const fileName = payload.image.name
        const extension = fileName.slice(fileName.lastIndexOf('.'));

        let promiseUploadImg = firebase.storage().ref('meetup/' + key  + extension).put(payload.image)
                .then (uploadTaskSnapshot => {
                return uploadTaskSnapshot.ref.getDownloadURL()
            } );
        let url = await promiseUploadImg;

        let promiseUpdateMeetup = firebase.database().ref('meetups').child(key).update({imageUrl: url})
            .then( () => {
                commit('createMeetup', {
                    ...meetupData,
                    imageUrl: url,
                    id: key
                })
            } )
            .catch(
                err => {
                    alert(err);
                }
            );
        await promiseUpdateMeetup;

    }
    PostMeetup(meetup)

};
export const updateMeetupData = ( {commit}, payload) => {
    commit('setLoading', true)
    // receive new Object, exclude id, so, new object will be without id - new syntax!
    const { id, ...updateObj } = payload;
    firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then( () => {
            commit('setLoading', false)
            commit('updateMeetup', payload)
        }).catch( err => {alert(err);  commit('setLoading', false) })

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
                    registeredMeetups: [],
                    fbKeys: []

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

export const fetchUserData = ({commit,getters}) => {
    commit('setLoading', true);
    firebase.database().ref('/users/' + getters.getUserOnPage.id + /registration/).once('value')
        .then( data => {
            const values = data.val();
            // values look like {-LVqzMRvCJPBpaMa-U_J: "-LViD-1H7TZKNxZojLaN"}
            let registeredMeetups = [];
            Object.keys(values).forEach( key => {
                registeredMeetups.push({
                    fbKey: key,
                    id: values[key]
                });
            });
            commit('setUser', {id: getters.getUserOnPage.id, registeredMeetups})
        })
        .catch( err => {
            alert(err);
        })
};

export const logout = ({commit}) => {
    firebase.auth().signOut();
    commit('setUser', null);
};
export const clearError = ({commit}) => {
    commit('clearError');
};