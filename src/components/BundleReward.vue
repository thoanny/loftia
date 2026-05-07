<template>
  <div class="flex items-center justify-center gap-2">
    <div
      class="bg-loftia-blue-400 text-white overflow-hidden rounded-box aspect-square size-19"
      v-if="item.iconUrl"
    >
      <img :src="`/img/items/${item.iconUrl}`" alt="" class="object-cover w-full h-full p-1" />
    </div>
    <div class="card card-sm bg-loftia-blue-400 text-white overflow-hidden min-w-48">
      <div class="card-body">
        <IconLoftiaPackReward class="absolute top-0 right-0 h-18 text-loftia-blue-500/50 z-10" />
        <div class="flex flex-start">
          <div
            class="card-label whitespace-nowrap bg-loftia-blue-500 text-sm py-1 rounded-br-full text-loftia-green-100"
            v-text="label"
          ></div>
        </div>

        <div class="card-title" v-text="item.name"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconLoftiaPackReward from './icons/IconLoftiaPackReward.vue';

defineProps(['item', 'label']);
</script>

<style scoped>
.card-label {
  margin-top: calc(var(--card-p, 1.5rem) * -1);
  margin-left: calc(var(--card-p, 1.5rem) * -1);
  padding-left: var(--card-p, 1.5rem);
  padding-right: calc(var(--card-p, 1.5rem) * 2);
}
</style>
