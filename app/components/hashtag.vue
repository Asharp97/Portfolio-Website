<template>
  <div
    class="cursor-pointer rounded-full w-fit text-xl text-white flex justify-center items-center duration-300 transition-all"
    :class="[
      active
        ? 'p-1 rotate-90 bg-copper-500 dark:bg-slate-500'
        : 'p-0 rotate-0 bg-copper-900 dark:bg-white',
      logo ? `` : `hover:scale-125 origin-center`,
      'group-hover:p-1 group-hover:rotate-90 group-hover:bg-copper-500  dark:group-hover:bg-slate-500  hover:-translate-x-1',
    ]">
    <Icon
      v-if="!logo"
      name="lucide:hash"
      class="pause-on-hover duration-300 transition-all animate-spin"
      :class="[
        active ? `opacity-100 text-lg` : 'opacity-0 text-xs',
        'group-hover:opacity-100 group-hover:text-lg',
      ]" />
    <Icon
      v-else
      name="lucide:hash"
      class="pause-on-hover duration-300 transition-all animate-spin-slower text-9xl" />
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "HashtagIcon" });
defineProps<{ active?: boolean; logo?: boolean }>();
</script>

<style scoped>
.pause-on-hover:hover {
  animation-play-state: paused;
}
</style>
