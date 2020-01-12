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
      apiKey: 'YOUR_API_KEY',
      authDomain: 'YOUR_DOMAIN_NAME.firebaseapp.com',
      databaseURL: 'https://your-name.firebaseio.com/',
      projectId: 'YOUR_PROJECT_NAME',
      storageBucket: 'gs://YOUR_PROJECT_NAME.appspot.com/'
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
