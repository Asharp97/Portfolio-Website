<template>
  <div class="min-h-dvh flex justify-center items-center">
    <NoiseOverlay />
    <div
      aria-hidden="true"
      class="text-[30vw] font-black dark:text-gray-950 text-amber-50 absolute -z-10">
      {{ error.statusCode }}
    </div>
    <div class="text-black dark:text-white flex justify-center gap-4 flex-col text-center">
      <h1>{{ error.statusCode === 404 ? t("error.header") : t("error.generic") }}</h1>
      <p>{{ t("error.text") }}</p>
      <UButton class="mx-auto uppercase" @click="clearError({ redirect: localePath('/') })">
        {{ t("error.button") }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";
defineProps<{ error: NuxtError }>();
const { t } = useI18n();
const localePath = useLocalePath();
</script>
