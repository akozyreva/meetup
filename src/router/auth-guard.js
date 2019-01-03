import { store } from '../store'

export default (to, from, next) => {
    if (store.getters.getUserOnPage) {
        next()
    } else {
        //otherwise redirect to sign in
        next('/signin')
    }
}