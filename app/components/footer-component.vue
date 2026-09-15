<template>
  <footer class="flex justify-between text-md">
    <div>© {{ new Date().getFullYear() }} {{ content[0] }}</div>
    <div class="text-right">
      {{ content[1] }}
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{ content: string[] }>();
</script>
