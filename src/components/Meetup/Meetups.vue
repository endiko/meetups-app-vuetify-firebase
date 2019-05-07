<template>
  <v-container>
    <v-layout row wrap justify-space-around>
      <v-flex v-for="item in meetups" :key="item.id" xs12 mb-4>
        <v-card color="white">
          <v-container fluid>
            <v-layout row wrap justify-space-between>
              <v-flex xs12 sm12 md6 lg6>
                <v-img :src="item.imageUrl" height="100%"></v-img>
              </v-flex>

              <v-flex xs12 sm12 md6 lg6 style="padding-left: 30px">
                <v-card-title primary-title class="headline">{{item.title}}</v-card-title>
                <v-card-text>
                  <div>{{item.fullDate | date}}</div>
                  <div>{{item.description | truncate(150)}}</div>
                </v-card-text>

                <v-card-actions>
                  <v-btn medium color="#527965" class="white--text" :to="'/meetups/' + item.id">
                    <v-icon left light>remove_red_eye</v-icon>Просмотреть
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>

<style lang="scss" scoped>
</style>