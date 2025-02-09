<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <p>当前时间：{{ new Date().toLocaleTimeString() }}</p>
  </div>
</template>

<script setup>
defineProps({
  msg: String
})
</script>

<style scoped>
.hello {
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
}
</style>