import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    registerUserForMeetup(state, payload) {
      const id = payload.id
      if (
        state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0
      ) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup(state, payload) {
      const registeredMeetups = state.user.registeredMeetups

      registeredMeetups.splice(
        registeredMeetups.findIndex(meetup => meetup.id === payload),
        1
      )
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedMeetups(state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })

      if (payload.title) {
        meetup.title = payload.title
      }

      if (payload.description) {
        meetup.description = payload.description
      }

      if (payload.fullDate) {
        meetup.fullDate = payload.fullDate
      }
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
    registerUserForMeetup({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase
        .database()
        .ref('/users/' + user.id)
        .child('/registrations/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForMeetup', { id: payload, fbKey: data.key })
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase
        .database()
        .ref('/users/' + user.id + '/registrations/')
        .child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    loadMeetups({ commit }) {
      commit('setLoading', true)
      firebase
        .database()
        .ref('meetups')
        .once('value')
        .then(data => {
          const meetups = []
          const obj = data.val()

          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              fullDate: obj[key].fullDate,
              location: obj[key].location,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoading', false)
          commit('setLoadedMeetups', meetups)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', true)
        })
    },
    createMeetup({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        fullDate: payload.fullDate,
        creatorId: getters.user.id
      }
      let key

      firebase
        .database()
        .ref('meetups')
        .push(meetup)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))

          return firebase
            .storage()
            .ref('meetups/' + key + '.' + ext)
            .put(payload.image)
        })
        .then(fileData => {
          return fileData.ref.getDownloadURL()
        })
        .then(imgUrl => {
          firebase
            .database()
            .ref('meetups')
            .child(key)
            .update({ imageUrl: imgUrl })

          return imgUrl
        })
        .then(imageUrl => {
          commit('createMeetup', {
            ...meetup,
            imageUrl: imageUrl,
            id: key
          })
        })
        .catch(error => console.log(error))
      // reach out to firebase and store it
    },
    updateMeetupData({ commit }, payload) {
      commit('setLoading', true)

      const updateObj = {}

      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.fullDate) {
        updateObj.fullDate = payload.fullDate
      }

      firebase
        .database()
        .ref('meetups')
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }

          // console.log(newUser)
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(
            'Новая ошибка: ' + error,
            'error message: ' + error.message
          )
        })
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(
            'Новая ошибка: ' + error,
            'error message: ' + error.message
          )
        })
    },
    autoSignIn({ commit }, payload) {
      commit('setUser', { id: payload.uid, registeredMeetups: [], fbKeys: {} })
    },
    fetchUserData({ commit, getters }) {
      commit('setLoading', true)
      firebase
        .database()
        .ref('/users/' + getters.user.id + '/registrations/')
        .once('value')
        .then(data => {
          const registrations = data.val()
          let registeredMeetups = []
          let swapped = {}
          for (let key in registrations) {
            registeredMeetups.push(registrations[key])
            swapped[registrations[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swapped
          }

          commit('setLoading', false)
          commit('setUser', updatedUser)
        })
        .catch(error => console.log(error))
    },
    logout({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError({ commit }) {
      commit('clearError')
    }
  },
  getters: {
    loadedMeetups(state) {
      return state.loadedMeetups.sort((a, b) => a.date > b.date)
    },
    featuredMeetups(state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup(state) {
      return meetupId =>
        state.loadedMeetups.find(meetup => meetup.id === meetupId)
    },
    user(state) {
      return state.user
    },
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    }
  }
})
