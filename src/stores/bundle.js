import _bundlesPacksItems from '@/data/bundles-packs-items.json';
import _bundlesPacks from '@/data/bundles-packs.json';
import _bundlesRewards from '@/data/bundles-rewards.json';
import _bundles from '@/data/bundles.json';
import _cities from '@/data/cities.json';
import _items from '@/data/items.json';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useBundleStore = defineStore(
  'bundle',
  () => {
    const openedPacks = ref({});
    const openedPages = ref({});

    const userBundlePackItems = ref({});

    const data = computed(() => {
      return _cities
        .map((city) => ({
          id: city.id,
          name: city.fields.Title,
          position: city.fields.Position,
          bundles: [],
        }))
        .sort((a, b) => a.position - b.position)
        .map((city) => ({
          ...city,
          bundles: _bundles
            .filter((bundle) => bundle.fields?.City?.id == city.id)
            .map((bundle) => ({
              id: bundle.id,
              name: bundle.fields.Title,
              type: bundle.fields.Type,
              packs: [],
            }))
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((bundle) => ({
              ...bundle,
              packs: _bundlesPacks
                .filter((pack) => pack.fields.Bundle.id == bundle.id)
                .map((pack) => ({
                  id: pack.id,
                  name: pack.fields.Title,
                  iconUrl:
                    pack.fields.Icon && pack.fields.Icon[0]
                      ? pack.fields.Icon[0].id + '_' + pack.fields.Icon[0].path?.split('/').at(-1)
                      : null,
                  items: [],
                  rewardItem: getItemById(pack.fields.RewardItem?.id),
                  rewardQuantity: pack.fields.RewardQuantity,
                  position: pack.fields.Position,
                  page: pack.fields.Page,
                }))
                .sort((a, b) => a.position - b.position)
                .sort((a, b) => a.page - b.page)
                .map((pack) => ({
                  ...pack,
                  items: _bundlesPacksItems
                    .filter((item) => item.fields.BundlePack.id == pack.id)
                    .map((item) => ({
                      id: item.id,
                      quantity: item.fields.Quantity,
                      user: userBundlePackItems.value[item.id] || 0,
                      item: getItemById(item.fields.Item.id),
                    })),
                }))
                .map((pack) => {
                  const min = pack.items.map((item) => item.user).reduce((a, b) => a + b);
                  const max = pack.items.map((item) => item.quantity).reduce((a, b) => a + b);

                  return {
                    ...pack,
                    completionVal: (min / max) * 100,
                    completionMin: min,
                    completionMax: max,
                  };
                }),
              rewards: _bundlesRewards
                .filter((reward) => reward.fields.Bundle.id == bundle.id)
                .map((reward) => ({
                  id: reward.id,
                  item: getItemById(reward.fields.Item.id),
                  page: reward.fields.Page,
                  quantity: reward.fields.Quantity,
                })),
            }))
            .map((bundle) => ({
              ...bundle,
              currentPack:
                bundle.packs.find((pack) => pack.id == openedPacks.value[bundle.id]) || null,
              currentPage: openedPages.value[bundle.id] || 1,
              maxPages: [...new Set(bundle.packs.map((pack) => pack.page))].length,
            })),
        }));
    });

    const handleOpenPack = (bundleId, packId) => {
      openedPacks.value[bundleId] = packId;
    };

    const handleOpenPage = (bundleId, page) => {
      openedPages.value[bundleId] = page;
    };

    const handleUpdateUserItem = (action, packItemId, quantity) => {
      console.log('handleUpdateUserItem', action, packItemId, quantity);
      if (action == 'add') {
        if (userBundlePackItems.value[packItemId]) {
          if (userBundlePackItems.value[packItemId] < quantity) {
            userBundlePackItems.value[packItemId]++;
          }
        } else {
          userBundlePackItems.value[packItemId] = 1;
        }
      } else if (action == 'remove') {
        if (userBundlePackItems.value[packItemId]) {
          if (userBundlePackItems.value[packItemId] > 0) {
            userBundlePackItems.value[packItemId]--;
          }
        }
      }
    };

    const getItemById = (itemId) => {
      const item = _items.find((item) => item.id == itemId);
      const icon = item?.fields.Icon && item?.fields.Icon[0] ? item?.fields.Icon[0] : null;
      return {
        id: item?.id,
        name: item?.fields.Title,
        iconUrl: icon ? icon.id + '_' + icon.path?.split('/').at(-1) : null,
        rarity: null,
      };
    };

    const handleResetBundles = () => {
      if (window.confirm('Progress for all research stations will be reset. Are you sure?')) {
        openedPacks.value = {};
        openedPages.value = {};
        userBundlePackItems.value = {};
      }
    };

    return {
      data,
      openedPacks,
      openedPages,
      userBundlePackItems,
      handleOpenPack,
      handleOpenPage,
      handleUpdateUserItem,
      handleResetBundles,
    };
  },
  {
    persist: {
      pick: ['openedPacks', 'openedPages', 'userBundlePackItems'],
      key: 'loftia-bundle-v1',
    },
  },
);
