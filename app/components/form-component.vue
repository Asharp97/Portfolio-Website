<template>
  <div aria-live="polite" :aria-busy="status === 'loading'">
    <div v-if="status === 'idle'" class="flex flex-wrap gap-8 h-full">
      <div
        class="flex-1 rounded-lg text-md text-gray-800 dark:text-gray-50 transition duration-300"
        @click="$emit('triggerFollower')"
        @mouseenter="$emit('enableTooltip')"
        @mouseleave="$emit('disableTooltip')">
        <p class="text-3xl font-light text-right">{{ t("message.text") }}</p>
      </div>
      <UForm :schema="schema" :state="state" class="space-y-4 w-full sm:w-1/2" @submit="onSubmit">
        <UFormField name="email">
          <UInput
            v-model="state.email" type="email" autocomplete="email" :maxlength="254"
            :aria-label="t('placeholder.email')" :placeholder="t('placeholder.email')" />
        </UFormField>
        <UFormField name="name">
          <UInput
            v-model="state.name" autocomplete="name" :maxlength="100"
            :aria-label="t('placeholder.name')" :placeholder="t('placeholder.name')" />
        </UFormField>
        <UFormField name="msg">
          <UTextarea
            v-model="state.msg" :maxlength="10000"
            :aria-label="t('placeholder.message')" :placeholder="t('placeholder.message')" />
        </UFormField>
        <UButton type="submit">{{ t("placeholder.button") }}</UButton>
      </UForm>
    </div>
    <Feedback v-else-if="status === 'loading'" icon="lucide:loader-circle">
      {{ t("message.Loading") }}
    </Feedback>
    <Feedback v-else-if="status === 'success'" icon="lucide:circle-check">
      {{ t("message.Success") }}
    </Feedback>
    <Feedback v-else icon="lucide:circle-alert">
      {{ t("message.Error") }}
      <UButton @click="status = 'idle'">{{ t("message.button") }}</UButton>
    </Feedback>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { createContactSchema, type ContactMessage } from "~~/shared/utils/contact";

const { t } = useI18n();
defineEmits<{ enableTooltip: []; disableTooltip: []; triggerFollower: [] }>();
const state = reactive({ email: "", name: "", msg: "" });
const schema = computed(() => createContactSchema(t));
const status = ref<"idle" | "loading" | "success" | "error">("idle");
const submitted = useCookie("form-submitted", { maxAge: 24 * 60 * 60 });

onMounted(() => {
  if (submitted.value === "submitted") status.value = "success";
});

async function onSubmit(event: FormSubmitEvent<ContactMessage>) {
  if (status.value !== "idle") return;
  status.value = "loading";
  try {
    const result = await $fetch("/api/sendMail", { method: "POST", body: event.data });
    if (!result.success) throw new Error("Message not accepted");
    submitted.value = "submitted";
    status.value = "success";
  } catch {
    status.value = "error";
  }
}
</script>
