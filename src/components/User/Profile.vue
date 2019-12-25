<template>
  <v-container v-if="user" fluid>
    <v-layout>
      <v-flex xs12 sm8 offset-sm2>
        <v-layout row mt-5 mb-3>
          <v-flex xs12 sm6 offset-sm3>
            <h1 class="headline">Профиль пользователя {{user.username}}</h1>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card>
              <v-layout row wrap mb-3>
                <v-flex xs12>
                  <v-card-title>
                    <h3>Созданные встречи</h3>
                  </v-card-title>

                  <v-card-text>
                    <ul v-if="getUsersCreatedMeetups.length > 0">
                      <li v-for="meetup in getUsersCreatedMeetups" :key="meetup.id">
                        {{meetup.title}}
                        <v-btn flat icon :to="'/meetups/' + meetup.id" color="#527965">
                          <v-icon color="#527965">remove_red_eye</v-icon>
                        </v-btn>
                        <v-btn icon flat color="#527965" slot="activator">
                          <v-icon color="#527965">edit</v-icon>
                        </v-btn>
                      </li>
                    </ul>

                    <p v-else>Пока встреч нет</p>
                  </v-card-text>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12>
                  <v-card-title>
                    <h3>Зарегистрированные встречи</h3>
                  </v-card-title>
                  <v-card-text>
                    <ul v-if="getUsersRegisteredMeetups.length > 0">
                      <li v-for="meetup in getUsersRegisteredMeetups" :key="meetup.id">
                        {{meetup.title}}
                        <v-btn flat icon :to="'/meetups/' + meetup.id" color="#527965">
                          <v-icon color="#527965">remove_red_eye</v-icon>
                        </v-btn>
                        <v-btn icon flat color="#527965" slot="activator">
                          <v-icon color="#527965">edit</v-icon>
                        </v-btn>
                      </li>
                    </ul>

                    <p v-else>Пока встреч нет</p>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    user() {
      console.log(this.$store.getters.user)
      return this.$store.getters.user
    },
    getUsersRegisteredMeetups() {
      return this.$store.getters.getUsersRegisteredMeetups
    },
    getUsersCreatedMeetups() {
      return this.$store.getters.getUsersCreatedMeetups
    }
  }
  // watch: {
  //   user(value) {
  //     if (value !== null && value !== undefined) {
  //       this.$router.push('/')
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.headline {
  @media all and (max-width: 768px) {
    font-size: 22px !important;
  }
}
h3 {
  font-size: 20px;
  font-weight: 400;
  color: #af4448;
}

table {
  display: inline-block;
  max-width: 100%;
  overflow-x: auto;
  border-collapse: collapse;
}

.table__desc {
  min-width: 400px;
  @media all and (max-width: 768px) {
    min-width: 300px;
  }
}

thead {
  background: #f8ffd7;
  font-weight: 700;
}
th {
  padding-top: 15px;
  padding-bottom: 15px;
  // @media all and (max-width: 768px) {
  //   display: none;
  // }
}
tr {
  border-bottom: 1px solid #c5e1a5;
}
td {
  padding: 1.8rem 1rem;
  min-width: 200px;
  @media all and (max-width: 768px) {
    padding: 1.2rem 0.8rem;
    min-width: 145px;
  }
  // @media all and (max-width: 768px) {
  //   display: block;
  //   width: 100%;
  //   padding: 0;
  //   margin-bottom: 1.5rem;
  //   &:before {
  //     content: attr(data-th) ': ';
  //     font-weight: bold;
  //     display: block;
  //     background: #f8ffd7;
  //     border-bottom: 1px solid #c5e1a5;
  //     padding: 1.2rem 0.7rem;
  //   }

  //   span {
  //     display: inline-block;
  //     padding: 1.2rem 0.7rem;
  //   }
  // }
}
</style>