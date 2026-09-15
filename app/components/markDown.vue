<script setup lang="ts">
const props = defineProps<{ text: string }>();
const parts = computed(() => props.text.split(/\*\*(.+?)\*\*/g));
</script>

<template>
  <div>
    <template v-for="(part, index) in parts" :key="index">
      <strong v-if="index % 2 === 1">{{ part }}</strong>
      <template v-else>{{ part }}</template>
    </template>
  </div>
</template>
