<template>
  <v-app>
    <main class="main">
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
      <v-toolbar dark color="#e57373" class="header-nav">
        <v-toolbar-side-icon @click.native.stop="sideNav = !sideNav" class="hidden-md-and-up"></v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <svg-base icon-name="logo" viewBox="0 0 97.502 97.502" class="logo">
            <logo-svg/>
          </svg-base>
        </router-link>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-for="(item, index) in menuItems" :key="index" router :to="item.link">
            <v-icon left dark>{{item.icon}}</v-icon>
            {{item.title}}
          </v-btn>
          <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
            <v-icon left dark>exit_to_app</v-icon>Выйти
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-layout row wrap mt-4 v-if="!userIsAuthenticated">
        <v-flex xs12 sm6 class="text-xs-center text-sm-right">
          <v-btn medium router to="/meetups" color="#527965" class="white--text">
            <v-icon left light>people_outline</v-icon>Все встречи
          </v-btn>
        </v-flex>
        <v-flex xs12 sm6 class="text-xs-center text-sm-left">
          <v-btn medium router to="/meetups/new" color="#527965" class="white--text">
            <v-icon left light>create</v-icon>Создать встречу
          </v-btn>
        </v-flex>
      </v-layout>
      <router-view></router-view>
    </main>
    <v-footer class="footer">
      <div>&copy; {{ new Date().getFullYear() }}</div>
    </v-footer>
  </v-app>
</template>

<script>
import svgBase from './components/SvgBase.vue'
import logoSvg from './components/LogoSvg.vue'

export default {
  name: 'App',
  components: {
    svgBase,
    logoSvg
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
      this.$router.push('/meetups')
    }
  }
}
</script>

<style lang="scss">
.main {
  min-height: 100%;
  position: relative;
  overflow: hidden;
  &:after {
    content: '';
    display: block;
    height: 36px;
  }
}

.header-nav {
  @media only screen and (max-width: 959px) {
    .logo {
      width: 65px;
      height: 65px;
    }
    .v-btn {
      font-size: 0.9rem;
      padding: 0 10px;
    }
    .v-icon {
      margin-right: 0.4rem;
      font-size: 1.5rem;
    }
  }
}

.footer {
  margin-top: -36px;
}

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

// .logo {
//   width: 64px;
//   height: auto;
// }
</style>
