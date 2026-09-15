<template>
  <component :is="tag" class="flex" :aria-label="text">
    <motion.span
      v-for="(character, index) in characters"
      :key="`${text}-${index}`"
      aria-hidden="true"
      :initial="{ y: -120, opacity: 0 }"
      :animate="{ y: 0, opacity: 1 }"
      :transition="{ type: 'spring', stiffness: 500, damping: 50, delay: 0.02 * index, duration: 0.2 }">
      {{ character }}
    </motion.span>
  </component>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
const props = withDefaults(defineProps<{ text: string; tag?: string }>(), { tag: "span" });
const characters = computed(() => Array.from(props.text, character => character === " " ? "\u00a0" : character));
</script>
