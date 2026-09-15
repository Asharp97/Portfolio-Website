<template>
  <ul class="flex flex-col gap-6">
    <li v-for="(x, n) in content" :key="n" class="flex flex-col gap-1">
      <div class="text-2xl font-light">{{ x.label }}</div>
      <div
        class="bg-copper-200 dark:bg-slate-700 h-2 rounded-4xl w-9/12 ml-auto my-2">
        <motion.div
          :initial="{ width: 0 }"
          :animate="{ width: `${x.value}%` }"
          :transition="{
            duration: 0.3,
            delay: 0.9,
            width: {
              type: 'spring',
              visualDuration: 0.9,
              bounce: 1,
              stiffness: 100,
            },
          }"
          class="bg-gradient-to-r from-copper-400 to-copper-600 dark:from-slate-700 dark:to-slate-400 h-full rounded-4xl" />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
defineOptions({ name: "LanguageSkills" });
defineProps<{ content: { label: string; value: number }[] }>();
</script>
