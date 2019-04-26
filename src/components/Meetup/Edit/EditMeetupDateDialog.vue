<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">Изменить дату</v-btn>
    <v-card>
      <v-container row wrap>
        <v-layout>
          <v-flex xs12>
            <v-card-title>Редактировать дату встречи</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-menu
              v-model="menuDate"
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="editableDate" prepend-icon="event" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="editableDate" @input="menuDate = false" locale="ru-RU"></v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-menu
              ref="menuTime"
              v-model="menuTime"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="editableTime"
              lazy
              transition="scale-transition"
              offset-y
              full-width
            >
              <template v-slot:activator="{ on }">
                <v-text-field v-model="editableTime" prepend-icon="access_time" readonly v-on="on"></v-text-field>
              </template>
              <v-time-picker
                v-if="menuTime"
                v-model="editableTime"
                full-width
                format="24hr"
                @click:minute="$refs.menuTime.save(editableTime)"
              ></v-time-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click="editDialog = false">Отмена</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Сохранить</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  data() {
    return {
      editDialog: false,
      editableDate: null,
      editableTime: null,
      menuDate: false,
      menuTime: false
    }
  },
  computed: {
    getFullDate() {
      return `${this.editableDate}, ${this.editableTime}`
    }
  },
  methods: {
    onSaveChanges() {
      this.editDialog = false
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        fullDate: this.getFullDate
      })
    }
  },
  created() {
    this.editableDate = new Date(this.meetup.fullDate)
      .toISOString()
      .substr(0, 10)
    this.editableTime = new Date(this.meetup.fullDate)
      .toLocaleTimeString()
      .slice(0, 5)
  }
}
</script>

<style lang="scss" scoped>
</style>