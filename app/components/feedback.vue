<template>
  <div class="w-full">
    <UCard class="flex-col">
      <template #header>
        <Icon
          :name="icon"
          class="text-copper-500 dark:text-slate-500 text-6xl" />
      </template>

      <template #footer>
        <h3 class="max-w-75 mx-auto text-center">
          <slot />
        </h3>
      </template>
    </UCard>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "FormFeedback" });
defineProps<{ icon: string }>();
</script>
