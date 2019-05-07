<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else mb-5>
      <v-flex xs12>
        <v-layout row wrap align-center mt-5 mb-4>
          <h1>{{meetup.title}}</h1>
          <template v-if="userIsCreator">
            <v-spacer></v-spacer>
            <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
          </template>
        </v-layout>
        <v-img :src="meetup.imageUrl" height="500px"></v-img>
        <v-layout row mt-5>
          <div>{{meetup.description}}</div>
        </v-layout>
        <v-layout
          row
          mt-4
          style="font-size: 16px; font-weight: 300"
        >Место проведения: {{meetup.location}}</v-layout>
        <v-layout row style="font-size: 16px; font-weight: 300" mt-1 mb-3>Время: {{meetup.fullDate}}</v-layout>

        <v-layout row mt-2>
          <v-spacer></v-spacer>
          <register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated"></register-dialog>
        </v-layout>
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
span {
  font-size: 16px;
  font-weight: 300;
}
</style>