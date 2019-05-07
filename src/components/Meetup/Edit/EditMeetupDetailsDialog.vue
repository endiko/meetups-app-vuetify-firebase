<template>
  <v-dialog width="500px" persistent v-model="editDialog">
    <v-btn fab accent color="#c5e1a5" slot="activator">
      <v-icon color="#af4448">edit</v-icon>
    </v-btn>
    <v-card>
      <v-container row wrap>
        <v-layout>
          <v-flex xs12>
            <v-card-title>Редактировать встречу</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field name="title" label="Название" id="title" required v-model="editedTitle"></v-text-field>
              <v-textarea
                name="description"
                label="Описание"
                id="description"
                required
                v-model="editedDescription"
              ></v-textarea>
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
                  <v-text-field
                    v-model="editableTime"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menuTime"
                  v-model="editableTime"
                  full-width
                  format="24hr"
                  @click:minute="$refs.menuTime.save(editableTime)"
                ></v-time-picker>
              </v-menu>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions class="card-actions">
              <div class="card-actions__group">
                <v-btn medium color="#af4448" class="white--text" @click="editDialog = false">Отмена</v-btn>
                <v-btn medium color="#527965" class="white--text" @click="onSaveChanges">Сохранить</v-btn>
              </div>
              <v-btn medium flat class="btn--delete" @click="onDelete">Удалить</v-btn>
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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
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
      if (
        this.editedTitle.trim() === '' ||
        this.editedDescription.trim() === ''
      ) {
        return
      }
      this.editDialog = false
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
        fullDate: this.getFullDate
      })
    },
    onDelete() {
      this.$store.dispatch('deleteMeetup', this.meetup.id)
      this.editDialog = false
      this.$router.push('/meetups/')
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
.card-actions {
  justify-content: space-between;
}
.btn--delete {
  color: #af4448;
}
</style>