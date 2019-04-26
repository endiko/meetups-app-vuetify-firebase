<template>
  <v-alert type="error" dismissible @input="onClose" :value="true">
    <slot>{{text}}</slot>
  </v-alert>
</template>

<script>
export default {
  props: ['text'],
  methods: {
    onClose() {
      this.$emit('dismissed')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>