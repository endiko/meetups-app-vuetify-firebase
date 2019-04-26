<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Новая встреча</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="title" label="Название" id="title" required v-model="title"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field name="location" label="Место" id="location" required v-model="location"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary input__file--fake" @click="onPickFile">
                Загрузить фото
                <v-icon right dark>cloud_upload</v-icon>
              </v-btn>
              <input
                type="file"
                accept="image/*"
                class="input__file"
                ref="fileInput"
                @change="onFilePicked"
              >
              <!-- <v-text-field
                name="imageUrl"
                label="Cсылка на фото"
                id="image-url"
                required
                v-model="imageUrl"
              ></v-text-field>-->
            </v-flex>
          </v-layout>
          <v-layout row v-show="imageUrl">
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" alt="Превью" width="300px">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                name="description"
                label="Описание"
                id="description"
                required
                v-model="description"
              ></v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Выбрать дату и время</h4>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs3 offset-xs3>
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
                  <v-text-field v-model="date" prepend-icon="event" readonly v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="date" @input="menuDate = false" locale="ru-RU"></v-date-picker>
              </v-menu>
            </v-flex>

            <v-flex xs3>
              <v-menu
                ref="menuTime"
                v-model="menuTime"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="time"
                lazy
                transition="scale-transition"
                offset-y
                full-width
              >
                <template v-slot:activator="{ on }">
                  <v-text-field v-model="time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
                </template>
                <v-time-picker
                  v-if="menuTime"
                  v-model="time"
                  full-width
                  format="24hr"
                  @click:minute="$refs.menuTime.save(time)"
                ></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn :disabled="!formIsValid" type="submit">Создать встречу</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      menuDate: false,
      menuTime: false,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
      image: null
    }
  },
  computed: {
    formIsValid() {
      return (
        this.title !== '' &&
        this.location !== '' &&
        this.imageUrl !== '' &&
        this.description !== ''
      )
    },
    fullDate() {
      return this.date + ', ' + this.time
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return
      }

      if (!this.image) {
        return
      }

      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        // imageUrl: this.imageUrl,
        description: this.description,
        fullDate: this.fullDate
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/meetups')
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      let filename = files[0].name

      if (filename.lastIndexOf('.') <= 0) {
        return alert('Невалидный файл!')
      }

      const fileReader = new FileReader()

      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })

      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  &__file {
    display: none;
  }
}
</style>