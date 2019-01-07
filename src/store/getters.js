
export const getLoadedMeetups = state => {
    return state.loadedMeetups.sort((meetupA, meetupB) => {
        // sort meetings by the date by comparing them
        return meetupA.date > meetupB.date
    })
};
export const getFeaturedMeetaps = (state, getters) => {
    return getters.getLoadedMeetups.slice(0,10)
};
export const getLoadedOneMeetup = state => {
    return (meetUpId) => {
        //return meetup, which id of meetup will be equal to passing meetUpId
        return state.loadedMeetups.find((meetup) => {
            return meetup.id === meetUpId
        })
    }
};

export const getUserOnPage = state => {
    return state.user
};
export const getLoading = state => {
    return state.loading
};
export const getError = state => {
    return state.error
};
