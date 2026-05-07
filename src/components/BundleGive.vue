<template>
  <div class="card h-44 select-none" :class="{ completed: completed, inprogress: !completed }">
    <div class="card-status" v-if="completed">
      <IconLoftiaPackComplete class="size-5" />
      Complete!
    </div>
    <div class="card-status" v-else>
      <IconLoftiaPackQuantity class="size-5" />
      {{ item.user }} / {{ item.quantity }}
    </div>
    <div class="card-body justify-center relative">
      <IconLoftiaPackItem
        class="absolute top-0 left-0 h-full z-10 -scale-x-100"
        :class="{
          'text-loftia-green-200': !completed,
          'text-loftia-yellow-400/50': completed,
        }"
      />
      <IconLoftiaPackItem
        class="absolute top-0 right-0 h-full z-10"
        :class="{
          'text-loftia-green-200': !completed,
          'text-loftia-yellow-400/50': completed,
        }"
      />
      <div class="h-16 z-20 flex gap-2 items-center">
        <button
          class="btn btn-square btn-sm"
          @click="$emit('updateUserItem', 'remove', item.id, item.quantity)"
          :disabled="item.user == 0"
        >
          <IconMinus stroke="2" class="size-5" />
        </button>
        <img
          :src="`/img/items/${item.item.iconUrl}`"
          alt=""
          class="size-16 object-cover h-full w-full"
          v-if="item.item.iconUrl"
        />
        <button
          class="btn btn-square btn-sm"
          @click="$emit('updateUserItem', 'add', item.id, item.quantity)"
          :disabled="item.user == item.quantity"
        >
          <IconPlusFilled stroke="2" class="size-5" />
        </button>
      </div>

      <div class="card-title z-20" v-text="item.item.name"></div>
    </div>
  </div>
</template>

<script setup>
import { IconMinus, IconPlusFilled } from '@tabler/icons-vue';
import { computed } from 'vue';
import IconLoftiaPackComplete from './icons/IconLoftiaPackComplete.vue';
import IconLoftiaPackItem from './icons/IconLoftiaPackItem.vue';
import IconLoftiaPackQuantity from './icons/IconLoftiaPackQuantity.vue';

const props = defineProps(['item']);
defineEmits(['updateUserItem']);

const completed = computed(() => {
  return props.item.user == props.item.quantity;
});
</script>

<style scoped>
@reference 'tailwindcss';

.card {
  @apply overflow-hidden;
}

.card-body {
  @apply text-center items-center;
  --card-p: 1rem;
}

.card-title {
  @apply leading-none text-base;
}

.card-status {
  @apply font-bold text-center uppercase text-base flex gap-2 items-center justify-center;
  padding: 0.5rem var(--card-p, 1.5rem);
}

.card-actions {
  @apply absolute right-3 top-3 bottom-0  items-center flex-col justify-center gap-1;
}

.card.inprogress {
  background: var(--color-loftia-green-100);
  color: var(--color-loftia-green-content);
}

.card.inprogress .card-status {
  background: var(--color-loftia-green-300);
  color: white;
}

.card.inprogress .btn {
  --btn-color: var(--color-loftia-green-400);
  --btn-fg: var(--color-loftia-green-100);
}

.card.completed .btn {
  --btn-color: var(--color-loftia-yellow-500);
  --btn-fg: var(--color-loftia-yellow-100);
}

.card.completed {
  background: var(--color-loftia-yellow-300);
  color: var(--color-loftia-yellow-content);
}

.card.completed .card-status {
  background: var(--color-loftia-yellow-100);
  color: var(--color-loftia-yellow-400);
}
</style>
