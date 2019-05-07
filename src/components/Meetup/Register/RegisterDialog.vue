<template>
  <v-dialog persistent v-model="registerDialog" width="400px">
    <v-btn
      medium
      color="#527965"
      class="white--text"
      accent
      slot="activator"
    >{{ userIsRegistered ? 'Вы зарегистрированы' : 'Зарегистрироваться' }}</v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title class="headline" v-if="userIsRegistered">Отменить регистрацию на встречу?</v-card-title>
            <v-card-title class="headline" v-else>Зарегистрироваться на встречу?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>Вы всегда можете изменить решения</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                medium
                color="#af4448"
                class="white--text"
                @click="registerDialog = false"
              >Отмена</v-btn>
              <v-btn medium color="#527965" class="white--text" @click="onAgree">Подтвердить</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'register-dialog',
  props: ['meetupId'],
  data() {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered() {
      return (
        this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      )
    }
  },
  methods: {
    onAgree() {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>