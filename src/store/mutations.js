export const createMeetup = (state, payload) => {
    // payload is arr, ready to be in state
    state.loadedMeetups.push(payload)
};

export const updateMeetup = (state, payload) => {
    // find meetup, which meetup id == payload.id
    const meetup = state.loadedMeetups.find( meetup => {
        return meetup.id === payload.id
    });
    //define index of this meetup
    const index = state.loadedMeetups.indexOf(meetup);
    // find values, which we need to update it and update it
    Object.keys(payload).forEach( key => {
        if (key !== 'id') {
            meetup[key] = payload[key]
        }
    });
    state.loadedMeetups[index] = meetup;
};

export const setUser = (state, payload) => {
    state.user = payload
};
export const setLoading = (state, payload) => {
    state.loading = payload
};
export const setError = (state, payload) => {
    state.error = payload
};
export const clearError = (state) => {
    state.error = null
};
 export const setLoadedMeetups = (state, payload) => {
     state.loadedMeetups = payload
 };


