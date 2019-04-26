<template>
  <v-container>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate color="primary" :width="7" :size="70" v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer" v-if="meetups">
          <v-carousel-item
            v-for="item in meetups"
            :src="item.imageUrl"
            :key="item.id"
            @click="onLoadMeetup(item.id)"
          >
            <div class="title">{{item.title}}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap mt-2>
      <v-flex xs12 sm6 class="text-xs-center">Присоединяйтесь!</v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  components: {},
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups
    },
    loading() {
      return this.$store.getters.loading
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
.title {
  position: absolute;
  color: #ffffff;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(57, 163, 140, 0.3);
}
</style>
