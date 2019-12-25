<template>
  <v-container>
    <v-card>
      <v-container fluid>
        <v-layout row wrap v-if="loading">
          <v-flex xs12 class="text-xs-center">
            <v-progress-circular indeterminate color="primary" :width="7" :size="70"></v-progress-circular>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-else mb-5>
          <v-flex xs12 sm12 md10 offset-md1>
            <v-card-title>
              <h1 class="headline">{{meetup.title}}</h1>
              <template v-if="userIsCreator">
                <v-spacer></v-spacer>
                <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
              </template>
            </v-card-title>

            <v-img :src="meetup.imageUrl" height="25vmax" style="margin-top: 2rem"></v-img>

            <v-card-text
              style="font-size: 18px; font-weight: 300; line-height: 1.7; margin-top: 2rem"
            >
              <div style="margin-bottom: 2rem">{{meetup.description}}</div>

              <div>Место проведения: {{meetup.location}}</div>
              <div>Время: {{meetup.fullDate | date}}</div>
            </v-card-text>

            <v-card-actions>
              <v-layout row mt-2>
                <v-spacer></v-spacer>
                <register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated"></register-dialog>
              </v-layout>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <!-- <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-carousel class="carousel-slider" v-if="meetups.length > 0">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key="meetup.id"
            @click="onLoadMeetup(meetup.id)"
          >
            <div class="carousel-slider__title">{{meetup.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>-->
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
    },
    meetups() {
      return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  font-size: 16px;
  font-weight: 300;
}

.v-card {
  &__title,
  &__text {
    padding-left: 0;
    padding-right: 0;
  }
}
.carousel-slider {
  cursor: pointer;

  &__title {
    font-size: calc(100vmin / 16);
    font-weight: 300;
    color: #ffffff;
    background: rgba(57, 163, 140, 0.3);

    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
}
</style>