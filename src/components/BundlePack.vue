<template>
  <div class="flex flex-col h-44 select-none">
    <div class="flex items-center">
      <div
        class="h-10 rounded-t-box text-center py-1 shrink-0 flex items-center justify-center gap-2 text-base"
        :class="{
          'bg-loftia-blue-500 text-white w-24': !completed,
          'bg-loftia-yellow-100 text-loftia-yellow-400 uppercase w-full': completed,
        }"
      >
        <template v-if="!completed">
          <IconLoftiaPackQuantity class="size-5" />
          {{ pack.completionMin }} / {{ pack.completionMax }}
        </template>
        <template v-else>
          <IconLoftiaPackComplete class="size-5" />
          Complete!
        </template>
      </div>
      <div class="px-4 grow" v-if="!completed">
        <progress
          class="progress w-full text-loftia-yellow-300 bg-loftia-blue-500 h-4 p-[3px]"
          :value="pack.completionVal"
          max="100"
        ></progress>
      </div>
    </div>
    <div
      class="card card-sm grow overflow-hidden"
      @click="$emit('openPack')"
      :class="{
        'completed rounded-t-none': completed,
        'inprogress rounded-tl-none': !completed,
      }"
    >
      <IconLoftiaPack
        class="absolute top-0 left-0 h-full z-10 -scale-x-100"
        :class="{
          'text-loftia-blue-200': !completed,
          'text-loftia-yellow-400/50': completed,
        }"
      />
      <IconLoftiaPack
        class="absolute top-0 right-0 h-full z-10"
        :class="{
          'text-loftia-blue-200': !completed,
          'text-loftia-yellow-400/50': completed,
        }"
      />
      <div class="card-body items-center justify-center z-20">
        <div class="size-16">
          <img
            :src="`/img/packs/${pack.iconUrl}`"
            class="object-cover w-full h-full"
            alt=""
            v-if="pack.iconUrl"
          />
        </div>
        <div class="card-title" v-text="pack.name"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import IconLoftiaPack from './icons/IconLoftiaPack.vue';
import IconLoftiaPackComplete from './icons/IconLoftiaPackComplete.vue';
import IconLoftiaPackQuantity from './icons/IconLoftiaPackQuantity.vue';

const props = defineProps(['pack']);

const completed = computed(() => {
  return props.pack.completionMin == props.pack.completionMax;
});
</script>

<style scoped>
.card {
  cursor: pointer;
  transition: all 300ms ease-in-out;
}

.card:hover {
  /* background: var(--color-loftia-blue-300); */
}

.card.inprogress {
  background: var(--color-loftia-blue-100);
  color: var(--color-loftia-blue-content);
}

.card.completed {
  background: var(--color-loftia-yellow-300);
  color: var(--color-loftia-yellow-content);
}
</style>
