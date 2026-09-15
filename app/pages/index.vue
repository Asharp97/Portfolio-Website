<template>
  <div id="home">
    <div
      class="min-h-dvh bg-[radial-gradient(circle,#f2f2f2_20%,transparent_200%),url('/img/bg.svg')] dark:bg-[radial-gradient(circle,black_10%,transparent_170%),url('/img/bg.svg')] bg-repeat bg-size-[100%_100%,200px] bg-[no-repeat,repeat] bg-fixed py-30">
      <LazyMouseFollower
        v-if="mounted && !isMobile"
        :enable-follower="enableFollower"
        :text="title"
        class="absolute z-20 hidden md:block" />

      <!-- Header -->
      <Transition name="go-down" appear>
        <header
          v-show="scroll < 50 && mounted"
          class="flex top-15 left-1/2 -translate-1/2 px-10 fixed w-full max-w-380 gap-2">
          <Transition name="rotate" mode="out-in">
            <button
              v-show="!switchingLocale"
              :class="bubbleClass"
              class="mr-auto"
              @click="switchLocale()">
              {{ locale == "en" ? "tr" : "en" }}
            </button>
          </Transition>
          <!-- cookie disclaimer -->
          <Transition name="go-up">
            <div
              v-if="showCookieDisclaimer"
              class="text-md text-gray-900 dark:text-gray-100 text-center px-2 bg-gray-100 dark:bg-slate-800 rounded-lg p-2 relative">
              🍪 {{ t("cookie.message") }}
              <div class="font-light text-sm">{{ t("cookie.subtitle") }}</div>
              <Icon
                name="lucide:circle-x"
                class="absolute -top-1 -right-2 text-lg hover:rotate-90 duration-300 hover:scale-110 cursor-pointer"
                @click="closeCookieDisclaimer()" />
            </div>
          </Transition>
          <client-only>
            <Transition name="rotate" mode="out-in">
              <button
                v-show="!switchingTheme"
                :aria-label="isDark ? t('theme.light') : t('theme.dark')"
                :class="bubbleClass"
                class="ml-auto"
                @click="switchTheme()">
                <Icon
                  :name="
                    isDark
                      ? 'lucide:sun'
                      : 'lucide:moon'
                  " />
              </button>
            </Transition>
          </client-only>
        </header>
      </Transition>

      <!-- Main -->
      <Transition name="switch">
        <div v-if="!switchingLocale" class="max-w-380 px-4 mx-auto">
          <!-- MAIN PARENT -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-3 w-full duration-500 relative">
            <!-- HERO -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-6 lg:col-span-12">
              <Card
                class="card h-fit!"
                name="hero"
                :class="
                  heroHovered || title === '' || title === t('title.hero')
                    ? ''
                    : fadeBack
                "
                @click="enableFollower = !enableFollower"
                @mouseenter="
                  () => {
                    activateContent('title.hero');
                    heroHovered = true;
                  }
                "
                @mouseleave="
                  () => {
                    activateContent('');
                    heroHovered = false;
                  }
                ">
                <Hero-component
                  :locale="locale"
                  :sections="portfolioSections"
                  :summary="content.summary"
                  :is-mobile="isMobile"
                  @set-title="activateContent" />
              </Card>
            </div>
            <div
              v-for="section in portfolioSections"
              :key="section.id"
              class="col-span-1 group/outer sm:col-span-2 relative"
              :class="section.columns">
              <Card
                :id="section.id"
                class="card"
                :class="title === '' || title === section.title ? '' : fadeBack"
                :content="section.content"
                :name="section.title"
                @click="enableFollower = !enableFollower"
                @mouseenter="activateContent('title.' + section.id)"
                @mouseleave="activateContent()">
                <Langs v-if="section.id === 'languages'" :content="content.languages.points" />
              </Card>
            </div>
            <!-- Contact Form-->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-6 lg:col-span-6 relative">
              <Card
                id="form"
                class="card"
                :class="
                  title === '' || title === t('title.form') ? '' : fadeBack
                "
                :name="t('title.form')">
                <LazyFormComponent
                  @trigger-follower="enableFollower = !enableFollower"
                  @enable-tooltip="activateContent('title.form')"
                  @disable-tooltip="activateContent()" />
              </Card>
            </div>
            <!-- Footer -->
            <div
              class="col-span-1 group/outer sm:col-span-2 md:col-span-6 lg:col-span-12 relative">
              <Card class="card">
                <LazyFooterComponent :content="content.footer" />
              </Card>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import contentEn from "../static/content-en.json";
import contentTr from "../static/content-tr.json";
import { useMediaQuery, useMounted, useWindowScroll } from "@vueuse/core";

const mounted = useMounted();

const switchingLocale = ref(false);
const switchingTheme = ref(false);

const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const switchTheme = async () => {
  switchingTheme.value = true;
  await wait(100);
  colorMode.preference = isDark.value ? "light" : "dark";
  switchingTheme.value = false;
};
const switchLocale = async () => {
  switchingLocale.value = true;
  await wait(100);
  try {
    await setLocale(locale.value == "en" ? "tr" : "en");
    title.value = "";
    heroHovered.value = false;
  } finally {
    switchingLocale.value = false;
  }
};

const { y: scroll } = useWindowScroll();

const { locale, setLocale, t } = useI18n();
const content = computed(() => locale.value === "tr" ? contentTr : contentEn);
const portfolioSections = computed(() => [
  { id: "experiences", content: content.value.experience, columns: "md:col-span-3 lg:col-span-7" },
  { id: "skills", content: content.value.skills, columns: "md:col-span-3 lg:col-span-5" },
  { id: "projects", content: content.value.projects, columns: "md:col-span-3 lg:col-span-5" },
  { id: "education", content: content.value.education, columns: "md:col-span-3 lg:col-span-5" },
  { id: "languages", content: undefined, columns: "md:col-span-2 lg:col-span-2" },
  { id: "certificates", content: content.value.certificates, columns: "md:col-span-4 lg:col-span-6" },
].map(section => ({ ...section, title: t('title.' + section.id) })));
const localeHead = useLocaleHead({ seo: true });
useHead(() => ({ link: localeHead.value.link, meta: localeHead.value.meta }));

// Dynamic SEO meta tags based on locale
useHead({
  title: computed(() =>
    locale.value === "tr"
      ? "Ali Elsayed | Makine Öğrenmesi & Full-Stack Yazılım Mühendisi"
      : "Ali Elsayed | Machine Learning & Full-Stack Software Engineer",
  ),
  htmlAttrs: {
    lang: computed(() => locale.value),
  },
  meta: [
    {
      name: "description",
      content: computed(() =>
        locale.value === "tr"
          ? "4+ yıllık deneyime sahip Makine Öğrenmesi ve Full-Stack Yazılım Mühendisi. TensorFlow, Vue.js, React, NestJS ve Python konularında uzman. İstanbul'da akıllı ve ölçeklenebilir uygulamalar geliştiriyorum."
          : "Machine Learning & Full-Stack Software Engineer with 4+ years of experience. Specialized in TensorFlow, Vue.js, React, NestJS, and Python. Building smart, scalable applications in Istanbul.",
      ),
    },
    {
      property: "og:locale",
      content: computed(() => (locale.value === "tr" ? "tr_TR" : "en_US")),
    },
  ],
});

const title = ref("");
const heroHovered = ref(false);
const activateContent = (key: string = "") => {
  title.value = key ? t(key) : "";
};
const enableFollower = ref(true);

const bubbleClass =
  "text-lg uppercase text-white hover:tracking-widest font-normal bg-copper-500 dark:bg-slate-500 flex justify-center items-center w-15 h-15 hover:translate-y-1 duration-300 rounded-full cursor-pointer";

const isMobile = useMediaQuery("(max-width: 767px)");

const cookieDisclaimer = useCookie("cookie-disclaimer", {
  maxAge: 30 * 24 * 60 * 60,
});
const showCookieDisclaimer = ref(false);

onMounted(() => {
  // Show cookie disclaimer immediately if not accepted
  if (cookieDisclaimer.value !== "accepted") {
    showCookieDisclaimer.value = true;
  }
});

const closeCookieDisclaimer = () => {
  cookieDisclaimer.value = "accepted";
  showCookieDisclaimer.value = false;
};
const fadeBack = "opacity-60 grayscale-25 blur-[2px] ";
</script>

<style>
.go-down-enter-active,
.go-down-leave-active {
  transition: all 1.4s var(--drift);
}
.go-up-leave-active,
.go-up-enter-active,
.rotate-leave-active,
.switch-leave-active {
  transition: all 0.4s var(--drift);
}
.switch-enter-from .card,
.switch-leave-to .card {
  opacity: 0;
  scale: 0.9;
}
.rotate-enter-from,
.rotate-leave-to {
  rotate: 360deg;
  opacity: 0;
  filter: blur(2px);
}

.go-down-leave-to,
.go-down-enter-from {
  transform: translateY(50px);
  opacity: 0;
  filter: blur(2px);
}
.go-up-leave-to,
.go-up-enter-from {
  transform: translateY(-50px);
  opacity: 0;
  filter: blur(2px);
}
</style>
