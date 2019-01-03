import Vue from 'vue'
import VueRouter from 'vue-router'
import Home  from '@/components/Home.vue'
import Meetups from '@/components/Meetup/Meetups.vue'
import CreateMeetup from '@/components/Meetup/CreateMeetup.vue'
import MeetupPage from '@/components/Meetup/MeetupPage.vue'
import Profile from '@/components/User/Profile.vue'
import SignIn from '@/components/User/SignIn.vue'
import SignUp from '@/components/User/SignUp.vue'
import AuthGard from './auth-guard'

Vue.use(VueRouter);

export default new VueRouter ({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/meetups',
            name: 'Meetups',
            component: Meetups
        },
        {
            path: '/meetup/new',
            name: 'CreateMeetup',
            component: CreateMeetup,
            // add condition for checking, log user or not
            beforeEnter: AuthGard
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            beforeEnter: AuthGard
        },
        {
            path: '/signup',
            name: 'SignUp',
            component: SignUp
        },
        {
            path: '/meetups/:id',
            name: 'MeetupPage',
            // in order to send the id parameter
            props: true,
            component: MeetupPage
        },
        {
            path: '/signin',
            name: 'SignIn',
            component: SignIn
        }
    ]
})