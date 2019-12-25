<template>
  <v-container>
    <v-card>
      <v-container fluid grid-list-xs grid-list-xl>
        <v-layout row wrap>
          <v-flex v-for="meetup in meetups" :key="meetup.id" xs12 sm6 md6 lg4>
            <v-card>
              <v-img :src="meetup.imageUrl" height="200px"></v-img>

              <v-card-title primary-title>
                <div class="headline">{{meetup.title}}</div>
              </v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat icon :to="'/meetups/' + meetup.id" color="#527965">
                  <v-icon color="#527965">remove_red_eye</v-icon>
                </v-btn>
                <v-btn flat icon color="#527965">
                  <v-icon color="#527965">bookmark</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="#527965">share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <!-- <v-layout row wrap justify-space-around>
      <v-flex v-for="item in meetups" :key="item.id" xs12 mb-4>
        <v-card color="white">
          <v-container fluid class="card__container">
            <v-layout row wrap justify-space-between>
              <v-flex xs12 sm12 md6 lg6>
                <v-img :src="item.imageUrl" height="100%"></v-img>
              </v-flex>

              <v-flex xs12 sm12 md6 lg6 class="card__content">
                <v-card-title primary-title class="headline card__title">{{item.title}}</v-card-title>
                <v-card-text class="card__text">
                  <div>{{item.fullDate | date}}</div>
                  <div>{{item.description | truncate(150)}}</div>
                </v-card-text>

                <v-card-actions class="card__actions">
                  <v-btn medium color="#527965" class="white--text" :to="'/meetups/' + item.id">
                    <v-icon left light>remove_red_eye</v-icon>Просмотреть
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>-->
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      console.log('meetups')
      console.log(this.$store.getters.loadedMeetups)
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  &__content {
    padding-left: 2rem;
  }
}

@media all and (max-width: 960px) {
  .card__container {
    padding: 2rem;
  }
  .card__content,
  .card__title,
  .card__text,
  .card__actions {
    padding-left: 0;
  }
}

@media all and (max-width: 640px) {
  .card__container {
    padding: 1.3rem;
  }
}
</style>