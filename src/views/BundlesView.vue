<script setup lang="ts">
import BundleGive from '@/components/BundleGive.vue';
import BundlePack from '@/components/BundlePack.vue';
import BundleReward from '@/components/BundleReward.vue';
import { useBundleStore } from '@/stores/bundle';
import {
  IconArrowBackUp,
  IconArrowDown,
  IconCaretLeftFilled,
  IconCaretRightFilled,
} from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';

const bundleStore = useBundleStore();
const { data: cities } = storeToRefs(bundleStore);
const { handleOpenPack, handleOpenPage, handleUpdateUserItem } = bundleStore;
</script>

<template>
  <div
    v-for="city in cities.filter((c) => c.bundles.length > 0)"
    :key="city.id"
    class="max-w-4xl mx-auto"
  >
    <h2 class="text-4xl text-loftia-blue-content mb-4">{{ city.name }}</h2>

    <div v-for="bundle in city.bundles" :key="bundle.id">
      <div class="card bg-base-100 shadow-sm mb-4">
        <div class="card-body gap-4">
          <h3 class="text-3xl text-loftia-blue-500">{{ bundle.name }}</h3>

          <div
            class="flex gap-2 cursor-pointer text-loftia-blue-400 hover:text-loftia-blue-500"
            @click="handleOpenPack(bundle.id, null)"
            v-if="bundle.currentPack"
          >
            <IconArrowBackUp class="size-5" />
            <span v-text="bundle.currentPack.name"></span>
          </div>
          <div class="flex gap-2 text-loftia-blue-400" v-else>
            <IconArrowDown class="size-5" />
            <span>Choose a bundle</span>
          </div>
          <template v-if="bundle.currentPack">
            <div class="grid grid-cols-3 grid-rows-2 gap-3 bg-loftia-blue-100/20 p-4 rounded-box">
              <BundleGive
                v-for="item in bundle.currentPack?.items"
                :key="item.id"
                :item="item"
                @update-user-item="handleUpdateUserItem"
              />
            </div>
            <div class="flex items-center justify-center bg-loftia-blue-100 p-4 rounded-box">
              <BundleReward label="Bundle Reward" :item="bundle.currentPack.rewardItem" />
            </div>
          </template>
          <template v-else>
            <div class="grid grid-cols-3 grid-rows-2 gap-3 bg-loftia-blue-100/20 p-4 rounded-box">
              <BundlePack
                v-for="pack in bundle.packs"
                :key="pack.id"
                :pack="pack"
                @open-pack="handleOpenPack(bundle.id, pack.id)"
                v-show="pack.page == bundle.currentPage"
              />
            </div>
            <div
              class="flex items-center justify-between bg-loftia-blue-100 p-4 rounded-box select-none"
            >
              <button
                class="btn btn-square btn-lg"
                :disabled="bundle.currentPage <= 1"
                @click="handleOpenPage(bundle.id, bundle.currentPage - 1)"
              >
                <IconCaretLeftFilled class="size-10" />
              </button>
              <BundleReward
                label="Page Reward"
                :item="reward.item"
                v-for="reward in bundle.rewards"
                :key="reward.id"
                v-show="reward.page == bundle.currentPage"
              />
              <button
                class="btn btn-square btn-lg"
                :disabled="bundle.currentPage >= bundle.maxPages"
                @click="handleOpenPage(bundle.id, bundle.currentPage + 1)"
              >
                <IconCaretRightFilled class="size-10" />
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>

  <!-- <DesignSystem /> -->
</template>

<style scoped>
@reference 'tailwindcss';

.btn {
  @apply text-white;
  --btn-bg: var(--color-loftia-yellow-300);
}

.btn:disabled {
  @apply text-white/50;
}
</style>
