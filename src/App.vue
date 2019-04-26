<template>
  <v-app>
    <v-navigation-drawer temporary app v-model="sideNav">
      <v-list>
        <v-list-tile v-for="(item, index) in menuItems" :key="index" router :to="item.link">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{item.title}}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Выйти</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="cyan lighten-3">
      <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer"></router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="(item, index) in menuItems" :key="index" router :to="item.link">
          <v-icon left dark>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left dark>exit_to_app</v-icon>Выйти
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-layout row wrap mt-4 v-if="!userIsAuthenticated">
        <v-flex xs12 sm6 class="text-xs-center text-sm-right">
          <v-btn
            flat
            large
            round
            router
            to="/meetups"
            color="cyan darken-3"
            style="border: 1px solid"
          >Все встречи</v-btn>
        </v-flex>
        <v-flex xs12 sm6 class="text-xs-center text-sm-left">
          <v-btn
            flat
            large
            round
            router
            to="/meetups/new"
            color="cyan darken-3"
            style="border: 1px solid"
          >Создать встречу</v-btn>
        </v-flex>
      </v-layout>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import svgIcon from './components/SvgIcon.vue'
export default {
  name: 'App',
  components: {
    svgIcon
  },
  data() {
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems() {
      let menuItems = [
        {
          icon: 'face',
          title: 'Зарегистрироваться',
          link: '/signup'
        },
        {
          icon: 'lock_open',
          title: 'Войти',
          link: '/signin'
        }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          {
            icon: 'chrome_reader_mode',
            title: 'Все встречи',
            link: '/meetups'
          },
          {
            icon: 'room',
            title: 'Создать встречу',
            link: '/meetups/new'
          },
          {
            icon: 'person',
            title: 'Профиль',
            link: '/profile'
          }
        ]
      }
      return menuItems
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      )
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss">
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
