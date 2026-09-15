<template>
  <div class="rounded-2xl duration-300 h-full">
    <UCard
      class="h-full duration-300 relative rounded-none"
      :ui="{
        body:
          name === 'hero'
            ? `
              p-0!
              dark:bg-[url(/img/mountains.jpg)]
              bg-cover bg-bottom`
            : '',
      }">
      <div
        v-if="content"
        class="flex flex-col sm:flex-row h-90 sm:h-full sm:items-center gap-2 w-full">
        <div
          class="flex sm:w-1/2 flex-1 lg:h-60 duration-300 w-full md:h-90 h-50">
          <Swiper
            class="w-full"
            :modules="[Autoplay]"
            :rewind="true"
            :breakpoints="{
              '640': {
                direction: 'horizontal',
              },
              '768': {
                direction: 'vertical',
              },
            }"
            :space-between="50"
            :speed="400"
            :autoplay="content.length > 1 ? { delay: 3000, disableOnInteraction: false } : false"
            @swiper="onSwiper"
            @slide-change="onSlideChange">
            <Swiper-slide v-for="e in content" :key="e.title" :data-swiper-autoplay="getDelayByContent(e)">
              <div
                class="flex flex-col justify-between h-full duration-500">
                <div>
                  <div class="flex justify-between gap-2">
                    <div>
                      <NuxtLink
                        :to="e.titleLink"
                        target="_blank"
                        class="inline-flex">
                        <h5
                          class="text-2xl sm:text-4xl font-light group w-fit">
                          {{ e.title }}
                        </h5>
                        <span v-if="e.titleLink" class="mt-auto ml-2"
                        ><Icon
                          class="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 duration-300"
                          name="lucide:arrow-up-right"
                        /></span>
                      </NuxtLink>
                      <NuxtLink v-if="e.subtitle" :to="e.subtitleLink" target="_blank">
                        <h2
                          class="group text-copper-700 dark:text-gray-400">
                          {{ e.subtitle }}
                          <span v-if="e.subtitleLink"
                          ><Icon
                            class="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 duration-300"
                            name="lucide:arrow-up-right"
                          /></span>
                        </h2>
                      </NuxtLink>
                    </div>
                    <div v-if="e.date || e.location" class="text-right">
                      <h6>{{ e.date }}</h6>
                      <USeparator
                        v-if="e.location"
                        :decorative="true"
                        class="my-1"
                        color="neutral" />
                      <h6 class="font-light">{{ e.location }}</h6>
                    </div>
                  </div>

                  <div v-if="e.tags" class="flex flex-wrap gap-1 mt-0.5">
                    <div
                      v-for="(tag, j) in e.tags"
                      :key="j"
                      :class="j > 2 ? 'hidden md:block' : ''"
                      class="text-white   bg-copper-500 hover:bg-copper-700 duration-300 cursor-pointer p-1 rounded-lg">
                      {{ tag }}
                    </div>
                  </div>
                </div>
                <Mark-down v-if="e.description" :text="e.description" />
                <ul v-if="e.points" class="points">
                  <li
                    v-for="x in e.points"
                    :key="x.label"
                    class="flex gap-2 hover:bg-copper-100 dark:hover:bg-slate-500 duration-300 p-1 px-2 rounded-xl">
                    <span class="w-37 font-semibold">{{ x.label }} </span>
                    <span class="flex-1">{{ x.value }}</span>
                  </li>
                </ul>
              </div>
            </Swiper-slide>
          </Swiper>
        </div>
        <div v-if="content.length > 1" class="w-fit flex md:flex-col">
          <button
            v-for="n in content.length"
            :key="n"
            type="button"
            :aria-label="`${name}: ${content[n - 1]?.title}`"
            :aria-current="n - 1 === pagination ? 'true' : undefined"
            class="flex justify-center p-1 cursor-pointer"
            @mouseover="paginationHandle(n - 1)"
            @click="paginationHandle(n - 1)">
            <Hashtag :active="n - 1 === pagination" />
          </button>
        </div>
      </div>
      <div
        v-else-if="name === 'hero'"
        class="dark:bg-black/50 hover:dark:bg-black/60 duration-300 p-4 sm:p-6">
        <slot />
      </div>
      <slot v-else />
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperInstance } from "swiper";
import type { PortfolioEntry } from "~/types/portfolio";
import "swiper/css";
import getDelayByContent from "~/utils/getDelayByContent";

defineOptions({ name: "PortfolioCard" });
defineProps<{ content?: PortfolioEntry[]; name?: string }>();
const slider = shallowRef<SwiperInstance>();
const pagination = ref(0);
const onSwiper = (swiper: SwiperInstance) => { slider.value = swiper; };
const onSlideChange = (swiper: SwiperInstance) => { pagination.value = swiper.activeIndex; };
const paginationHandle = (index: number) => { slider.value?.slideTo(index); };
</script>

<style scoped>
.points {
  list-style: disc;
}
.swiper-slide {
  transition: filter 300ms;
}
.swiper-slide-active {
  gap: 0;
}
.swiper-slide-next {
  gap: 2rem;
}
.swiper-slide-prev,
.swiper-slide-next {
  filter: blur(2px);
}

</style>
