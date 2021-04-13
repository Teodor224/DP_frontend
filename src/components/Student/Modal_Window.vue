<template>
  <div class="modal" v-show="value">
    <div class="container">
      <div class="modal__title">TEST</div>
      <button @click.prevent="close"
              class="mt-3 border-b border-teal font-semibold">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    value: {
      required: true
    }
  },
  methods: {
    close() {
      this.$emit("input", !this.value);
    }
  }
};
</script>


<style lang="css" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
