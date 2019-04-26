<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="primary--text">{{meetup.title}}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-img :src="meetup.imageUrl" height="400px"></v-img>

          <v-card-text>
            <!-- <div>{{meetup.date}} в {{meetup.time}}</div> -->

            <div>Место проведения: {{meetup.location}} в {{meetup.fullDate}}</div>
            <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator">Редактировать дату</app-edit-meetup-date-dialog>

            <p>{{meetup.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- <v-btn flat class="primary" @click.stop="dialog = true">Зарегистрироваться</v-btn> -->
            <register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated"></register-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import RegisterDialog from '@/components/Meetup/Register/RegisterDialog.vue'
export default {
  props: ['id'],
  components: {
    RegisterDialog
  },
  data() {
    return {}
  },
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id)
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      )
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false
      }
      return this.$store.getters.user.id === this.meetup.creatorId
    },
    loading() {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="scss" scoped>
</style>