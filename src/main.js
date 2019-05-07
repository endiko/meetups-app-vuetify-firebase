import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import AlertComponent from '@/components/Shared/Alert.vue'
import EditMeetupDetailsDialog from '@/components/Meetup/Edit/EditMeetupDetailsDialog.vue'

import truncateText from './filters/truncate'
import date from './filters/date'

Vue.config.productionTip = false

Vue.component('app-alert', AlertComponent)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)

Vue.filter('truncate', truncateText)
Vue.filter('date', date)

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDdv0OOlxvbPM6QnPreH0T3GPZwsxN3YXc',
      authDomain: 'meetups-67228.firebaseapp.com',
      databaseURL: 'https://meetups-67228.firebaseio.com/',
      projectId: 'meetups-67228',
      storageBucket: 'gs://meetups-67228.appspot.com/'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
