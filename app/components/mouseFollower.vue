<template>
  <div
    class="pointer-events-none -translate-x-20 -translate-y-42"
    :style="{
      transform: `translate(${x}px, ${y}px)`,
    }">
    <AnimatePresence>
      <motion.div
        v-if="text && enableFollower"
        class="absolute overflow-clip bg-copper-600 dark:bg-slate-600 rounded-xl text-white p-2 whitespace-nowrap h-10 flex flex-col gap-2"
        :initial="animateFrom"
        :animate="animateTo"
        :exit="animateFrom"
        :transition="transition">
        <text-split :text="text" tag="h3" />
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<script setup lang="ts">
import { AnimatePresence, motion } from "motion-v";
import { useMouse } from "@vueuse/core";
const { x, y } = useMouse();
defineProps<{ text: string; enableFollower: boolean }>();

const animateFrom = {
  opacity: 0,
  y: -50,
  filter: "blur(5px)",
};
const animateTo = {
  opacity: 1,
  y: 0,
  filter: "blur(0px)",
};
const transition = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
  duration: 0.2,
  filter: { type: "tween" as const, duration: 0.2 },
};
</script>
