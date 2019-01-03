export const createMeetup = (state, payload) => {
    // payload is arr, ready to be in state
    state.loadedMeetups.push(payload)
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
