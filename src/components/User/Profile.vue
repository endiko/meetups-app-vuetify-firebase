<template>
  <v-container>
    <v-layout row mt-5 mb-5>
      <v-flex xs12>
        <h1 class="headline">Профиль пользователя {{user.username}}</h1>
      </v-flex>
    </v-layout>
    <v-layout row mb-3>
      <v-flex>
        <h3>Созданные встречи</h3>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <table v-if="getUsersCreatedMeetups.length > 0">
          <thead>
            <tr>
              <td>Встреча</td>
              <td>Место встречи</td>
              <td>Краткое описание</td>
              <td>Дата встречи</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="meetup in getUsersCreatedMeetups" :key="meetup.id">
              <td>{{meetup.title}}</td>
              <td>{{meetup.location}}</td>
              <td>{{meetup.description | truncate(100)}}</td>
              <td>{{meetup.fullDate | date}}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Пока встреч нет</p>
      </v-flex>
    </v-layout>
    <v-layout row mt-5 mb-3>
      <v-flex>
        <h3>Зарегистрированные встречи</h3>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <table v-if="getUsersRegisteredMeetups.length > 0">
          <thead>
            <tr>
              <td>Встреча</td>
              <td>Место встречи</td>
              <td>Краткое описание</td>
              <td>Дата встречи</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="meetup in getUsersRegisteredMeetups" :key="meetup.id">
              <td>{{meetup.title}}</td>
              <td>{{meetup.location}}</td>
              <td>{{meetup.description | truncate(100)}}</td>
              <td>{{meetup.fullDate | date}}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>Пока встреч нет</p>
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
h3 {
  font-size: 20px;
  font-weight: 400;
  color: #af4448;
}
table {
  border-collapse: collapse;
}
thead {
  background: #f8ffd7;
  font-weight: 700;
}
tr {
  border-bottom: 1px solid #c5e1a5;
}
td {
  padding: 20px 10px;
  width: 25%;
}
</style>