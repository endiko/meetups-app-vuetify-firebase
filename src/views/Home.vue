<template>
  <v-container>
    <!-- <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-carousel class="carousel-slider" v-if="meetups.length > 0">
          <v-carousel-item
            v-for="item in meetups"
            :src="item.imageUrl"
            :key="item.id"
            @click="onLoadMeetup(item.id)"
          >
            <div class="carousel-slider__title">{{item.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>-->

    <v-layout row wrap class="calendar__layout">
      <v-flex xs12>
        <v-sheet height="500">
          <v-calendar
            :now="today"
            :value="today"
            locale="ru-RU"
            color="#e57373"
            ref="calendar"
            v-model="today"
          >
            <template v-slot:day="{ date }">
              <template v-for="meetup in meetupsMap[date]">
                <router-link class="calendar__link" :to="'/meetups/' + meetup.id">{{meetup.title}}</router-link>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-space-between>
      <v-btn depressed flat small color="#e57373" @click="$refs.calendar.prev()">
        <v-icon color="#af4448">arrow_back</v-icon>
      </v-btn>
      <v-btn depressed flat small color="#e57373" @click="$refs.calendar.next()">
        <v-icon color="#af4448">arrow_forward</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      today: new Date().toISOString().slice(0, 10)
    }
  },
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups
    },
    loading() {
      return this.$store.getters.loading
    },
    meetupsMap() {
      const map = {}
      this.meetups.forEach(meetup =>
        (map[meetup.fullDate.slice(0, 10)] = map[meetup.date] || []).push(
          meetup
        )
      )
      return map
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
.calendar {
  &__layout {
    margin-top: 2.5rem;
  }
  &__link {
    display: block;
    padding: 0.4rem 0.8rem;
    background: #94af76;
    color: #ffffff;
    text-decoration: none;
    text-align: center;
    font-size: 0.95rem;
    font-weight: 700;
    transition: 0.3s ease-in;

    &:hover {
      background: #6a8053;
    }
  }
}
</style>
